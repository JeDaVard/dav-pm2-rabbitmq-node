const express = require('express')
const cluster = require('cluster')
const os = require('os')
const fs = require('fs')
const crypto = require('crypto')
const { promisify } = require('util')

const pbkdf2 = promisify(crypto.pbkdf2)
// const fib = require('./fib')



// const app = express()
//
// app.get('/fib', (req,res) => {
//     // console.log(`REQUEST: Cluster worker ${cluster.worker.id}, pid ${cluster.worker.process.pid}`)
//     // const { result } = fib.compute(req.query.n)
//     const start = Date.now()
//     const key = crypto.pbkdf2Sync('secret', 'salt', 1240000, 64,'sha512');
//     // const key = await pbkdf2('secret', 'salt', 1240000, 64,'sha512');
//     const end = Date.now()
//     fs.appendFileSync('a.csv', `REQUEST: dur-${end-start} / start-${new Date(start).toISOString()} / start-${new Date(end).toISOString()} / res-${key.toString('hex')}\n`)
//     res.status(200).json(end-start)
// })
//
// app.listen(3000,() => {
//     console.log('Server is up on 3000')
// })

const CPUs = os.cpus().length

if (cluster.isMaster) {
    console.log(`Cluster is in master, total CPUs is ${CPUs}`)

    const worker1 = require('child_process').fork('./worker1/index.js')
    const worker2 = require('child_process').fork('./worker2/index.js')

    console.log(`Child process ID is ${worker1.pid}`)
    console.log(`Child process ID is ${worker2.pid}`)

    worker1.on('message', result => {
        console.log(`Worker 1 result - ${result}`)
    })
    worker2.on('message', result => {
        console.log(`Worker 2 result - ${result}`)
    })

    cluster.on('online', (worker) => {
        console.log(`Message received from - pid ${worker.process.pid}`)
        worker.on('message', num => {
            if (num % 2 === 0) {
                worker1.send(num)
            } else {
                worker2.send(num)
            }
        })
    })

    for (let i = 0; i < CPUs; i++) {
        cluster.fork()
    }
    cluster.on('online', worker => {
        console.log(`ONLINE: Worker id is ${worker.id}, pid ${worker.process.pid}`)
    })
    cluster.on('exit', worker => {
        console.log(`EXIT: Worker id is ${worker.id}, pid ${worker.process.pid}`)
        cluster.fork()
    })
} else {
    const app = express()

    app.get('/fib', (req,res) => {
        // console.log(`REQUEST: Cluster worker ${cluster.worker.id}, pid ${cluster.worker.process.pid}`)
        // const { result } = fib.compute(req.query.n)
        // const start = Date.now()
        // const key = crypto.pbkdf2Sync('secret', 'salt', 1240000, 64,'sha512');
        // // const key = await pbkdf2('secret', 'salt', 1240000, 64,'sha512');
        // const end = Date.now()
        // fs.appendFileSync('a.csv', `REQUEST: dur-${end-start} / start-${new Date(start).toISOString()} / start-${new Date(end).toISOString()} / pid-${cluster.worker.process.pid} / id-${cluster.worker.id} / res-${key.toString('hex')}\n`)
        // res.status(200).json(end-start)

        process.send(req.query.n)
        res.status(200).end()

    })

    app.listen(3000,() => {
        console.log('Server is up on 3000')
    })
}