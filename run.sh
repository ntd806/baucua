#!/bin/bash
echo "Building react......"
echo cd public
echo npm run build
echo pm2 serve build 3000 --spa
echo "Building nodejs........"
echo pm2 start pm2-apps.json
echo "Server is starting"