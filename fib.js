class Fib {
    result = 0;
    fibAlgo(num) {
        if (num < 2) return num
        return this.fibAlgo(num - 1) + this.fibAlgo(num - 2)
    }
    compute(n) {
        this.result = this.fibAlgo(n)
        return this
    }
    log() {
        console.log(this.result)
    }
}

module.exports = new Fib()