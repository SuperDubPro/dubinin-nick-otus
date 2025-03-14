const howManyLuckyTicketsRecursion = (n) => {
    let result = 0

    const calculateNext = (n, sumA, sumB) => {
        if (n === 0) {
            if (sumA === sumB) {
                result++
            }
            return
        }
    
        for(let a = 0; a < 10; a++) {
            for(let b = 0; b < 10; b++) {
                calculateNext(n - 1, sumA + a, sumB + b)
            }
        }
    }

    calculateNext(n, 0, 0)
    return result
}

module.exports = {
    howManyLuckyTicketsRecursion,
}
