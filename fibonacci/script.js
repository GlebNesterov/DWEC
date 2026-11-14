'use strict';


// con recursividad
const fibonacci1 = n => {
    if(n < 2) return n;
    return fibonacci1(n - 1) + fibonacci1(n - 2);
}

// sin recursividad

const fibonacci2 = n => {
    const fib = [0, 1];
    for (let i = 2; i <= n; i++) {
        fib[i] = fib[i - 1] + fib[i - 2];
    }
    return fib[n];
}

console.log(fibonacci1(1))
console.log(fibonacci1(3));
console.log(fibonacci1(5));
console.log(fibonacci1(8));


console.log(fibonacci2(2))
console.log(fibonacci2(3));
console.log(fibonacci2(5));
console.log(fibonacci2(8));