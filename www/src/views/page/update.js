import JEditItem from '@/components/edit-item'
import deepClone from 'clone'
import draggable from 'vuedraggable'
import {fetchList, fetchModel, addModel, editModel} from '@/service/api' 

var model = {
	"name": null,
  "filePath": null,
  selectedComponent: []
}
var rules = {
	"name": [
		{ required: true, message: '请输入页面名称', trigger: 'blur' }
	],
  "filePath": [
    { required: true, message: '请输入文件路径', trigger: 'blur' }
  ],
}

var OUTLINE_WIDTH = 1
var DEVICE = {
  'iphone 5': {
    width: `${320 + 2 * OUTLINE_WIDTH}px`,
    height: '480px',
  },
  'iphone 6': {
    width: `${375 + 2 * OUTLINE_WIDTH}px`,
    height: '667px',
  },
}

var DEVICE_REM = {
  'iphone 5': '50px',
  'iphone 6': '58.59375px',
}

import Media from '@/components/media'
import Placeholder from '@/components/placeholder'

import allComponents from '@/setting/components'

var allComponentsObj = {}
allComponents.forEach((c, index) => {
  allComponentsObj[c.name] = index
})

// 生成唯一的组件id
var id = 0
export default {
  components: {
    JEditItem,
    draggable,
    Media,
    Placeholder
  },
  data() {
    return {
      KEY: 'page',
      model,
      allComponentsObj,
      allComponents,
      currEditComponent: null, // 当前编辑的组件
      rules,
      device: 'iphone 6',
      deviceSize: {}
    }  
  },

  methods: {
    addedComponent(evt) {
      // debugger
      var c = JSON.parse(evt.item.dataset.data)
      // debugger
      this.model.selectedComponent.push({
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
      this.model.selectedComponent = this.model.selectedComponent.filter(c => c.id !== id)
    },
    moveComponent(type, index) {
      var currC = this.model.selectedComponent[index]
      var tarIndex = type === 'up' ? index - 1 : index + 1
      var tarC = this.model.selectedComponent[tarIndex]
      this.model.selectedComponent = this.model.selectedComponent.map((c, i) => {
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
    deviceChange() {
      this.deviceSize = DEVICE[this.device]
      window.document.documentElement.style.fontSize = DEVICE_REM[this.device]
    },
    fetchDetail() {
      fetchModel(this.KEY, this.$route.params.id).then(({data}) => {
        this.model = data.data
        this.model.selectedComponent = this.model.selectedComponent.map(c => {
          c.id = id++
          return c
        })
      })
    },
    save() {
      this.$refs.form.validate((isValid) => {
        if (isValid) {
          var model = deepClone(this.model)
          model.isFreeze =  0 // 新增或编辑后是冻结状态
          model.selectedComponent = model.selectedComponent.map(c => {
            return {
              name: c.name,
              label: c.label,
              props: c.props,
              slots: c.slots,
            }
          })
          var method = this.$route.params.id == -1 ? addModel : editModel
          method(this.KEY, model).then(()=> {
            this.$message({
              showClose: true,
              message: '保存成功',
              type: 'success'
            })
            this.$router.go(-1)
          })
        }
      })
      
    }
  },
  mounted() {
    if(this.$route.params.id != -1) {
      this.fetchDetail()
    }
    this.deviceChange()
  }
}