module.exports = {
    apps: [
        {
            name: 'topfloorflat',
            script: 'dist/index.js',
            instances: 2,
            exec_mode: 'cluster',
            watch: true,
            increment_var: 'PORT',
            env: {
                NODE_ENV: 'development',
                PORT: 3000,
            },
        },
    ],
    deploy: {
        production: {
            user: 'ubuntu',
            host: ['192.168.1.168'],
            ref: 'origin/master',
            repo: 'git@github.com:florianherrengt/propertiesscraper.git',
            path: '/home/ubuntu/propertiesscraper',
            'post-deploy': 'npm install --production && npm run build',
        },
    },
};
