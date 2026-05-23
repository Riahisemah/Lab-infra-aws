require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URL =
  process.env.MONGO_URL || "mongodb://localhost:27017/ecommerce";

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Connexion MongoDB
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("✅ MongoDB connecté");
    seedDatabase();
  })
  .catch((err) => console.error("❌ MongoDB error:", err));

// ==================== MODÈLES ====================
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, default: "🛍️" },
  stock: { type: Number, default: 50 },
  rating: { type: Number, default: 4.5 },
  reviews: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
});

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const OrderSchema = new mongoose.Schema({
  orderNumber: { type: String, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      productId: String,
      name: String,
      price: Number,
      quantity: Number,
      image: String,
    },
  ],
  total: { type: Number, required: true },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  phone: String,
  address: String,
  city: String,
  postalCode: String,
  status: {
    type: String,
    enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
  paymentMethod: { type: String, default: "card" },
  createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", ProductSchema);
const User = mongoose.model("User", UserSchema);
const Order = mongoose.model("Order", OrderSchema);

// ==================== SEED DATABASE ====================
async function seedDatabase() {
  const productCount = await Product.countDocuments();
  if (productCount === 0) {
    const products = [
      {
        name: "MacBook Pro M3",
        price: 1999,
        description:
          "Ordinateur professionnel avec puce M3 Pro, 18GB RAM, 512GB SSD, écran Liquid Retina XDR",
        category: "Électronique",
        image: "💻",
        stock: 25,
        rating: 4.9,
        reviews: 128,
        featured: true,
      },
      {
        name: "iPhone 15 Pro Max",
        price: 1299,
        description:
          'Smartphone dernière génération, écran 6.7", puce A17 Pro, 256GB, titane',
        category: "Électronique",
        image: "📱",
        stock: 50,
        rating: 4.9,
        reviews: 342,
        featured: true,
      },
      {
        name: "Casque Sony WH-1000XM5",
        price: 399,
        description:
          "Casque audio à réduction de bruit active, 30h d'autonomie, charge rapide",
        category: "Audio",
        image: "🎧",
        stock: 75,
        rating: 4.9,
        reviews: 189,
        featured: true,
      },
      {
        name: "Apple Watch Ultra 2",
        price: 799,
        description:
          "Montre connectée titanium, GPS, 100m waterproof, autonomie 36h",
        category: "Wearables",
        image: "⌚",
        stock: 40,
        rating: 4.8,
        reviews: 256,
      },
      {
        name: 'iPad Pro 12.9"',
        price: 1199,
        description: "Tablette avec puce M2, écran Liquid Retina XDR, 256GB",
        category: "Électronique",
        image: "📟",
        stock: 35,
        rating: 4.8,
        reviews: 194,
      },
      {
        name: "Clavier Mécanique RGB",
        price: 149,
        description:
          "Clavier gaming mécanique switches rouges, rétroéclairage RGB, repose-poignets",
        category: "Accessoires",
        image: "⌨️",
        stock: 120,
        rating: 4.6,
        reviews: 310,
      },
      {
        name: "Souris Gaming Logitech",
        price: 79,
        description:
          "Souris sans fil, capteur HERO 25K, 6 boutons programmables, RGB",
        category: "Accessoires",
        image: "🖱️",
        stock: 150,
        rating: 4.7,
        reviews: 278,
      },
      {
        name: 'Moniteur 4K 27"',
        price: 499,
        description:
          "Écran IPS 4K UHD, HDR400, 99% sRGB, USB-C, haut-parleurs intégrés",
        category: "Électronique",
        image: "🖥️",
        stock: 20,
        rating: 4.8,
        reviews: 167,
      },
      {
        name: "Enceinte JBL Flip 6",
        price: 129,
        description:
          "Enceinte Bluetooth portable, étanche IPX7, 12h d'autonomie",
        category: "Audio",
        image: "🔊",
        stock: 85,
        rating: 4.7,
        reviews: 245,
      },
      {
        name: "Chargeur Sans Fil 15W",
        price: 39,
        description:
          "Chargeur Qi rapide 15W, compatible tous smartphones, certificat CE",
        category: "Accessoires",
        image: "⚡",
        stock: 200,
        rating: 4.5,
        reviews: 412,
      },
      {
        name: "Sac à Dos Laptop",
        price: 89,
        description:
          'Sac à dos imperméable 15.6", compartiment rembourré, USB intégré',
        category: "Accessoires",
        image: "🎒",
        stock: 60,
        rating: 4.6,
        reviews: 178,
      },
      {
        name: 'Smart TV 55" 4K',
        price: 699,
        description: "TV QLED, processeur IA, Dolby Atmos, 120Hz, Smart TV",
        category: "Électronique",
        image: "📺",
        stock: 15,
        rating: 4.8,
        reviews: 303,
        featured: true,
      },
      {
        name: "AirPods Pro 2",
        price: 279,
        description:
          "Écouteurs True Wireless, réduction de bruit, spatial audio",
        category: "Audio",
        image: "🎧",
        stock: 95,
        rating: 4.9,
        reviews: 567,
      },
      {
        name: "GoPro HERO12",
        price: 399,
        description: "Caméra d'action 5K, stabilisation, 10m waterproof",
        category: "Électronique",
        image: "📷",
        stock: 30,
        rating: 4.8,
        reviews: 89,
      },
      {
        name: "Station d'accueil USB-C",
        price: 99,
        description: "Hub 7 ports, HDMI, Ethernet, USB 3.0, charge PD 100W",
        category: "Accessoires",
        image: "🔌",
        stock: 110,
        rating: 4.7,
        reviews: 234,
      },
    ];
    await Product.insertMany(products);
    console.log("✅ 15 produits ajoutés");
  }

  const orderCount = await Order.countDocuments();
  if (orderCount === 0) {
    console.log("💡 Base de données initialisée");
  }
}

// ==================== ROUTES API ====================

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date(), uptime: process.uptime() });
});

