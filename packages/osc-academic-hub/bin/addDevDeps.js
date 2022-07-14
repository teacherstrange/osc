const fs = require('fs');

try {
    const data = fs.readFileSync('./package.json', 'utf8');
    const devDeps = JSON.stringify({
        '@faker-js/faker': '*',
        cookie: '*',
        cypress: '*',
        '@testing-library/cypress': '^*',
        '@commitlint/cli': '^16.2.3',
        '@commitlint/config-conventional': '^16.2.1',
        '@faker-js/faker': '^6.3.1',
        '@remix-run/dev': '^1.5.1',
        '@remix-run/eslint-config': '^1.5.1',
        '@testing-library/cypress': '^8.0.3',
        '@testing-library/dom': '^8.13.0',
        '@testing-library/jest-dom': '^5.16.4',
        '@testing-library/react': '^13.3.0',
        '@testing-library/user-event': '^14.2.0',
        '@types/bcryptjs': '^2.4.2',
        '@types/eslint': '^8.4.2',
        '@types/node': '^17.0.35',
        '@types/react': '^17.0.45',
        '@types/react-dom': '^17.0.17',
        '@vitejs/plugin-react': '^1.3.2',
        autoprefixer: '^10.4.7',
        binode: '^1.0.5',
        c8: '^7.11.3',
        'cross-env': '^7.0.3',
        cypress: '^9.6.1',
        eslint: '^8.16.0',
        'eslint-config-prettier': '^8.5.0',
        'happy-dom': '^3.2.2',
        husky: '^7.0.4',
        msw: '^0.40.2',
        'npm-run-all': '^4.1.5',
        postcss: '^8.4.14',
        prettier: '2.6.2',
        'prettier-plugin-tailwindcss': '^0.1.11',
        prisma: '^3.15.1',
        'start-server-and-test': '^1.14.0',
        tailwindcss: '^3.0.24',
        'ts-node': '^10.7.0',
        'tsconfig-paths': '^4.0.0',
        typescript: '^4.6.4',
        vite: '^2.9.9',
        'vite-tsconfig-paths': '^3.4.1',
        vitest: '^0.12.8'
    });
    const devDepsData = data.substr(0, 2) + '"devDependencies":' + devDeps + ',' + data.substr(2);

    fs.writeFileSync('./package.json', devDepsData);
} catch (err) {
    console.error(err);
}
