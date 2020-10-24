const rq = require('amqplib/callback_api')

const fib = require('../fib')


function sendValueInFabQueue1(num) {
    rq.connect('amqp://localhost', (err, connection) => {
        if (err) process.exit()

        const queueName = 'Fib1'

        connection.createChannel((err, channel) => {
            if (err) {
                console.log(err)
                process.exit()
            } else {
                let { result } = fib.compute(num)
                channel.assertQueue(queueName, { durable: false })
                channel.sendToQueue(queueName, Buffer.from(result.toString()))
                console.log(`Queue Name is - ${queueName}`)
            }
        })
    })

}

module.exports = sendValueInFabQueue1