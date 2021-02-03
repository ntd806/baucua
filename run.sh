#!/bin/bash
echo "Building react......"
cd public
npm run build
pm2 serve build 3000 --spa
echo "Building nodejs........"
cd ../
pm2 start pm2-apps.json
echo "Server is starting"