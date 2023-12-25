const { logger } = require('./logger')

class PersonService {
  people = []

  constructor(people) {
    // this.logger = logger
    this.people = people
  }

  getByName(name) {
    const result = this.people.filter((person) => person.name === name)
    // this.logger.log(`Found ${result.length} entries`)
    logger.log(`Found ${result.length} entries`)
    return result
  }
}

module.exports = {
  PersonService,
}
