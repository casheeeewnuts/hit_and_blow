const net = require("net");
const {countHitAndBlow} = require("./function");

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

    socket.write(secret.length.toString());
});

server.listen(3000, "0.0.0.0");