const { Readable, PassThrough } = require('stream')
const fs = require('fs')
const { runStream } = require('./index')
// const { runPipeline } = require('./pipeline')
const { runPipeline2 } = require('./pipeline2')

const createMockReadStream = (input) => () => {
  const readable = new Readable()
  readable.push(input)
  readable.push(null)
  return readable
}

const mockWriteStream =() => {
  return  new PassThrough()
}

describe('streams', () => {
  it('should transform "a c\\nb b" to "[1,2,1]" ', async () => {
    // Given
    const mockReadStream = createMockReadStream(`a c\nb b`)
    const spyRead = jest.spyOn(fs, 'createReadStream').mockImplementation(mockReadStream)
    const spyWrite = jest.spyOn(fs, 'createWriteStream').mockImplementation(mockWriteStream)
    // When
    const output = await runStream()
    const output2 = await runPipeline2()
    // Then
    expect(output).toBe('[1,2,1]')
    expect(output2).toBe('[1,2,1]')
    spyRead.mockRestore()
    spyWrite.mockRestore()
  })

  it('should transform "ab cb bss b" to "[1,1,1,1]" ', async () => {
    // Given
    const mockReadStream = createMockReadStream('ab cb bss b')
    const spyRead = jest.spyOn(fs, 'createReadStream').mockImplementation(mockReadStream)
    const spyWrite = jest.spyOn(fs, 'createWriteStream').mockImplementation(mockWriteStream)
    // When
    const output = await runStream()
    const output2 = await runPipeline2()
    // Then
    expect(output).toBe('[1,1,1,1]')
    expect(output2).toBe('[1,1,1,1]')
    spyRead.mockRestore()
    spyWrite.mockRestore()
  })

  it('should transform "ab, cb, bss, cb, b, cb" to "[1,1,1,3]" ', async () => {
    // Given
    const mockReadStream = createMockReadStream('ab, cb, bss, cb, b, cb')
    const spyRead = jest.spyOn(fs, 'createReadStream').mockImplementation(mockReadStream)
    const spyWrite = jest.spyOn(fs, 'createWriteStream').mockImplementation(mockWriteStream)
    // When
    const output = await runStream()
    const output2 = await runPipeline2()
    // Then
    expect(output).toBe('[1,1,1,3]')
    expect(output2).toBe('[1,1,1,3]')
    spyRead.mockRestore()
    spyWrite.mockRestore()
  })

  it('should transform "alex, alex, juan, dima" to "[2,1,1]" ', async () => {
    // Given
    const mockReadStream = createMockReadStream('alex, alex, juan, dima')
    const spyRead = jest.spyOn(fs, 'createReadStream').mockImplementation(mockReadStream)
    const spyWrite = jest.spyOn(fs, 'createWriteStream').mockImplementation(mockWriteStream)
    // When
    const output = await runStream()
    const output2 = await runPipeline2()
    // Then
    expect(output).toBe('[2,1,1]')
    expect(output2).toBe('[2,1,1]')
    spyRead.mockRestore()
    spyWrite.mockRestore()
  })

  it('should transform "alex, al#ex, juan, dima" to "[1,1,1]" ', async () => {
    // Given
    const mockReadStream = createMockReadStream('alex, al#ex, juan, dima')
    const spyRead = jest.spyOn(fs, 'createReadStream').mockImplementation(mockReadStream)
    const spyWrite = jest.spyOn(fs, 'createWriteStream').mockImplementation(mockWriteStream)
    // When
    const output = await runStream()
    const output2 = await runPipeline2()
    // Then
    expect(output).toBe('[1,1,1]')
    expect(output2).toBe('[1,1,1]')
    spyRead.mockRestore()
    spyWrite.mockRestore()
  })
})