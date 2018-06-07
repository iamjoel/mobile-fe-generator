import updateMixin from '@/mixin/update'
import deepClone from 'clone'
import draggable from 'vuedraggable'

var model = {
	"moreInfo": {},
	"name": null
}
var rules = {
	"name": [
		{ required: true, message: '请输入歌手名称', trigger: 'blur' }
	]
}

import Media from '@/components/media'

// slot 的设置 todo
var allComponents = [
{
  name: 'van-swipe',
  label: '幻灯',
  config: [{
    key: 'autoplay',
    name: '自动播放时间',
    default: 0,
    type: 'number'
  }],
  slots: [{
    isList: true,
    componentName: 'van-swipe-item',
    content: `<img src="http://via.placeholder.com/200x100" alt="" style="width:100%"/>`
  }]
},
{
  name: 'media',
  label: 'Media',
  config: [
  // {
  //   key: 'img',
  //   name: '图片配置',
  //   defaultValue: {},
  //   // type: 'obj'
  // }, 
  // 拆分
  {
    key: 'image.width',
    name: '图片宽度',
    defaultValue: '.2rem',
  },
  {
    key: 'spaceBetween',
    name: '间距',
    defaultValue: '.2rem',
  }],
  slots: [{
    content: `<h2>xxxx</h2><p>dffffdf</p>`
  }]
},]

var allComponentsObj = {}
allComponents.forEach((c, index) => {
  allComponentsObj[c.name] = index
})

var id = 0
export default {
  mixins: [updateMixin],
  components: {
    draggable,
    Media
  },
  data() {
    return {
      KEY: 'page',
      model,
      allComponentsObj,
      allComponents,
      selectedComponent: [],
      currEditComponent: null, // 当前编辑的组件
      rules,
    }  
  },
  methods: {
    addedComponent(evt) {
      // debugger
      var c = JSON.parse(evt.item.dataset.data)
      // debugger
      this.selectedComponent.push({
        id: id++,
        name: c.name,
        label: c.label,
        props: (() => {
          let props = {}
          c.config.forEach(item => {
            // debugger
            props[item.key] = item.defaultValue
          })
          return props
        })(),
        slots: c.slots
      })
    },
    deleteComponent(id) {
      this.selectedComponent = this.selectedComponent.filter(c => c.id !== id)
    },
    moveComponent(type, index) {
      var currC = this.selectedComponent[index]
      var tarIndex = type === 'up' ? index - 1 : index + 1
      var tarC = this.selectedComponent[tarIndex]
      this.selectedComponent = this.selectedComponent.map((c, i) => {
        if(i === index) {
          return tarC
        } else if(i === tarIndex) {
          return currC
        }
        return c
      })
    },
    getComponentConfig(component) {
      return this.allComponents[allComponentsObj[component.name]].config
    },
    formatFetchData(model) {
      model = deepClone(model)
      
      // 下拉框赋值
      if(!this.isView) {
        
      } else {
        var dictModelCols = [] || []
        dictModelCols.length > 0 && dictModelCols.forEach(col => {
          model[col.key] = this.getDictName(col.dictKey, model[col.key])
        })
      }
      return model
    },
    formatSaveData() {
      var model = deepClone(this.model)
      
      delete model.moreInfo // 表关联的数据
      return model
    },
    
    
  },
  mounted() {
    
  }
}