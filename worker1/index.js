const fib = require('../fib')

process.on('message', number => {
    let { result } = fib.compute(number)
    console.log(`Worker 1 - pid: ${process.pid}`)
    process.send(result)
})