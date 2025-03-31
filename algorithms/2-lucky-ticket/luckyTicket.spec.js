const { howManyLuckyTicketsFor6Number } = require('./junior')
const { howManyLuckyTicketsRecursion, howManyLuckyTicketsFasterRecursion } = require('./middle')
const { howManyLuckyTickets } = require('./senior')

describe('2-lucky-tickets', () => {
    test('--- timer reset ---', () => {
        const result = howManyLuckyTicketsFor6Number()
        expect(result).toEqual(55252)
    })

    test('lucky tickets enumeration for 6 numbers ticket', () => {
        const result = howManyLuckyTicketsFor6Number()
        expect(result).toEqual(55252)
    })

    test('lucky tickets recursion N = 1', () => {
        const N = 1
        const result = howManyLuckyTicketsRecursion(N)
        expect(result).toEqual(10)
    })

    test('lucky tickets recursion N = 2', () => {
        const N = 2
        const result = howManyLuckyTicketsRecursion(N)
        expect(result).toEqual(670)
    })  

    test('lucky tickets recursion N = 3', () => {
        const N = 3
        const result = howManyLuckyTicketsRecursion(N)
        expect(result).toEqual(55252)
    })

    test('lucky tickets recursion N = 4', () => {
        const N = 4
        const result = howManyLuckyTicketsRecursion(N)
        expect(result).toEqual(4816030)
    })

    // test('lucky tickets recursion N = 5', () => {
    //     // долго =)
    //     const N = 5
    //     const result = howManyLuckyTicketsRecursion(N)
    //     expect(result).toEqual(432457640)
    // })

    test('lucky tickets faster recursion N = 1', () => {
        const N = 1
        const result = howManyLuckyTicketsFasterRecursion(N)
        expect(result).toEqual(10)
    })

    test('lucky tickets faster recursion N = 2', () => {
        const N = 2
        const result = howManyLuckyTicketsFasterRecursion(N)
        expect(result).toEqual(670)
    })

    test('lucky tickets faster recursion N = 3', () => {
        const N = 3
        const result = howManyLuckyTicketsFasterRecursion(N)
        expect(result).toEqual(55252)
    })

    test('lucky tickets faster recursion N = 4', () => {
        const N = 4
        const result = howManyLuckyTicketsFasterRecursion(N)
        expect(result).toEqual(4816030)
    })

    test('lucky tickets smart N = 1', () => {
        const N = 1
        const result = howManyLuckyTickets(N)
        expect(result).toEqual(10n)
    })

    test('lucky tickets smart N = 2', () => {
        const N = 2
        const result = howManyLuckyTickets(N)
        expect(result).toEqual(670n)
    })

    test('lucky tickets smart N = 3', () => {
        const N = 3
        const result = howManyLuckyTickets(N)
        expect(result).toEqual(55252n)
    })

    test('lucky tickets smart N = 4', () => {
        const N = 4
        const result = howManyLuckyTickets(N)
        expect(result).toEqual(4816030n)
    })

    test('lucky tickets smart N = 5', () => {
        const N = 5
        const result = howManyLuckyTickets(N)
        expect(result).toEqual(432457640n)
    })

    test('lucky tickets smart N = 6', () => {
        const N = 6
        const result = howManyLuckyTickets(N)
        expect(result).toEqual(39581170420n)
    })

    test('lucky tickets smart N = 7', () => {
        const N = 7
        const result = howManyLuckyTickets(N)
        expect(result).toEqual(3671331273480n)
    })

    test('lucky tickets smart N = 8', () => {
        const N = 8
        const result = howManyLuckyTickets(N)
        expect(result).toEqual(343900019857310n)
    })

    test('lucky tickets smart N = 9', () => {
        const N = 9
        const result = howManyLuckyTickets(N)
        expect(result).toEqual(32458256583753952n)
    })

    test('lucky tickets smart N = 10', () => {
        const N = 10
        const result = howManyLuckyTickets(N)
        expect(result).toEqual(3081918923741896840n)
    })
})
