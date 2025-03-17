function fibonacciRecursion(k) {
    if (k <= 1) {
        return k
    }
    return fibonacciRecursion(k - 1) + fibonacciRecursion(k - 2)
}

function fibonacciIteration(k) {
    if (k <= 1) {
        return k
    }

    let f1 = 0
    let f2 = 0
    let f3 = 0

    for (let i = 0; i <= k, i++) {
        f1 =
    }
}

function fibonacciGoldenRatio() {}

module.exports = {
    fibonacciRecursion,
    fibonacciIteration,
    fibonacciGoldenRatio,    
}
