'use strict';
const config = require('conventional-changelog-conventionalcommits');

module.exports = config({
    types: [
        { type: 'feat', section: '✨ Features' },
        { type: 'fix', section: '🐛 Bugs' },
        { type: 'ci', section: '⚙️ CI/CD Updates' },
        { type: 'docs', section: '📝 Documentation' },
        { type: 'perf', section: '⚡️ Performance' },
        { type: 'test', section: '🧪 Tests' },
        { type: 'refactor', section: '♻️ Refactors' },
        { type: 'chore', section: '📦 General Housekeeping / Package Updates' }
    ]
});
