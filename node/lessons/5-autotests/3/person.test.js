const { Person } = require('./person')

describe('Person', () => {
  // test('accepting age and name', () => { // test не отличается по функционалу, просто для языкового смысла
  it('should accept age and name', () => {
    // Given
    const age = 10
    const name = 'Tolik'
    // when
    const person = new Person(age, name)
    // Then
    expect(person.age).toEqual(age)
    expect(person.name).toEqual(name)
  })

  it('should allow incrementing age', () => {
    // given
    const age = 10
    const name = 'Tolik'
    // when
    const person = new Person(age, name)
    person.birthDay()
    // then
    expect(person.age).toEqual(age + 1)
  })
})
