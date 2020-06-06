module.exports = {
    apps: [
        {
            name: 'topfloorflat',
            script: 'dist/index.js',
        },
    ],
    deploy: {
        production: {
            user: 'ubuntu',
            host: ['192.168.1.168'],
            ref: 'origin/master',
            repo: 'git@github.com:florianherrengt/propertiesscraper.git',
            path: '/home/ubuntu/propertiesscraper',
            'post-deploy': 'npm install && npm run build',
        },
    },
};
