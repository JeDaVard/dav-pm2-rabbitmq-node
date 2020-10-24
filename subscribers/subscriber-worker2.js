const redis = require('redis')
const fib = require('../fib')


const client = redis.createClient({
    host: '127.0.0.1',
    port: 6379
})


client.subscribe('sub2')

client.on('message', (channel, message) => {
    const { result } = fib.compute(Number.parseInt(message))
    console.log(`Fib value is ${result}`)
})