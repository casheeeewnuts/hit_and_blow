const net = require("net");

const server = net.createServer();
const secret = process.argv[2];

if (!secret) {
    console.error("secret number was not specified.");
    process.exit(1);
}

server.on("connection", socket => {
    socket.on("data", buf => {
        const answer = buf.toString().trim();
        const {hit, blow} = countHitAndBlow(secret, answer);

        socket.write(`${hit}E${blow}B`);
    });
});

server.listen(3000, "0.0.0.0");

function countHitAndBlow(secret, answer) {
    const secretDigits = new Set([...secret])
    let hit = 0, blow = 0;

    for (let i = 0; i < answer.length; i++) {
        if (answer[i] === secret[i]) {
            hit++;
        } else if (secretDigits.has(answer[i])) {
            blow++;
        }
    }

    return {
        hit, blow
    };
}