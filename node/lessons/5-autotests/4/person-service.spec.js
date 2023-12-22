const { PersonService } = require('./person-service')
const { Person } = require('../3/person')

describe('PersonService', () => {
  it('should find by name', () => {
    // Given
    const loggingFn = jest.fn()
    const mockLogger = {
      log: loggingFn
    }
    const people = [
      new Person(10, 'Ars'),
      new Person(20, 'Nick'),
      new Person(25, 'Ars'),
    ]
    const service = new PersonService(mockLogger, people)
    // when
    const found = service.getByName('Ars')
    // Then
    expect(found).toHaveLength(2)
    expect(found[0].age).toEqual(10)
    expect(found[1].age).toEqual(25)
    expect(loggingFn).toHaveBeenCalledWith('Found 2 entries')
  })
})
