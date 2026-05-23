# Nginx

The Nginx config is in `nginx/nginx.conf`.

## Upstream

```nginx
upstream nodeapp {
  server app:3000;
}
```

> In `docker-compose.yml`, the app container is named `nodeapp`. If you keep `upstream nodeapp { server app:3000; }`, the upstream host should match the actual service name reachable on the Docker network. Ensure the upstream target resolves correctly.

## Routes

- `location /health`
  - proxies to `http://nodeapp`
  - used by Ansible health check

- `location /`
  - proxies requests to the Node app
  - supports upgrade headers (useful for websockets)
