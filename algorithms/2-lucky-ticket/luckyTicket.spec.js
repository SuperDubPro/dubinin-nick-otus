const { howManyLuckyTicketsFor6NumberJunior } = require('./junior')
const { howManyLuckyTicketsRecursion } = require('./middle')

describe('2-lucky-tickets-recursion', () => {
    test('---', () => {
        const result = howManyLuckyTicketsFor6NumberJunior()
        expect(result).toEqual(55252)
    })

    test('lucky tickets enumeration for 6 numbers ticket', () => {
        const result = howManyLuckyTicketsFor6NumberJunior()
        expect(result).toEqual(55252)
    })

    test('lucky tickets recursion n = 1', () => {
        const n = 1
        const result = howManyLuckyTicketsRecursion(n)
        expect(result).toEqual(10)
    })

    test('lucky tickets recursion n = 2', () => {
        const n = 2
        const result = howManyLuckyTicketsRecursion(n)
        expect(result).toEqual(670)
    })

    test('lucky tickets recursion n = 3', () => {
        const n = 3
        const result = howManyLuckyTicketsRecursion(n)
        expect(result).toEqual(55252)
    })

    test('lucky tickets recursion n = 4', () => {
        const n = 4
        const result = howManyLuckyTicketsRecursion(n)
        expect(result).toEqual(4816030)
    })

    // test('lucky tickets recursion n = 5', () => {
    //     const n = 5
    //     const result = howManyLuckyTicketsRecursion(n)
    //     expect(result).toEqual(432457640)
    // })
})
