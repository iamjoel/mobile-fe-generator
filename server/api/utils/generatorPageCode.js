module.exports = function(config) {
  var vue = generatorVue(config)
  var js = generatorJS(config)
  var css = generatorCSS(config)

  return {
    vue,
    js,
    css,
  }
}

function generatorJS(config) {
  // var components = config.components
  // var needImportComponets = []
  // // 
  // components.forEach(item => {
  //   var name = item.name

  //   if(needImportComponets.indexOf(name) === -1) {
  //     needImportComponets.push(name)
  //   }
  // })

  var js = `
// todo
// import 
export default {
  components: {
   // todo
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
  var vue = `
<template> 
  <div class="main">
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
