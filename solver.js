const net = require("net");
const {countHitAndBlow} = require('./function');


let digits;
let turn = 0;
let startTime;
let candidates;
let lastCalled;

const connection = net.createConnection(process.argv[3] ?? 3000, process.argv[2] ?? "127.0.0.1");

connection.once("connect", () => {
    console.error("Game Start");
});

connection.on("data", (buf) => {
    if (turn === 0) {
        digits = Number(buf.toString());

        console.error(`Digit is ${digits}`);
        candidates = createCandidate(digits);

        startTime = Date.now();
        lastCalled = candidates[0];
        connection.write(lastCalled);
        turn++;

        return;
    }

    console.error(lastCalled, buf.toString())

    if (buf.toString() === `${digits}E0B`) {
        connection.destroy();
        console.log(`secret ${lastCalled}, called ${turn} times, takes ${(Date.now() - startTime) / 1000} seconds`)
    }

    candidates = updateCandidate(candidates, lastCalled, buf.toString())

    lastCalled = choice(candidates);
    connection.write(lastCalled);
    turn++;
});

/*
 -----------------------------------------------------------------------------------------------------------------------
 */

function choice(candidates) {
    const cs = candidates.slice(0, 10 ** 2)
    const [c, _] = cs.map(c => [c, entropy(c, cs)]).reduce(([num, e], [num2, e2]) => {
        if (e == null) {
            return [num2, e2]
        } else if (e < e2) {
            return [num2, e2]
        } else {
            return [num, e]
        }
    }, [])

    return c
}

function entropy(num, candidates) {
    const patternCount = candidates.reduce((c, n) => {
        const {hit, blow} = countHitAndBlow(num, n);

        if (c[`${hit}E${blow}B`] != null) {
            c[`${hit}E${blow}B`]++;
        } else {
            c[`${hit}E${blow}B`] = 1;
        }

        return c;
    }, {})

    return sum([...Object.values(patternCount)].map(v => {
        const p = v / candidates.length;

        return p * Math.log2(p);
    }));
}

function createCandidate(d) {
    function $(arr, d) {
        if (d === 1) {
            return arr.map(String);
        }

        return arr.flatMap(n => {
            const child = $(arr.filter(other => n !== other), d - 1);

            return child.map(c => n.toString() + c.toString())
        })
    }

    return $([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], d);
}

function updateCandidate(candidates, called, result) {
    return candidates.filter(c => {
        const {hit, blow} = countHitAndBlow(c, called)
        return `${hit}E${blow}B` === result
    })
}

function sum(numbers) {
    return numbers.reduce((sum, n) => sum + n, 0);
}
