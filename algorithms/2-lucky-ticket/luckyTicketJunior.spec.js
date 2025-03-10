const { howManyLuckyTicketsFor6NumberJunior } = require('./junior')

describe('2-lucky-tickets', () => {
    test('junior 6 numbers ticket', () => {
        const result = howManyLuckyTicketsFor6NumberJunior()
        expect(result).toEqual(55252)
    })
})
