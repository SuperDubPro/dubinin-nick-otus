const service = {
  do() {
    fetch('')
  }
}

// моки это боль, старайся избегать их или использовать спец инструменты
const mockedService = {
  do() {
    console.log('123')
  }
}

module.exports = {
  service
}
