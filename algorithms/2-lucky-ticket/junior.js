// fformula@gmail.com преподаватель

howManyLuckyTicketsFor6NumberJunior = (ticketNumber) => {
    let count = 0
    // let n = 6

    for (let a1 = 0; a1 < 10; a1++) {
    for (let a2 = 0; a2 < 10; a2++) {
    for (let a3 = 0; a3 < 10; a3++) {
        const leftSum = a1 + a2 + a3

        for (let b1 = 0; b1 < 10; b1++) {
        for (let b2 = 0; b2 < 10; b2++) {
        for (let b3 = 0; b3 < 10; b3++) {
            const rightSum = b1 + b2 + b3

            if (leftSum === rightSum) {
                count++
            }
        }}}
    }}}

    return count
};

// 55252

module.exports = {
    howManyLuckyTicketsFor6NumberJunior,
}