module.exports = function(config) {
  try {
    var vue = generatorVue(config)
    var js = generatorJS(config)
    var css = generatorCSS(config)
  } catch(e) {
    console.log(e)
  }

  return {
    vue,
    js,
    css,
  }
}

function generatorJS(config) {
  // vant ui 的不需引入。
  var needImportComponents = config.selectedComponent.filter(c => {
    return c.name.indexOf('van-') === -1
  })
  needImportComponents = uniqComponent(needImportComponents)
  var importCode = needImportComponents
    .map(c => {
      return `
import ${c.name} from '@/components/${c.name}'`
    })
    .join('')

  var useComponentCode = needImportComponents
    .map(c => {
      return `
    ${c.name},`
    })
    .join('')

  var js = `
${importCode}

export default {
  components: {
   ${useComponentCode}
  },
  data() {
    return {
      // todo
    }  
  },
  methods: {
    
  },
  mounted() {
   // todo
  }
}`
  return js
}

function generatorVue(config) {
  var componentsCode = config.selectedComponent.map(c => {
    var code = `
    <${c.name} v-bind="${handleProps(JSON.stringify(c.props, null, '\t'))}">
      ${!c.slots ? '' : c.slots.map(item => {
        let res = `
      <template name="${item.name || 'default'}" >
        ${!item.isList 
          ? `
        <div 
          v-html="'${handleHTML(item.content)}'"
        ></div>
          `
          : `
          <component 
            is="${item.componentName || 'div'}"
            v-for="i in 3"
            :key="i"
            v-html="'${handleHTML(item.content)}'">
          </component>
          `
        }
      </template>`
        return res
      }).join('\n')}
      
    </${c.name}>
`
    return code
  }).join('\n')
  var vue = `
<template> 
  <div class="main">
    ${componentsCode}
  </div>
</template>
<script src="./main.js"></script>

<style scoped src="./style.css"></style>`
  return vue

}


function generatorCSS(config) {
  var css = `
`
  return css
}

function handleHTML(html) {
  return html.replace(/\"/g, '')
}

function handleProps(html) {
  return html.replace(/\"/g, '\'')
}

function uniqComponent(arr) {
  var res = []
  var addCNames = {}
  arr.forEach(c => {
    if(!addCNames[c.name]) {
      addCNames[c.name] = true
      res.push(c)
    }
  })
  return res
}
