module.exports = {
  apps : [{
    name: 'Express 5 app',
    script: 'index.js',
    instances: 'MAX',
    exec_mode: 'cluster',
    autorestart: true,
    watch: true,
  },
  // {
  //   name: 'Worker1',
  //   script: 'worker1/index.js',
  //   instances: 1
  // },
  // {
  //   name: 'Worker2',
  //   script: 'worker2/index.js',
  //   instances: 1
  // }
    {
      name: 'Subscriber 1',
      script: 'subscribers/subscriber-worker1.js',
      instances: 1
    },
    {
      name: 'Subscriber 2',
      script: 'subscribers/subscriber-worker2.js',
      instances: 1
    }
    ],
  // deploy : {
  //   production : {
  //     user : 'SSH_USERNAME',
  //     host : 'SSH_HOSTMACHINE',
  //     ref  : 'origin/master',
  //     repo : 'GIT_REPOSITORY',
  //     path : 'DESTINATION_PATH',
  //     'pre-deploy-local': '',
  //     'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
  //     'pre-setup': ''
  //   }
  // }
};
