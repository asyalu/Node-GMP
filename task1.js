process.stdin.on('data', (data) => {
    process.stdout.write('\n' + data.toString().split('').reverse().join(''))
})