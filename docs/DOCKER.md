# Docker

## docker-compose.yml (stack)

Defines three services:

1. **mongodb**
   - Image: `mongo:6`
   - Container name: `mongodb`
   - Persists data using named volume `mongo_data`

2. **app** (Node/Express)
   - Built from `./app`
   - Container name: `nodeapp`
   - Env:
     - `PORT=3000`
     - `MONGO_URL=mongodb://mongodb:27017/ecommerce`
   - Depends on mongodb

3. **nginx**
   - Image: `nginx:alpine`
   - Container name: `nginx`
   - Exposes `80:80`
   - Mounts `./nginx/nginx.conf` into `/etc/nginx/nginx.conf`
   - Depends on app

## app Dockerfile

- Base: `node:18-alpine`
- Copies `package.json`, installs dependencies, then copies the rest of the app
- Runs `node server.js`
