const { fibonacciRecursion } = require('./fibonacci')

describe('fibonacci', () => {
    test('fibonacciRecursion take 10 an return 55', () => {
        const result = fibonacciRecursion(10)
        expect(result).toEqual(55)
    })
})
