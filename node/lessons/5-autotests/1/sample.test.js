const { sayHello } = require('./sample')

test('sayHello returns Hello, World for input World', () => {
  // Given (Arrange - предусловие)
  const input = 'World'

  // When (Act - действие)
  const result = sayHello(input)

  // Then (Assert - результат)
  expect(result).toBe('Hello, World!')
})
