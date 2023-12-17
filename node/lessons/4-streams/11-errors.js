class ValidationError extends Error {
  constructor(message) {
    super(message)
    this.name = 'ValidationError'
  }
}

class NotValidationError extends Error {
  constructor(message) {
    super(message)
    this.name = 'NotValidationError'
  }
}

;(async () => {
  try {
    throw new ValidationError('val err')
  } catch (err) {
    console.log('err instanceof Error', err instanceof Error)
    console.log('err instanceof ValidationError', err instanceof ValidationError)
    console.log('err instanceof NotValidationError', err instanceof NotValidationError)

    console.error(err)
  }
})()
