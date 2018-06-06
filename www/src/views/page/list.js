import { fetchList, deleteModel } from '@/service/api'

var searchConditions = {
  name: ''
}
var operateConfig = { "add": { "isShow": true }, "edit": { "isShow": true }, "detail": { "isShow": true }, "delete": { "isShow": true } }

export default {
  data() {
    return {
      KEY: 'page',
      list: [],
      searchConditions,
    }
  },
  methods: {
    isShow(type) {
      return true
    },
    remove(id, index) {
      deleteModel(this.KEY, id).then(({data})=> {
        this.list.splice(index, 1)
        this.$message({
          showClose: true,
          message: '删除成功',
          type: 'success'
        })
      })
    },
    expendCofigToFile(id) {
      this.$http.post(`${SERVER_PREFIX}/list-page/expendCofigToFile/${id}`).then(({data})=> {
        this.$message({
          showClose: true,
          message: '操作成功',
          type: 'success'
        })
      })
    },

  },
  mounted() {
    fetchList(this.KEY).then(({data}) => {
      this.list = data.data
    })
  }
}
