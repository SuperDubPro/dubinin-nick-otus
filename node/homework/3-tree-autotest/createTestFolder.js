const fs = require('fs')
const path = require('path')

const dirPath = path.resolve('./node/homework/3-tree-autotest')

const createTestFolder = () => {
  fs.mkdirSync(path.resolve(dirPath, './tree-test/aaa/aa/a/deep/andDeeper'), { recursive: true })
  fs.writeFileSync(path.resolve(dirPath, './tree-test/aaa/aa/a/deep/andDeeper/andDeeper.js'), '')
  fs.writeFileSync(path.resolve(dirPath, './tree-test/aaa/aa/a/deep/deep.js'), '')
  fs.writeFileSync(path.resolve(dirPath, './tree-test/aaa/aa/a/a.js'), '')
  fs.writeFileSync(path.resolve(dirPath, './tree-test/aaa/aa/aa.js'), '')
  fs.writeFileSync(path.resolve(dirPath, './tree-test/aaa/aaa.js'), '')
  fs.writeFileSync(path.resolve(dirPath, './tree-test/aaa/aaa2.js'), '')

  fs.mkdirSync(path.resolve(dirPath, './tree-test/almost2Empty/empty1'), { recursive: true })
  fs.mkdirSync(path.resolve(dirPath, './tree-test/almost2Empty/empty2'), { recursive: true })

  fs.mkdirSync(path.resolve(dirPath, './tree-test/almostEmpty/empty'), { recursive: true })

  fs.mkdirSync(path.resolve(dirPath, './tree-test/bbb/empty'), { recursive: true })
  fs.writeFileSync(path.resolve(dirPath, './tree-test/bbb/bbb.js'), '')

  fs.mkdirSync(path.resolve(dirPath, './tree-test/ccc'), { recursive: true })
  fs.writeFileSync(path.resolve(dirPath, './tree-test/ccc/ccc.js'), '')

  fs.mkdirSync(path.resolve(dirPath, './tree-test/ddd'), { recursive: true })
  fs.writeFileSync(path.resolve(dirPath, './tree-test/ddd/ddd1.js'), '')
  fs.writeFileSync(path.resolve(dirPath, './tree-test/ddd/ddd2.js'), '')

  fs.mkdirSync(path.resolve(dirPath, './tree-test/empty'), { recursive: true })

  fs.writeFileSync(path.resolve(dirPath, './tree-test/treeTest.js'), '')
}

const deleteTestFolder = () => {
  fs.rmSync(path.resolve(dirPath, './tree-test'), { recursive: true })
}

module.exports = {
  createTestFolder,
  deleteTestFolder,
}
