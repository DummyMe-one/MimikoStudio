# 🎉 Mimiko Studio - Complete In-House Website

A **fully self-contained** premium jewellery studio website powered entirely by **Supabase**. No separate backend needed!

---

## ✨ What's Included

### 🌐 Public Website
- **Home** - Hero section, featured collections, signature designs
- **Collections** - Browse all product categories
- **Design Details** - Multi-image galleries with booking
- **Navratri Collection** - Dedicated festive page
- **Embroidery** - Craft showcase
- **Custom Designs** - Request form
- **Booking** - Submit booking requests
- **Contact** - Enquiry form
- **Gallery** - Masonry image grid
- **FAQ** - Accordion questions

### 🔐 Admin Panel (/#/admin)
- **Dashboard** - Overview stats
- **Designs Manager** - Add/edit/delete products with images
- **Collections Manager** - Manage categories
- **Bookings Manager** - View and update booking status
- **Messages Manager** - View contact enquiries

---

## 🏗️ Architecture

```
┌─────────────────────────────────────┐
│      Mimiko Studio (React)          │
│                                     │
│   Public Site    Admin Panel        │
│   /              /#/admin           │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│         SUPABASE                    │
│                                     │
│  📦 PostgreSQL Database             │
│  🔐 Authentication (Admin Login)    │
│  🖼️ Storage (Image Uploads)         │
│  🔌 Auto-generated REST API         │
│  🔒 Row Level Security (RLS)        │
└─────────────────────────────────────┘
```

**One platform. Everything included. Free tier available.**

---

## 🚀 Quick Start (5 minutes)

### 1. Create Supabase Project
- Go to [supabase.com](https://supabase.com) → Sign up (free)
- Click "New Project" → Name it `mimiko-studio`
- Wait ~2 minutes for initialization

### 2. Run Database Schema
- Go to **SQL Editor** in Supabase dashboard
- Copy contents of `supabase/schema.sql`
- Paste and click **Run**
- ✅ Tables, policies, and storage bucket created!

### 3. Create Admin User
- Go to **Authentication → Users**
- Click "Add user" → "Create new user"
- Enter email and password
- ✅ Check "Auto Confirm User"
- Click Create

### 4. Configure Frontend
- Go to **Settings → API** in Supabase
- Copy **Project URL** and **anon key**
- Create `.env` file:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 5. Run Locally
```bash
npm install
npm run dev
```

Visit:
- Public site: `http://localhost:3000/`
- Admin: `http://localhost:3000/#/admin/login`

---

## 🌐 Deploy to GitHub Pages

```bash
npm run build
```

Upload `dist` folder contents to your `gh-pages` branch.

Or use GitHub Actions (automatic deployment on push).

---

## 📋 Features

### As Admin:
- ✅ Add/edit/delete designs with multiple images
- ✅ Upload images to Supabase Storage
- ✅ Set pricing (fixed, starting from, on request)
- ✅ Manage collections
- ✅ View and update booking status
- ✅ View contact messages
- ✅ Mark designs as featured

### As Customer:
- ✅ Browse designs and collections
- ✅ View design details with image galleries
- ✅ Submit booking requests
- ✅ Send contact enquiries
- ✅ Request custom designs

---

## 🔒 Security

Everything secured through **Row Level Security (RLS)**:

| Action | Public | Admin |
|--------|--------|-------|
| View designs | ✅ | ✅ |
| Create booking | ✅ | ✅ |
| Send message | ✅ | ✅ |
| Edit designs | ❌ | ✅ |
| Upload images | ❌ | ✅ |
| View all bookings | ❌ | ✅ |

The `anon` key is safe to expose - security is handled by RLS policies.

---

## 💰 Cost

**Supabase Free Tier:**
- 500 MB database
- 1 GB file storage
- 2 GB bandwidth/month
- 50,000 monthly active users
- Unlimited API requests

**More than enough for a boutique studio!**

---

## 📁 Project Structure

```
mimiko-studio/
├── src/
│   ├── components/         # UI components
│   ├── contexts/           # Auth context
│   ├── data/               # Sample data (fallback)
│   ├── lib/
│   │   └── supabase.ts     # Supabase client
│   ├── pages/
│   │   ├── admin/          # Admin panel
│   │   └── ...             # Public pages
│   ├── services/
│   │   └── api.ts          # All Supabase queries
│   └── App.tsx
├── supabase/
│   └── schema.sql          # Database schema
├── .env.example
└── SETUP_GUIDE.md          # Detailed setup instructions
```

---

## 🐛 Troubleshooting

### "Supabase not configured"?
- Check `.env` file exists with correct values
- Restart dev server after changing `.env`

### Images not uploading?
- Verify storage bucket `designs` exists and is public
- Make sure you're logged in as admin

### Can't login to admin?
- Check user exists in Supabase → Authentication → Users
- Verify "Auto Confirm User" was checked

---

## 📖 Documentation

See `SETUP_GUIDE.md` for detailed step-by-step instructions.

---

## 🎨 Customization

- **Colors:** Edit `src/index.css` → `@theme` section
- **Fonts:** Edit `index.html` → Google Fonts link
- **Pages:** Add components in `src/pages/` and routes in `src/App.tsx`

---

## ✅ Checklist

- [ ] Supabase project created
- [ ] SQL schema run successfully
- [ ] Storage bucket `designs` exists
- [ ] Admin user created
- [ ] `.env` file configured
- [ ] `npm run dev` works locally
- [ ] Can login to /#/admin
- [ ] Can add designs with images
- [ ] Deployed to GitHub Pages

---

## 🎉 You're Live!

Your complete in-house jewellery studio website is ready. Customers browse and book, you manage everything from the admin panel — all powered by a single Supabase project.

**No backend server. No separate database. No Cloudinary. Just Supabase.**

Share your site and start taking bookings! 🎊

---

## 📞 Support

For issues or questions, check:
1. Browser console for errors
2. Supabase dashboard logs
3. `SETUP_GUIDE.md` for detailed troubleshooting

---

**Built with ❤️ for Mimiko Studio**
