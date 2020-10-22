module.exports = {
  apps : [{
    name: 'Express 5 app',
    script: 'index.js',
    instances: 'MAX',
    exec_mode: 'cluster',
    autorestart: true,
    watch: true,
  }],
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
