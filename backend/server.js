import express from 'express';
import cors from 'cors';
import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Neon DB client
const sql = neon(process.env.DATABASE_URL);

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'mimiko-studio-secret-change-this';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'; // Change this!

// Auth middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// ============ AUTH ============
app.post('/api/admin/login', async (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid password' });
  }
});

// ============ DESIGNS ============
app.get('/api/designs', async (req, res) => {
  try {
    const designs = await sql`SELECT * FROM designs ORDER BY created_at DESC`;
    // Get images for each design
    const designsWithImages = await Promise.all(
      designs.map(async (d) => {
        const images = await sql`SELECT * FROM design_images WHERE design_id = ${d.id} ORDER BY sort_order`;
        return { ...d, images };
      })
    );
    res.json(designsWithImages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/designs/:id', async (req, res) => {
  try {
    const [design] = await sql`SELECT * FROM designs WHERE id = ${req.params.id}`;
    if (!design) return res.status(404).json({ error: 'Design not found' });
    const images = await sql`SELECT * FROM design_images WHERE design_id = ${design.id} ORDER BY sort_order`;
    res.json({ ...design, images });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/designs/slug/:slug', async (req, res) => {
  try {
    const [design] = await sql`SELECT * FROM designs WHERE slug = ${req.params.slug}`;
    if (!design) return res.status(404).json({ error: 'Design not found' });
    const images = await sql`SELECT * FROM design_images WHERE design_id = ${design.id} ORDER BY sort_order`;
    res.json({ ...design, images });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/designs', authenticate, async (req, res) => {
  try {
    const { name, slug, description, long_description, collection_id, category, price, price_type, availability, customizable, featured, material, craft, occasion, care, tags, images } = req.body;
    const [design] = await sql`
      INSERT INTO designs (name, slug, description, long_description, collection_id, category, price, price_type, availability, customizable, featured, material, craft, occasion, care, tags)
      VALUES (${name}, ${slug}, ${description}, ${long_description || null}, ${collection_id}, ${category}, ${price || null}, ${price_type || 'starting'}, ${availability || 'made-to-order'}, ${customizable || false}, ${featured || false}, ${material || null}, ${craft || null}, ${occasion || null}, ${care || null}, ${JSON.stringify(tags || [])})
      RETURNING *
    `;
    // Insert images
    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        await sql`
          INSERT INTO design_images (design_id, image_url, alt_text, sort_order, is_primary)
          VALUES (${design.id}, ${images[i].url}, ${images[i].alt || ''}, ${i}, ${images[i].isPrimary || i === 0})
        `;
      }
    }
    res.json(design);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/designs/:id', authenticate, async (req, res) => {
  try {
    const { name, slug, description, long_description, collection_id, category, price, price_type, availability, customizable, featured, material, craft, occasion, care, tags, images } = req.body;
    const [design] = await sql`
      UPDATE designs SET name=${name}, slug=${slug}, description=${description}, long_description=${long_description || null}, collection_id=${collection_id}, category=${category}, price=${price || null}, price_type=${price_type}, availability=${availability}, customizable=${customizable}, featured=${featured}, material=${material || null}, craft=${craft || null}, occasion=${occasion || null}, care=${care || null}, tags=${JSON.stringify(tags || [])}, updated_at=NOW()
      WHERE id = ${req.params.id} RETURNING *
    `;
    // Update images
    if (images) {
      await sql`DELETE FROM design_images WHERE design_id = ${req.params.id}`;
      for (let i = 0; i < images.length; i++) {
        await sql`
          INSERT INTO design_images (design_id, image_url, alt_text, sort_order, is_primary)
          VALUES (${req.params.id}, ${images[i].url}, ${images[i].alt || ''}, ${i}, ${images[i].isPrimary || i === 0})
        `;
      }
    }
    res.json(design);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/designs/:id', authenticate, async (req, res) => {
  try {
    await sql`DELETE FROM design_images WHERE design_id = ${req.params.id}`;
    await sql`DELETE FROM designs WHERE id = ${req.params.id}`;
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============ COLLECTIONS ============
app.get('/api/collections', async (req, res) => {
  try {
    const collections = await sql`SELECT * FROM collections ORDER BY sort_order`;
    res.json(collections);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/collections', authenticate, async (req, res) => {
  try {
    const { name, slug, description, cover_image, featured, sort_order } = req.body;
    const [col] = await sql`
      INSERT INTO collections (name, slug, description, cover_image, featured, sort_order)
      VALUES (${name}, ${slug}, ${description || ''}, ${cover_image || null}, ${featured || false}, ${sort_order || 0})
      RETURNING *
    `;
    res.json(col);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/collections/:id', authenticate, async (req, res) => {
  try {
    const { name, slug, description, cover_image, featured, sort_order } = req.body;
    const [col] = await sql`
      UPDATE collections SET name=${name}, slug=${slug}, description=${description}, cover_image=${cover_image || null}, featured=${featured}, sort_order=${sort_order}, updated_at=NOW()
      WHERE id = ${req.params.id} RETURNING *
    `;
    res.json(col);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/collections/:id', authenticate, async (req, res) => {
  try {
    await sql`DELETE FROM collections WHERE id = ${req.params.id}`;
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============ BOOKINGS ============
app.get('/api/bookings', authenticate, async (req, res) => {
  try {
    const bookings = await sql`SELECT * FROM bookings ORDER BY created_at DESC`;
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/bookings', async (req, res) => {
  try {
    const { customer_name, email, phone, design_id, design_name, collection, occasion, requested_date, quantity, customization, color_preference, size_details, notes } = req.body;
    const [booking] = await sql`
      INSERT INTO bookings (customer_name, email, phone, design_id, design_name, collection, occasion, requested_date, quantity, customization, color_preference, size_details, notes, status)
      VALUES (${customer_name}, ${email}, ${phone}, ${design_id || null}, ${design_name || null}, ${collection || null}, ${occasion || null}, ${requested_date || null}, ${quantity || 1}, ${customization || 'no'}, ${color_preference || null}, ${size_details || null}, ${notes || null}, 'NEW')
      RETURNING *
    `;
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/bookings/:id/status', authenticate, async (req, res) => {
  try {
    const { status } = req.body;
    const [booking] = await sql`UPDATE bookings SET status=${status}, updated_at=NOW() WHERE id=${req.params.id} RETURNING *`;
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/bookings/:id', authenticate, async (req, res) => {
  try {
    await sql`DELETE FROM bookings WHERE id = ${req.params.id}`;
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============ CONTACT ============
app.get('/api/contact', authenticate, async (req, res) => {
  try {
    const messages = await sql`SELECT * FROM contact_messages ORDER BY created_at DESC`;
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const [msg] = await sql`
      INSERT INTO contact_messages (name, email, subject, message)
      VALUES (${name}, ${email}, ${subject || null}, ${message})
      RETURNING *
    `;
    res.json(msg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============ CLOUDINARY SIGNATURE ============
app.get('/api/upload/signature', authenticate, async (req, res) => {
  // For signed uploads (optional - you can also use unsigned presets)
  const timestamp = Math.round(Date.now() / 1000);
  res.json({ timestamp });
});

// ============ START SERVER ============
app.listen(PORT, () => {
  console.log(`Mimiko Studio API running on port ${PORT}`);
});
