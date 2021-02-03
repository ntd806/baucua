module.exports={
  apps : [
    {
      name: 'REACTJS',
      script: 'public/scripts/start.js',
      instances: 1, 
      autorestart: true,
      watch: true,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
        port:3000,
        sitename:'React.js Website'
      },
      env_production: {
        NODE_ENV: 'production',
        port:3000,
        sitename:'React.js Website'
      }
    },
    {
      name: 'NODEJS',
      script: 'server/src/index.js',
      instances: 1,
      autorestart: true,
      watch: true,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'development',
        PORT:3002,
        //... all you ENV vars goes here for development mode
      },
      env_production: {
        NODE_ENV: 'production',
        PORT:3002,
         //... all you ENV vars goes here for production mode
      }
  }
]
};