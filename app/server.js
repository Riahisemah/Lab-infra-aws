require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://mongodb:27017/ecommerce';

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ── Connect to MongoDB ──────────────────────────────────────
mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('✅ MongoDB connected');
    seedProducts();
  })
  .catch(err => console.error('❌ MongoDB error:', err));

// ── Models ──────────────────────────────────────────────────
const ProductSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  price:       { type: Number, required: true },
  description: { type: String },
  category:    { type: String },
  image:       { type: String },
  stock:       { type: Number, default: 100 },
  rating:      { type: Number, default: 4.5 }
});

const OrderSchema = new mongoose.Schema({
  items:      [{ product: String, qty: Number, price: Number }],
  total:      Number,
  customer:   String,
  createdAt:  { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', ProductSchema);
const Order   = mongoose.model('Order', OrderSchema);

// ── Seed Data ───────────────────────────────────────────────
async function seedProducts() {
  const count = await Product.countDocuments();
  if (count === 0) {
    await Product.insertMany([
      { name: 'Laptop Pro 15"',   price: 1200, category: 'Electronics', description: 'High-performance laptop with 16GB RAM and 512GB SSD', stock: 50,  rating: 4.8, image: '💻' },
      { name: 'Smartphone X12',   price: 800,  category: 'Electronics', description: 'Latest smartphone with 5G and 108MP camera',           stock: 100, rating: 4.7, image: '📱' },
      { name: 'Wireless Headphones', price: 200, category: 'Audio',     description: 'Noise-cancelling headphones, 30h battery',             stock: 200, rating: 4.6, image: '🎧' },
      { name: 'Smart Watch',      price: 350,  category: 'Wearables',   description: 'Fitness tracking, GPS, heart rate monitor',            stock: 75,  rating: 4.5, image: '⌚' },
      { name: 'Tablet 10"',       price: 450,  category: 'Electronics', description: '2K display, 8-core processor, 256GB storage',         stock: 60,  rating: 4.4, image: '📟' },
      { name: 'Mechanical Keyboard', price: 120, category: 'Accessories', description: 'RGB backlit, tactile switches, USB-C',               stock: 150, rating: 4.9, image: '⌨️' },
      { name: 'Gaming Mouse',     price: 80,   category: 'Accessories', description: '16000 DPI, 7 programmable buttons, RGB',              stock: 180, rating: 4.7, image: '🖱️' },
      { name: '4K Monitor 27"',   price: 600,  category: 'Electronics', description: 'IPS panel, 144Hz, HDR400, USB-C hub',                 stock: 40,  rating: 4.8, image: '🖥️' },
    ]);
    console.log('✅ Products seeded');
  }
}

// ── API Routes ───────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date(), service: 'ecommerce-app' });
});

app.get('/api/products', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};
    if (category && category !== 'All') query.category = category;
    if (search) query.name = { $regex: search, $options: 'i' };
    const products = await Product.find(query);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json({ message: 'Order placed!', order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).limit(10);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Serve frontend ───────────────────────────────────────────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
