module.exports = {
    apps: [
        {
            name: 'topfloorflat',
            script: 'dist/index.js',
        },
    ],
    deploy: {
        production: {
            // SSH user
            user: 'ubuntu',
            // SSH host
            host: ['192.168.1.168'],
            // GIT remote/branch
            ref: 'origin/master',
            // GIT remote
            repo: 'git@github.com:florianherrengt/propertiesscraper.git',
            // path in the server
            path: '/home/ubuntu/propertiesscraper',
            // Pre-setup command or path to a script on your local machine
            // 'pre-setup': 'apt-get install git ; ls -la',
            // Post-setup commands or path to a script on the host machine
            // eg: placing configurations in the shared dir etc
            // 'post-setup': 'ls -la',
            // pre-deploy action
            // 'pre-deploy-local': "echo 'This is a local executed command'",
            // post-deploy action
            'post-deploy': 'npm install && npm run build',
        },
    },
};
