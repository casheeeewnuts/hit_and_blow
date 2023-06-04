module.exports = {
    countHitAndBlow
}

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