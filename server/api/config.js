var config = require('../config')
const apiFormat = require('../utils/apiFormat')
var fs = require('fs-extra')
const deepClone = require('clone')

const settingFileFoldPath = `${config.feCodeRootPath}/src/setting/base`

module.exports = {
  detail(req, res) {
    res.send(apiFormat.success({
      databaseFileName: config.databaseFileName,
      feCodeRootPath: config.feCodeRootPath
    }))
  }
}

