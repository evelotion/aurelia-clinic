# Aurelia Clinic - Premium Beauty Clinic Management System

Welcome to Aurelia Clinic! This is a modern, full-stack web application built with Next.js 14, designed specifically for beauty clinics to manage appointments, treatments, doctors, galleries, and patient records seamlessly.

## 🚀 Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL with Prisma ORM
- **Styling:** Tailwind CSS & Framer Motion
- **Authentication:** NextAuth.js (Role-Based Access Control)
- **Payment Gateway:** Midtrans Snap API
- **Media Storage:** Cloudinary

---

## 📋 Prerequisites
Before you begin, ensure you have the following installed and set up:
1. **Node.js** (v18.17 or higher)
2. **PostgreSQL Database** (You can use local Postgres, Supabase, Neon, etc.)
3. **Midtrans Account** (For payment gateway integration)
4. **Cloudinary Account** (For uploading before-after gallery and treatment images)
5. **Gmail/SMTP Account** (For sending email notifications)

---

## 🛠️ Installation Guide

Follow these steps to get your project up and running locally:

### 1. Extract the Files
Extract the downloaded ZIP file and open the folder in your terminal or code editor (like VSCode).

### 2. Install Dependencies
Run the following command to install all required packages:
```bash
npm install
```
### 3. Setup Environment Variables
Duplicate the .env.example file and rename it to .env. Fill in all the required variables:

- **DATABASE_URL:** Your PostgreSQL connection string.

- **NEXTAUTH_SECRET:** Generate a random string (e.g., using openssl rand -base64 32).

- **MIDTRANS_SERVER_KEY:** Get this from your Midtrans Dashboard (Settings -> Access Keys).

- **CLOUDINARY:** Fill in your Cloud Name, API Key, and API Secret from the Cloudinary Dashboard.

### 4. Setup the Database
Run the following command to push the database schema to your PostgreSQL database:

```Bash
npx prisma db push
```
### 5. Seed the Database (Optional but Recommended)

To populate your database with initial dummy data (Admin account, treatments, dummy branches, etc.), run:

```Bash
npx prisma db seed
```
Note: The default Admin login is admin@aurelia.com / password123.

### 6. Run the Development Server
Start the application by running:

```Bash
npm run dev
```
Open http://localhost:3000 with your browser to see the result.

---

## ✨ Core Features

### 👤 Patient Portal
Browse clinic branches and available treatments.

- View the Before-After portfolio gallery.

- Book appointments using the smart Scheduling Engine (prevents double booking).

- Seamless checkout process via Midtrans Payment Gateway.

### 👨‍⚕️ Doctor Portal
Dedicated dashboard for doctors.

View daily schedules and assigned patients.

### 👑 Admin Dashboard
- **Master Data Management:** Manage branches, doctors, and treatments.

- **Dynamic Pricing:** Set different prices and durations for treatments based on the branch location.

- **Gallery Management:** Upload and manage Before-After photos.

- **Appointment Management:** Monitor all incoming bookings and payment statuses.

### 🌍 Deployment
The easiest way to deploy this Next.js app is to use the Vercel Platform.

1. Push your code to a GitHub repository.

2. Import the project into Vercel.

3. Add all the environment variables from your .env file into the Vercel project settings.

4. Click Deploy.