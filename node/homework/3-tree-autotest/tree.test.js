// const mock = require('mock-fs')
const { FolderTree } = require('../1.2-folder-tree')
const { createTestFolder, deleteTestFolder } = require('./createTestFolder')

describe('tree', () => {
  const originalLog = console.log

  beforeAll(() => {
    // убираем console.log дерева из консоли теста
    console.log = jest.fn()
    createTestFolder()
    // mock({
    //   // 'D:/Projects/study/dubinin-nick-otus/node/homework/3-tree-autotest/tree-test': {
    //   './tree-test': {
    //     'aaa': {
    //       'aa': {
    //         'a': {
    //           'deep': {
    //             'andDeeper': {
    //               'andDeeper.js': '',
    //             },
    //             'deep.js': '',
    //           },
    //           'a.js': '',
    //         },
    //         'aa.js': '',
    //       },
    //       'aaa.js': '',
    //       'aaa2.js': '',
    //     },
    //     'almost2Empty': {
    //       'empty1': {},
    //       'empty2': {},
    //     },
    //     'almostEmpty': {
    //       'empty': {},
    //     },
    //     'bbb': {
    //       'empty': {},
    //       'bbb.js': '',
    //     },
    //     'ccc': {
    //       'ccc.js': '',
    //     },
    //     'ddd': {
    //       'ddd1.js': '',
    //       'ddd2.js': '',
    //     },
    //     'empty': {},
    //     'treeTest.js': '',
    //   },
    // })
  })

  afterAll(() => {
    console.log = originalLog
    deleteTestFolder()
    // mock.restore()
  })

  it('should throw no path error', () => {
    // Given
    const targetPath = undefined
    try {
      // When
      new FolderTree(targetPath)
    } catch (err) {
      // Then
      expect(err.message).toBe('Укажите путь к папке!')
    }
  })

  it('should throw no negative -d error',() => {
    // Given
    const targetPath = '../3-tree-autotest/tree-test'
    const targetDepth = -1
    try {
      // When
      new FolderTree(targetPath, targetDepth)
    } catch (err) {
      // Then
      expect(err.message).toBe('Глубина отрисовки не может быть отрицательной!')
    }
  })

  it('should read empty folder', async () => {
    // Given
    const targetPath = '../3-tree-autotest/tree-test/empty'
    // When
    const folderTree = new FolderTree(targetPath)
    const tree = await folderTree.init()
    // Then
      expect(tree).toBe('empty\n1 directories, 0 files')
  })

  it('should draw tree with one file', async () => {
    // Given
    const targetPath = '../3-tree-autotest/tree-test/ccc'
    // When
    const folderTree = new FolderTree(targetPath)
    const tree = await folderTree.init()
    // Then
    expect(tree).toBe(
      `ccc
└──ccc.js
1 directories, 1 files`
    )
  })

  it('should draw tree with two files', async () => {
    // Given
    const targetPath = '../3-tree-autotest/tree-test/ddd'
    // When
    const folderTree = new FolderTree(targetPath)
    const tree = await folderTree.init()
    // Then
    expect(tree).toBe(
      `ddd
├──ddd1.js
└──ddd2.js
1 directories, 2 files`
    )
  })

  it('should draw tree with an empty folder and a file', async () => {
    // Given
    const targetPath = '../3-tree-autotest/tree-test/bbb'
    // When
    const folderTree = new FolderTree(targetPath)
    const tree = await folderTree.init()
    // Then
    expect(tree).toBe(
      `bbb
├──empty
└──bbb.js
2 directories, 1 files`
    )
  })

  it('should draw tree with an empty folder', async () => {
    // Given
    const targetPath = '../3-tree-autotest/tree-test/almostEmpty'
    // When
    const folderTree = new FolderTree(targetPath)
    const tree = await folderTree.init()
    // Then
    expect(tree).toBe(
      `almostEmpty
└──empty
2 directories, 0 files`
    )
  })

  it('should draw tree with two empty folders', async () => {
    // Given
    const targetPath = '../3-tree-autotest/tree-test/almost2Empty'
    // When
    const folderTree = new FolderTree(targetPath)
    const tree = await folderTree.init()
    // Then
    expect(tree).toBe(
      `almost2Empty
├──empty1
└──empty2
3 directories, 0 files`
    )
  })

  it('should draw complex tree', async () => {
    // Given
    const targetPath = '../3-tree-autotest/tree-test'
    // When
    const folderTree = new FolderTree(targetPath)
    const tree = await folderTree.init()
    // Then
    expect(tree).toBe(
      `tree-test
├──aaa
│  ├──aa
│  │  ├──a
│  │  │  ├──deep
│  │  │  │  ├──andDeeper
│  │  │  │  │  └──andDeeper.js
│  │  │  │  └──deep.js
│  │  │  └──a.js
│  │  └──aa.js
│  ├──aaa.js
│  └──aaa2.js
├──almost2Empty
│  ├──empty1
│  └──empty2
├──almostEmpty
│  └──empty
├──bbb
│  ├──empty
│  └──bbb.js
├──ccc
│  └──ccc.js
├──ddd
│  ├──ddd1.js
│  └──ddd2.js
├──empty
└──treeTest.js
16 directories, 11 files`
    )
  })

  it('should draw 0 level tree', async () => {
    // Given
    const targetPath = '../3-tree-autotest/tree-test/aaa'
    const targetDepth = 0
    // When
    const folderTree = new FolderTree(targetPath, targetDepth)
    const tree = await folderTree.init()
    // Then
    expect(tree).toBe('aaa\n1 directories, 0 files')
  })

  it('should draw 1 level tree', async () => {
    // Given
    const targetPath = '../3-tree-autotest/tree-test/aaa'
    const targetDepth = 1
    // When
    const folderTree = new FolderTree(targetPath, targetDepth)
    const tree = await folderTree.init()
    // Then
    expect(tree).toBe(
      `aaa
├──aa
├──aaa.js
└──aaa2.js
2 directories, 2 files`
    )
  })

  it('should draw 2 levels tree', async () => {
    // Given
    const targetPath = '../3-tree-autotest/tree-test/aaa'
    const targetDepth = 2
    // When
    const folderTree = new FolderTree(targetPath, targetDepth)
    const tree = await folderTree.init()
    // Then
    expect(tree).toBe(
      `aaa
├──aa
│  ├──a
│  └──aa.js
├──aaa.js
└──aaa2.js
3 directories, 3 files`
    )
  })

  it('should draw 999 levels tree', async () => {
    // Given
    const targetPath = '../3-tree-autotest/tree-test/aaa'
    const targetDepth = 999
    // When
    const folderTree = new FolderTree(targetPath, targetDepth)
    const tree = await folderTree.init()
    // Then
    expect(tree).toBe(
      `aaa
├──aa
│  ├──a
│  │  ├──deep
│  │  │  ├──andDeeper
│  │  │  │  └──andDeeper.js
│  │  │  └──deep.js
│  │  └──a.js
│  └──aa.js
├──aaa.js
└──aaa2.js
5 directories, 6 files`
    )
  })
})
