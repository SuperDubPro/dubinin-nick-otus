const { sayHello } = require('./sample')

// файлы .spec для интеграционных или end-to-end тестов

test('sayHello returns Hello, World for input World', () => {
  // Given (Arrange - предусловие)
  const input = 'World'

  // When (Act - действие)
  const result = sayHello('World')

  // Then (Assert - результат)
  expect(result).toBe('Hello, World!')
})
