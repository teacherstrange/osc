const fs = require('fs');

try {
    const data = fs.readFileSync('./package.json', 'utf8');
    const devDeps = JSON.stringify({
        '@faker-js/faker': '*',
        cookie: '*',
        cypress: '*',
        '@testing-library/cypress': '^*'
    });
    const devDepsData = data.substr(0, 2) + '"devDependencies":' + devDeps + ',' + data.substr(2);

    fs.writeFileSync('./package.json', devDepsData);
} catch (err) {
    console.error(err);
}
