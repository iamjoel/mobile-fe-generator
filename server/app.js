const config = require('./config')

const express = require('express')
const app = express()

var bodyParser = require('body-parser')
app.use(bodyParser.json())

// Lowdb https://github.com/typicode/lowdb
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync(`data/${config.databaseFileName}.json`)
const db = low(adapter)
global.db = db
// 不要设置db.defaults。设置 default 导致 db.json 被间歇性的reload。导致开发时，服务器不断重启。。。

app.get('/', (req, res) => res.send('It works!'))

// 跨域头设置
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
})

// 所有的api
var apis = {
  page: require('./api/utils/commonCRUD')('dict'),
}

generateAPI(Object.keys(apis))

var configApi = require('./api/config')
app.get('/config/detail', configApi.detail)

app.post('/config/sync/:type', (req, res)=> {
  configApi.syncConfig(req, res)
})

var pageApi = require('./api/page')
app.post('/page/expendCofigToFile/:id', (req, res)=> {
  pageApi.expendCofigToFile(req, res)
})

app.post('/page/updateFreeze/:id', (req, res)=> {
  pageApi.updateFreeze(req, res)
})

function generateAPI(names) {
  names.forEach(name => {
    // 列表
    app.get(`/${name}/list`, (req,res) => {
      apis[name].list(req, res)
    })
    // 详情
    app.get(`/${name}/:id`, (req,res) => {
      apis[name].detail(req, res)
    })
    // 新增
    app.put(`/${name}`, (req,res) => {
      apis[name].add(req, res)
    })
    // 修改
    app.post(`/${name}/:id`, (req,res) => {
      apis[name].edit(req, res)
    })
    // 删除
    app.delete(`/${name}/:id`, (req,res) => {
      apis[name].remove(req, res)
    })
  })
}

app.listen(config.port, () => console.log(`app listening on port ${config.port}!`))