const howManyLuckyTicketsRecursion = (n) => {
    let result = 0

    const calculateNext = (n, sumA, sumB) => {
        if (sumA === sumB) {
            result++
        }

        if (n = 0) {
            return result
        }
    
        for(let a = 0; a++; a < 10) {
            for(let b = 0; b++; b < 10) {
                return calculateNext(n - 1, sumA + a, sumB + b)
            }
        }
    }

    return calculateNext(n, 0, 0)
}

module.exports = {
    howManyLuckyTicketsRecursion,
}
