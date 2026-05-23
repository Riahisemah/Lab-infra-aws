# App & API

The Node app (`app/server.js`) provides:

- REST API under `/api/*`
- Serves a frontend `index.html` for all other routes

## Health

### GET `/api/health`

Returns JSON:

```json
{
  "status": "OK",
  "timestamp": "<date>",
  "uptime": <seconds>
}
```

Note: Nginx also exposes `GET /health` (without `/api`) and proxies it to the app.

## Products

### GET `/api/products`

Query params:

- `category` (string; if not `Tous`)
- `search` (regex match on product `name`)
- `sort` in: `price_asc`, `price_desc`, `rating`, `popular` (reviews), default newest
- `featured` (boolean string: `true`)
- `limit` (default 50)

### GET `/api/products/:id`

Returns product by MongoDB ObjectId.

### GET `/api/categories`

Returns distinct product categories.

### GET `/api/featured`

Returns up to 6 products with `featured=true`.

## Orders

### POST `/api/orders`

Body:

- `items`: array of `{ productId, name, price, quantity, image }`
- `total`
- `customerName`, `customerEmail`
- optional: `phone`, `address`, `city`, `postalCode`

Behavior:

- generates `orderNumber = CMD-<timestamp>-<rand>`
- creates order with status `pending`
- decrements stock per ordered item

Response (201):

```json
{
  "success": true,
  "message": "Commande créée avec succès !",
  "orderId": "<mongo id>",
  "orderNumber": "<orderNumber>"
}
```

### GET `/api/orders/:id`

Returns an order by MongoDB id.

### GET `/api/orders`

Returns last 20 orders by `createdAt` desc.

## Stats

### GET `/api/stats`

Returns aggregated metrics:

- `totalProducts`
- `totalOrders`
- `lowStock` (products with stock < 20)
- `avgPrice`
- `totalRevenue` (orders with status in `delivered|shipped|confirmed`)

## Seed data

On startup, the app seeds the `Product` collection if empty.
