# Mimiko Studio - Setup Guide

## 🎉 Your Website is Ready!

This is a complete, production-ready jewellery studio website with:
- ✅ Public-facing site for customers to browse and inquire
- ✅ Admin panel to manage designs, collections, bookings, and messages
- ✅ Cloudinary integration for image uploads
- ✅ Neon DB for data storage
- ✅ Fully responsive design

---

## 📦 What's Included

### Frontend (React + Vite)
- Customer-facing pages (Home, Collections, Designs, Navratri, Embroidery, etc.)
- Admin panel at `/admin` (login required)
- Booking modal system
- Contact forms
- Responsive design for all devices

### Backend (Express + Neon DB)
- REST API for all CRUD operations
- Authentication with JWT
- Cloudinary image upload support
- Database schema for designs, collections, bookings, messages

---

## 🚀 Quick Start

### 1. Set Up Neon Database

1. Go to [Neon.tech](https://neon.tech) and create a free account
2. Create a new project
3. Copy the **connection string** (looks like: `postgresql://user:pass@ep-xxx.neon.tech/db`)
4. Open the **SQL Editor** in Neon dashboard
5. Copy and run the contents of `backend/schema.sql`
6. This creates all tables and default collections

### 2. Set Up Cloudinary (for image uploads)

1. Go to [Cloudinary.com](https://cloudinary.com) and create a free account
2. Note your **Cloud Name** from the dashboard
3. Go to **Settings → Upload** and create an **Unsigned Upload Preset**
   - Name it something like `mimiko-studio`
   - Save the preset name
4. You'll need these values:
   - Cloud Name
   - Upload Preset name

### 3. Deploy Backend API

#### Option A: Render.com (Recommended - Free)

1. Go to [Render.com](https://render.com) and sign up
2. Create a new **Web Service**
3. Connect your GitHub repo
4. Set **Root Directory** to `backend`
5. Set **Build Command**: `npm install`
6. Set **Start Command**: `npm start`
7. Add **Environment Variables**:
   ```
   DATABASE_URL=your_neon_connection_string
   ADMIN_PASSWORD=your_secure_password
   JWT_SECRET=random_secret_string
   ```
8. Deploy! You'll get a URL like `https://mimiko-api.onrender.com`

#### Option B: Local Development

```bash
cd backend
cp .env.example .env
# Edit .env with your values
npm install
npm run dev
```

### 4. Configure Frontend

Create a `.env` file in the **root** directory (not backend):

```env
VITE_API_URL=https://your-backend-url.onrender.com/api
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset_name
```

### 5. Build & Deploy Frontend

```bash
npm install
npm run build
```

Deploy the `dist` folder to GitHub Pages, Netlify, Vercel, or any static host.

---

## 🔐 Admin Access

1. Go to `yoursite.com/#/admin/login`
2. Enter the password you set in `ADMIN_PASSWORD`
3. You'll see the admin dashboard

### Admin Features:
- **Dashboard** - Overview stats and recent bookings
- **Designs** - Add/edit/delete products with images and pricing
- **Collections** - Manage collection categories
- **Bookings** - View and manage customer booking requests
- **Messages** - View contact form submissions

---

## 📸 Image Upload

When adding a design in the admin panel:
1. Click the upload button
2. Select images (multiple allowed)
3. Images are uploaded to Cloudinary automatically
4. Set a primary image by clicking the star icon
5. Remove images with the X button

**Without Cloudinary:** Images are stored as local previews only (not persistent).

---

## 🗄️ Database Structure

### Tables:
- `collections` - Product categories
- `designs` - Individual products/designs
- `design_images` - Multiple images per design
- `bookings` - Customer booking requests
- `contact_messages` - Contact form submissions

### Key Features:
- UUIDs for all IDs
- Automatic timestamps
- Cascading deletes
- Indexed for performance

---

## 🌐 Deployment Checklist

### Backend (API):
- [ ] Neon database created and schema applied
- [ ] Backend deployed (Render/Railway/etc.)
- [ ] Environment variables set (DATABASE_URL, ADMIN_PASSWORD, JWT_SECRET)
- [ ] API endpoint accessible (test with curl or browser)

### Frontend:
- [ ] `.env` file created with VITE_API_URL
- [ ] Cloudinary configured (optional but recommended)
- [ ] Build successful (`npm run build`)
- [ ] Deployed to static host (GitHub Pages/Netlify/Vercel)

### Admin:
- [ ] Access `/admin/login`
- [ ] Login with your ADMIN_PASSWORD
- [ ] Test adding a design
- [ ] Test uploading images
- [ ] Test creating a booking

---

## 🔧 Troubleshooting

### Blank screen on GitHub Pages?
- Make sure `base: './'` is in `vite.config.js`
- Use `HashRouter` (already configured)

### Images not uploading?
- Check Cloudinary credentials in `.env`
- Verify upload preset is **unsigned** (not signed)
- Check browser console for errors

### Can't connect to backend?
- Verify backend is running and accessible
- Check CORS settings in `backend/server.js`
- Ensure VITE_API_URL is correct (no trailing slash)

### Admin login not working?
- Check ADMIN_PASSWORD in backend `.env`
- Restart backend after changing password
- Clear browser localStorage and try again

---

## 📞 Support

For issues or questions:
- Check the backend logs (Render dashboard or terminal)
- Check browser console for frontend errors
- Verify all environment variables are set correctly

---

## 🎨 Customization

### Change Colors:
Edit `src/index.css` - update the color variables in `@theme`

### Change Fonts:
Edit `index.html` - update Google Fonts link
Edit `src/index.css` - update `--font-serif` and `--font-sans`

### Add New Pages:
1. Create component in `src/pages/`
2. Add route in `src/App.tsx`
3. Add navigation link in `src/components/Layout.tsx`

---

## 📝 Environment Variables Reference

### Frontend (.env):
```
VITE_API_URL=https://your-api.onrender.com/api
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=mimiko-studio
```

### Backend (backend/.env):
```
DATABASE_URL=postgresql://...
ADMIN_PASSWORD=your_password
JWT_SECRET=random_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=3001
```

---

## ✅ You're All Set!

Your Mimiko Studio website is ready to go live. Customers can browse designs and submit inquiries, while you manage everything from the admin panel.

**Next Steps:**
1. Deploy backend to Render
2. Configure frontend `.env` with your API URL
3. Build and deploy frontend
4. Login to admin and add your first design
5. Share your site! 🎉
