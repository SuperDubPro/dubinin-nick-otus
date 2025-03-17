const howManyLuckyTickets = (N) => {
    // массивы, где индекс - сумма цифр, а значение - количество таких сумм в числе из n цифр
    let equalSumAmount = []
    let previousEqualSumAmount = []

    for(let n = 1; n <= N; n++) {
        equalSumAmount = []
        // перебор цифр
        for(let digit = 0; digit < 10; digit++) {
            // при n === 1 сумма и цифра равны
            if (n === 1) {
                equalSumAmount.push(1)
                previousEqualSumAmount.push(1)
                continue
            }

            // перебор сумм
            for(let sum = digit; sum <= digit + previousEqualSumAmount.length - 1; sum++) {
                const currentSum = equalSumAmount[sum] ?? 0
                // к текущему количеству сумм добавляем количество сумм цифр, посчитанных для предыдущего n
                equalSumAmount[sum] = currentSum + previousEqualSumAmount[sum - digit]
            }
        }

        previousEqualSumAmount = [...equalSumAmount]
    }

    // возводим в квадрат каждое количество сумм (k), т к N это только половина числа, а каждую половину числа можно составить k способами
    return equalSumAmount
        .reduce((accumulator, current) => accumulator + BigInt(current) ** 2n, 0n)
}

module.exports = {
    howManyLuckyTickets,
}