// Récupérer tous les produits
app.get("/api/products", async (req, res) => {
  try {
    const { category, search, sort, featured, limit = 50 } = req.query;
    let query = {};

    if (category && category !== "Tous") {
      query.category = category;
    }
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }
    if (featured === "true") {
      query.featured = true;
    }

    let productsQuery = Product.find(query).limit(parseInt(limit));

    if (sort === "price_asc") productsQuery = productsQuery.sort({ price: 1 });
    else if (sort === "price_desc")
      productsQuery = productsQuery.sort({ price: -1 });
    else if (sort === "rating")
      productsQuery = productsQuery.sort({ rating: -1 });
    else if (sort === "popular")
      productsQuery = productsQuery.sort({ reviews: -1 });
    else productsQuery = productsQuery.sort({ createdAt: -1 });

    const products = await productsQuery;
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Récupérer un produit par ID
app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Produit non trouvé" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Récupérer les catégories
app.get("/api/categories", async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Récupérer les produits populaires (meilleures notes)
app.get("/api/featured", async (req, res) => {
  try {
    const featured = await Product.find({ featured: true }).limit(6);
    res.json(featured);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Créer une commande
app.post("/api/orders", async (req, res) => {
  try {
    const {
      items,
      total,
      customerName,
      customerEmail,
      phone,
      address,
      city,
      postalCode,
    } = req.body;

    // Générer un numéro de commande unique
    const orderNumber =
      "CMD-" + Date.now() + "-" + Math.floor(Math.random() * 1000);

    const order = new Order({
      orderNumber,
      items,
      total,
      customerName,
      customerEmail,
      phone,
      address,
      city,
      postalCode,
      status: "pending",
    });

    await order.save();

    // Mettre à jour les stocks
    for (const item of items) {
      await Product.findOneAndUpdate(
        { name: item.name },
        { $inc: { stock: -item.quantity } },
      );
    }

    res.status(201).json({
      success: true,
      message: "Commande créée avec succès !",
      orderId: order._id,
      orderNumber: orderNumber,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Récupérer une commande par ID
app.get("/api/orders/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Commande non trouvée" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Récupérer les commandes (dernières)
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).limit(20);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Statistiques du shop
app.get("/api/stats", async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const lowStock = await Product.countDocuments({ stock: { $lt: 20 } });
    const avgPrice = await Product.aggregate([
      { $group: { _id: null, avg: { $avg: "$price" } } },
    ]);

    const totalRevenue = await Order.aggregate([
      { $match: { status: { $in: ["delivered", "shipped", "confirmed"] } } },
      { $group: { _id: null, total: { $sum: "$total" } } },
    ]);

    res.json({
      totalProducts,
      totalOrders,
      lowStock,
      avgPrice: avgPrice[0]?.avg.toFixed(2) || 0,
      totalRevenue: totalRevenue[0]?.total || 0,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Servir le frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`\n🚀 SERVEUR DÉMARRÉ !`);
  console.log(`📍 http://localhost:${PORT}`);
  console.log(`📊 API Health: http://localhost:${PORT}/api/health`);
  console.log(`🛍️  E-commerce prêt à l'emploi\n`);
});
