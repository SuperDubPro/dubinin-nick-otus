function isPrime(num) {
    let q = 0

    for (let i = 0; i <= num; i++) {
        if (num % i === 0) {
            q++
        }

        return q === 2
    }
}

module.exports = {
    isPrime,
}
