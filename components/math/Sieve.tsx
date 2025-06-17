export class Sieve {
    limit: number;
    primes: boolean[];
    steps: { base: number; multiple: number }[];

    constructor(limit: number) {
        this.limit = limit;
        this.primes = Array(limit + 1).fill(true);
        this.primes[0] = false;
        this.primes[1] = false;
        this.steps = [];
        this.generateSteps();
    }

    generateSteps() {
        this.steps.push({ base: 0, multiple: 0 });
        this.steps.push({ base: 1, multiple: 1 });
        for (let i = 2; i <= this.limit; i++) {
            if (this.primes[i]) {
                for (let j = 2*i; j <= this.limit; j += i) {
                    if (this.primes[j]) {
                        this.primes[j] = false;
                        this.steps.push({ base: i, multiple: j });
                    }
                }
            }
        }
    }

    getPrimes() {
        return this.primes;
    }

    getSteps() {
        return this.steps;
    }
}