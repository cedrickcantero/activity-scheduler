const fs = require('fs');

function solve() {
    const input = fs.readFileSync('input.txt', 'utf8').split('\n');
    let T = parseInt(input[0], 10);
    let index = 1;

    for (let t = 1; t <= T; t++) {
        let N = parseInt(input[index], 10);
        let activities = [];

        for (let i = 0; i < N; i++) {
            let [S, E] = input[index + i + 1].split(' ').map(Number);
            activities.push({ S, E, idx: i });
        }

        activities.sort((a, b) => a.S - b.S);

        let result = Array(N).fill('');
        let L_end = 0;
        let C_end = 0;
        let possible = true;

        for (let activity of activities) {
            let { S, E, idx } = activity;

            if (S >= L_end) {
                result[idx] = 'C';
                L_end = E;
            } else if (S >= C_end) {
                result[idx] = 'J';
                C_end = E;
            } else {
                possible = false;
                break;
            }
        }

        if (possible) {
            console.log(`Case #${t}: ${result.join('')}`);
        } else {
            console.log(`Case #${t}: IMPOSSIBLE`);
        }

        index += N + 1;
    }
}

// Call solve function to execute the solution
solve();
