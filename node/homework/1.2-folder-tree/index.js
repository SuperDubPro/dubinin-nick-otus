const fs = require('node:fs/promises')
const path = require('node:path')

/** Класс для описания структуры папки */
class FolderScheme {
  constructor(name) {
    this.folder = name
    this.children = []
  }
}

class FolderTree {
  LINES = {
    CROSSING_T: '├',
    VERTICAL: '│',
    HORIZONTAL: '──',
    CORNER: '└',
    TAB: '  ',
  }

  foldersCounter = 0
  filesCounter = 0

  targetDepth = undefined
  targetPath = ''

  constructor(pathProp, targetDepth) {
    if (!pathProp) {
      throw new Error('Укажите путь к папке!')
    }
    if (targetDepth !== undefined && !isNaN(targetDepth) && targetDepth < 0) {
      throw new Error('Глубина отрисовки не может быть отрицательной!')
    }
    this.targetPath = path.resolve(__dirname, pathProp)
    this.targetDepth = targetDepth
  }

  /** Получение строки из item, повторяющихся length раз  */
  createStrOf(item, length = 1) {
    const arr = []
    arr.length = length
    return arr.fill(item).join('')
  }

  resetCounters() {
    this.filesCounter = 0
    this.foldersCounter = 0
  }

  /** Обход дерева, рекурсивное построение структуры папок */
  async readFolder(iterationPath, depth = 0) {
    const files = await fs.readdir(iterationPath)
    const folderScheme = new FolderScheme(path.basename(iterationPath))
    ++this.foldersCounter

    for (const file of files) {
      const filePath = path.resolve(iterationPath, file)
      const fileStat = await fs.stat(filePath)

      if (this.targetDepth !== undefined && depth >= this.targetDepth) {
        return folderScheme
      }

      if (fileStat.isDirectory()) {
        const scheme = await this.readFolder(filePath, depth + 1)
        folderScheme.children.push(scheme)
      } else {
        ++this.filesCounter
        folderScheme.children.push(path.basename(filePath))
      }
    }

    return folderScheme
  }

  /** Отрисовываем дерево по структуре папки */
  drawFolderTree(scheme, level = 0) {
    let str = `${scheme.folder}\n`

    const children = [...scheme.children]
      .sort((a, b) =>
        Number(typeof a === 'string') - Number(typeof b === 'string')
      ) // сортируем папки в начало, в файлы конец
    // .sort((a, b) =>
    //   Number(typeof b === 'string') - Number(typeof a === 'string')
    // ) // сортируем файлы в начало, папки в конец

    children.forEach((item, i, childrenArr) => {
      const LINES = this.LINES
      const isZeroLvl = level === 0
      const isLastInFolder = i === childrenArr.length - 1

      // Отрисовка файла
      if (typeof item === 'string') {
        const startLines = this.createStrOf(`${LINES.VERTICAL}${LINES.TAB}`, level)
        const beforeEndLine = isLastInFolder ? LINES.CORNER : LINES.CROSSING_T
        const endLine = LINES.HORIZONTAL

        str = `${str}${startLines}${beforeEndLine}${endLine}${item}\n`
      }

      // Отрисовка папки
      if (item.folder !== undefined) {
        const firstLine =
          (isZeroLvl && !isLastInFolder && LINES.CROSSING_T)
          || (isZeroLvl && isLastInFolder && LINES.CORNER)
          || (!isZeroLvl && LINES.VERTICAL)
          || ''

        const middleLines =
          isZeroLvl
            ? ''
            : this.createStrOf(`${LINES.TAB}${LINES.VERTICAL}`, level - 1)


      const beforeEndLine =
        (!isZeroLvl && isLastInFolder && `${LINES.TAB}${LINES.CORNER}`)
        || (!isZeroLvl && !isLastInFolder && `${LINES.TAB}${LINES.CROSSING_T}`)
        || ''

        const endLine = LINES.HORIZONTAL

        const childDraw = this.drawFolderTree(item, level + 1)

        str = `${str}${firstLine}${middleLines}${beforeEndLine}${endLine}${childDraw}`
      }
    })

    return str
  }

  async init() {
    try {
      const scheme = await this.readFolder(this.targetPath)
      const tree = this.drawFolderTree(scheme)
      const res = `${tree}${this.foldersCounter} directories, ${this.filesCounter} files`

      this.resetCounters()

      console.log(res)
      return res
    } catch (err) {
      console.error(err)
    }
  }
}

module.exports = {
  FolderTree
}

// Исполняется если не автотест
if (process.env.JEST_WORKER_ID === undefined) {
  const [,,pathArg] = process.argv
  const dArgIndex = process.argv.findIndex((arg) => arg === '-d')
  const targetDepth = Number(process.argv[dArgIndex + 1])

  if (dArgIndex && targetDepth === undefined) {
    throw new Error('Укажите глубину отрисовки -d!')
  }

  const folderTree = new FolderTree(pathArg, targetDepth)
  folderTree.init()
}
