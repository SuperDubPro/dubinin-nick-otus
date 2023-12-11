const fs = require('node:fs/promises')
const path = require('node:path')

const [,,pathArg] = process.argv
const dArgIndex = process.argv.findIndex((arg) => arg === '-d')
const targetDepth = Number(process.argv[dArgIndex + 1])

if (!pathArg) {
  throw new Error('Укажите путь к папке!')
}
if (dArgIndex && targetDepth === undefined) {
  throw new Error('Укажите глубину отрисовки -d!')
}
if (dArgIndex && targetDepth < 0) {
  throw new Error('Глубина отрисовки не может быть отрицательной!')
}

const LINES = {
  CROSSING_T: '├',
  VERTICAL: '│',
  HORIZONTAL: '──',
  CORNER: '└',
  TAB: ' ',
}

/** Получение строки из item, повторяющихся length раз  */
const createStrOf = (item, length = 1) => {
  const arr = []
  arr.length = length
  return arr.fill(item).join('')
}

/** Создание структуры папки */
const createFolderScheme = (name) => {
  return {
    folder: name,
    children: [],
  }
}

const targetPath = path.resolve(__dirname, pathArg)
let foldersCounter = 0
let filesCounter = 0

/** Обход дерева, рекурсивное построение структуры папок */
const readFolder = async (iterationPath, depth = 0) => {
  const files = await fs.readdir(iterationPath)
  const folderScheme = createFolderScheme(path.basename(iterationPath))
  ++foldersCounter

  for (const file of files) {
    const filePath = path.resolve(iterationPath, file)
    const fileStat = await fs.stat(filePath)

    if (targetDepth !== undefined && depth >= targetDepth) {
      return folderScheme
    }

    if (fileStat.isDirectory()) {
      const scheme = await readFolder(filePath, depth + 1)
      folderScheme.children.push(scheme)
    } else {
      ++filesCounter
      folderScheme.children.push(path.basename(filePath))
    }
  }

  return folderScheme
}

/** Отрисовываем дерево по структуре папки */
const drawFolderTree = (scheme, level = 0) => {
  let str = `${scheme.folder}\n`

  const children = [...scheme.children]
  .sort((a, b) =>
    Number(typeof a === 'string') - Number(typeof b === 'string')
  ) // сортируем папки в начало, в файлы конец
  // .sort((a, b) =>
  //   Number(typeof b === 'string') - Number(typeof a === 'string')
  // ) // сортируем файлы в начало, папки в конец

  children.forEach((item, i, childrenArr) => {
    const isZeroLvl = level === 0
    const isLastInFolder = i === childrenArr.length - 1

    // Отрисовка файла
    if (typeof item === 'string') {
      const startLines = createStrOf(`${LINES.VERTICAL}${LINES.TAB}`, level)
      const beforeEndLine = isLastInFolder ? LINES.CORNER : LINES.CROSSING_T
      const endLine = LINES.HORIZONTAL

      str = `${str}${startLines}${beforeEndLine}${endLine}${item}\n`
    }

    // Отрисовка папки
    if (item.folder !== undefined) {
      const firstLine =
        (isZeroLvl && LINES.CROSSING_T)
        || (level === 0 && isLastInFolder && LINES.CORNER)
        || LINES.VERTICAL

      const middleLines =
        !isZeroLvl
          ? createStrOf(`${LINES.TAB}${LINES.VERTICAL}`, level - 1)
          : ''

      const beforeEndLine =
        (isLastInFolder && `${LINES.TAB}${LINES.CORNER}`)
        || (!isZeroLvl && !isLastInFolder && `${LINES.TAB}${LINES.CROSSING_T}`)
        || ''

      const endLine = LINES.HORIZONTAL

      const childDraw = drawFolderTree(item, level + 1)

      str = `${str}${firstLine}${middleLines}${beforeEndLine}${endLine}${childDraw}`
    }
  })

  return str
}


const init = async () => {
  try {
    const scheme = await readFolder(targetPath)
    const tree = drawFolderTree(scheme)
    console.log(`${tree}${foldersCounter} directories, ${filesCounter} files`)
  } catch (err) {
    console.error(err)
  }
}

init()
