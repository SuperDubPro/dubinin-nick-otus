const howManyLuckyTicketsRecursion = (n) => {
    let result = 0

    const calculateNext = (n, sumA, sumB) => {
        if (n === 0) {
            // проверку суммы делаем когда n === 0 потому, что тогда будет сумма n чисел, сумма их части нам не интересна
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

const howManyLuckyTicketsFasterRecursion = (n) => {
    let result = 0
    const maxSum = 9 * n

    const calculateNext = (n, sumA, sumB) => {
        // Последнее число можно посчитать
        if (n === 1) {
            // sumA + a === sumB + b
            // b = sumA + a - sumB
            for (let a = 0; a < 10; a++) {
                const b = sumA + a - sumB
                if (b >= 0 && b < 10) {
                    result ++
                }
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
    howManyLuckyTicketsFasterRecursion,
}
