const { isPrime } = require('./prime')

describe('prime numbers', () => {
    test('simple isPrime take 17 return true', () => {
        const result = isPrime(17)
        expect(result).toEqual(true)
    })
})
