# Kelax Website

> **Kelax — Official Corporate Website & Customer/Partner Management Platform**

A full-stack web platform developed for **Kelax**, combining the company's public corporate website with authenticated **Customer, Partner, Employee, and Admin portals**.

The application is built using the **MERN stack** and is designed for self-hosted production deployment on the Kelax infrastructure.

---

# 📋 Table of Contents

* [1. Project Overview](#1-project-overview)
* [2. Project Goals](#2-project-goals)
* [3. Technology Stack](#3-technology-stack)
* [4. System Architecture](#4-system-architecture)
* [5. Project Structure](#5-project-structure)
* [6. Frontend Architecture](#6-frontend-architecture)
* [7. Backend Architecture](#7-backend-architecture)
* [8. Database Architecture](#8-database-architecture)
* [9. User Roles](#9-user-roles)
* [10. Authentication & Authorization](#10-authentication--authorization)
* [11. Public Website](#11-public-website)
* [12. Customer Portal](#12-customer-portal)
* [13. Partner Portal](#13-partner-portal)
* [14. Employee Portal](#14-employee-portal)
* [15. Admin Portal](#15-admin-portal)
* [16. Product Management](#16-product-management)
* [17. File & Media Management](#17-file--media-management)
* [18. Email & OTP System](#18-email--otp-system)
* [19. Warranty Management](#19-warranty-management)
* [20. Cron Jobs](#20-cron-jobs)
* [21. API Architecture](#21-api-architecture)
* [22. Security](#22-security)
* [23. Deployment Architecture](#23-deployment-architecture)
* [24. Server Infrastructure](#24-server-infrastructure)
* [25. Nginx](#25-nginx)
* [26. PM2](#26-pm2)
* [27. Environment Variables](#27-environment-variables)
* [28. Development Workflow](#28-development-workflow)
* [29. Git & GitHub Workflow](#29-git--github-workflow)
* [30. Production Deployment](#30-production-deployment)
* [31. Backup Strategy](#31-backup-strategy)
* [32. Monitoring & Logs](#32-monitoring--logs)
* [33. Security Checklist](#33-security-checklist)
* [34. Development Roadmap](#34-development-roadmap)
* [35. Future Features](#35-future-features)
* [36. Maintenance Roadmap](#36-maintenance-roadmap)
* [37. Quick Commands](#37-quick-commands)

---

# 1. Project Overview

Kelax Website is a full-stack business platform that provides:

### Public Website

* Company information
* Products
* Solutions
* Services
* Industries
* Clients
* Testimonials
* FAQs
* Contact information
* Legal pages
* Product datasheets
* Product documentation

### Business Portals

* Customer Portal
* Partner Portal
* Employee Portal
* Admin Portal

### Platform Features

* User registration
* Email OTP verification
* Login/logout
* Role-based authorization
* Company information management
* Product management
* Product documentation
* Certificate downloads
* Customer management
* Partner management
* Employee management
* Warranty management
* Email notifications
* Ticket/support integration
* File uploads/downloads

---

# 2. Project Goals

The main objectives of the platform are:

1. Build a professional corporate website for Kelax.
2. Provide customers with a dedicated portal.
3. Provide partners with a dedicated portal.
4. Provide employees with role-specific access.
5. Provide administrators with complete platform control.
6. Centralize customer and partner information.
7. Manage Kelax products and documentation.
8. Manage warranties.
9. Provide secure authentication.
10. Provide scalable backend architecture.
11. Host the complete platform on Kelax infrastructure.
12. Minimize dependency on third-party hosting services.
13. Maintain production-grade security and monitoring.

---

# 3. Technology Stack

## Frontend

| Technology      | Purpose                 |
| --------------- | ----------------------- |
| React.js        | UI development          |
| Vite            | Frontend build tool     |
| JavaScript      | Programming language    |
| Tailwind CSS    | Styling                 |
| React Router    | Client-side routing     |
| Redux Toolkit   | Global state management |
| Axios           | HTTP requests           |
| React Hot Toast | Notifications           |
| React Spinners  | Loading states          |
| Lucide React    | Icons                   |

---

## Backend

| Technology              | Purpose               |
| ----------------------- | --------------------- |
| Node.js                 | Runtime               |
| Express.js              | REST API framework    |
| JavaScript / ES Modules | Backend development   |
| Mongoose                | MongoDB ODM           |
| JWT                     | Authentication        |
| bcrypt                  | Password hashing      |
| cookie-parser           | Cookie handling       |
| CORS                    | Cross-origin security |
| Helmet                  | HTTP security headers |
| Nodemailer              | Email delivery        |
| Brevo SMTP              | Production email      |
| node-cron               | Scheduled jobs        |
| PM2                     | Process management    |

---

## Database

```text
MongoDB
     │
     └── Mongoose
```

MongoDB is used for:

* Users
* Companies
* Products
* Customers
* Partners
* Warranty information
* Certificates
* Tickets
* OTP information
* System information

---

## Infrastructure

| Technology                  | Purpose                          |
| --------------------------- | -------------------------------- |
| Ubuntu Server               | Production OS                    |
| Nginx                       | Reverse proxy + web server       |
| PM2                         | Node.js process manager          |
| Git                         | Version control                  |
| GitHub                      | Source code repository           |
| SSL/TLS                     | HTTPS                            |
| Let's Encrypt / GoDaddy SSL | Certificate                      |
| Docker                      | MongoDB/container infrastructure |
| Proxmox                     | Virtualization infrastructure    |

---

# 4. System Architecture

```text
                         INTERNET
                            │
                            ▼
                     ┌──────────────┐
                     │   Firewall   │
                     └──────┬───────┘
                            │
                            ▼
                     ┌──────────────┐
                     │    Nginx     │
                     │ HTTP / HTTPS │
                     └──────┬───────┘
                            │
              ┌─────────────┴─────────────┐
              │                           │
              ▼                           ▼
       React/Vite Frontend          Express API
              │                           │
              │                           ▼
              │                    Authentication
              │                           │
              │                           ▼
              │                       Mongoose
              │                           │
              │                           ▼
              │                       MongoDB
              │
              ▼
       Customer / Partner /
       Employee / Admin UI
```

---

# 5. Project Structure

Recommended project structure:

```text
Kelax/
│
├── client/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   │   ├── public/
│   │   │   ├── auth/
│   │   │   ├── customer/
│   │   │   ├── partner/
│   │   │   ├── employee/
│   │   │   └── admin/
│   │   │
│   │   ├── routes/
│   │   ├── services/
│   │   ├── store/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── .env
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   │
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── cron/
│   │   ├── uploads/
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── .env
│   └── package.json
│
├── README.md
└── .gitignore
```

---

# 6. Frontend Architecture

The frontend follows a component-based React architecture.

```text
React Application
       │
       ├── Public Pages
       │
       ├── Authentication
       │
       ├── Customer Portal
       │
       ├── Partner Portal
       │
       ├── Employee Portal
       │
       └── Admin Portal
```

## Main Frontend Responsibilities

* UI rendering
* Routing
* Authentication state
* API communication
* Form validation
* Loading states
* Error handling
* Toast notifications
* Responsive design
* Role-based route protection

---

# 7. Backend Architecture

Backend follows a layered architecture:

```text
Request
   │
   ▼
Route
   │
   ▼
Middleware
   │
   ▼
Controller
   │
   ▼
Service
   │
   ▼
Model
   │
   ▼
MongoDB
```

## Backend Layers

### Routes

Responsible for endpoint definitions.

### Middleware

Responsible for:

* Authentication
* Authorization
* Validation
* Error handling
* Security

### Controllers

Responsible for handling HTTP requests.

### Services

Responsible for business logic.

### Models

Responsible for MongoDB schemas.

---

# 8. Database Architecture

MongoDB is the primary database.

## Main Collections

```text
users
products
warranties
tickets
otp
notifications
```

---

## User Model

A single `User` model is used for:

```text
Admin
Employee
Partner
Customer
```

Example structure:

```text
User
│
├── fullName
├── email
├── phone
├── password
├── role
├── isVerified
├── userStatus
├── jobTitle
├── jobLevel
│
└── company
    ├── name
    ├── website
    ├── address
    ├── city
    ├── state
    ├── country
    └── pincode
```

---

# 9. User Roles

The system supports four primary roles:

```text
admin
employee
partner
customer
```

## Role Permissions

| Feature             | Admin |            Employee |     Partner |    Customer |
| ------------------- | ----: | ------------------: | ----------: | ----------: |
| Admin Dashboard     |     ✅ |                   ❌ |           ❌ |           ❌ |
| Employee Management |     ✅ |                   ❌ |           ❌ |           ❌ |
| Customer Management |     ✅ | Based on permission |           ❌ |    Own data |
| Partner Management  |     ✅ | Based on permission |    Own data |           ❌ |
| Product Management  |     ✅ | Based on permission |        View |        View |
| Warranty            |     ✅ | Based on permission |        View |        View |
| Tickets             |     ✅ |    Technical access | Create/View | Create/View |
| Profile             |     ✅ |                   ✅ |           ✅ |           ✅ |

---

# 10. Authentication & Authorization

## Authentication Flow

```text
User
 │
 ▼
Login
 │
 ▼
Email + Password
 │
 ▼
Backend
 │
 ├── Check User
 ├── Verify Password
 ├── Check Verification
 ├── Check User Status
 │
 ▼
Generate JWT
 │
 ▼
HTTP-Only Cookie
 │
 ▼
Authenticated Session
```

---

## Registration Flow

```text
Registration Form
       │
       ▼
Email
       │
       ▼
Generate OTP
       │
       ▼
Send OTP
       │
       ▼
Verify OTP
       │
       ▼
Complete Registration
       │
       ▼
Create User
       │
       ▼
Login
```

The system should avoid creating incomplete users when registration is abandoned before verification.

---

## JWT

JWT contains the authenticated user's identity.

Example:

```text
{
    _id: "userId"
}
```

Authentication middleware:

```text
isAuthenticated
```

Authorization middleware:

```text
authorizeRoles(...)
```

---

# 11. Public Website

The public website contains:

```text
/
├── Home
├── About
├── Products
├── Solutions
├── Services
├── Industries
├── Clients
├── Testimonials
├── FAQ
├── Contact
│
├── Privacy Policy
├── Terms & Conditions
├── Disclaimer
├── Return / Refund / Cancellation
├── Make in India
└── Sitemap
```

---

## Homepage Sections

```text
Navbar
   ↓
Hero
   ↓
About
   ↓
Services
   ↓
Products
   ↓
Solutions
   ↓
Industries
   ↓
Clients
   ↓
Testimonials
   ↓
FAQ
   ↓
CTA
   ↓
Footer
```

---

# 12. Customer Portal

Customer portal route:

```text
/customer/dashboard
```

## Planned Features

### Dashboard

* Welcome section
* Customer information
* Registered products
* Warranty information
* Recent tickets
* Notifications

### Product Management

Customer can view:

* Product
* Serial number
* Model number
* Configuration
* Purchase information
* Warranty

### Warranty

Display:

```text
Warranty Start
Warranty End
Warranty Status
Days Remaining
```

### Support

Customers can:

* Create support ticket
* View ticket
* Reply to ticket
* Upload attachments
* Track ticket status

---

# 13. Partner Portal

Partner route:

```text
/partner/dashboard
```

## Features

### Partner Dashboard

* Partner profile
* Company information
* Registered products
* Certificates
* Downloads
* Warranty information

### Partner Profile

Partner can manage:

```text
Name
Email
Phone
Company
Website
Address
Job Title
Job Level
```

### Certificate Download

Partners can download:

* Partner certificates
* Product documents
* Datasheets
* Technical documents

---

# 14. Employee Portal

Employee login:

```text
/employee/login
```

Employees receive permissions according to their job role.

---

## Employee Job Roles

Examples:

```text
Sales
Pre-Sales
Technical
Management
Finance
CEO
BDM
Director
Other
```

---

## Sales Employee

Potential access:

```text
Partners
Customers
Contact Information
Company Information
Sales-related information
```

---

## Technical Employee

Potential access:

```text
Support Tickets
Technical Issues
Attachments
Ticket Replies
Product Information
```

Technical employees can update technical tickets according to assigned permissions.

---

# 15. Admin Portal

Admin has a completely separate authentication system.

```text
/admin/login
```

Admin dashboard:

```text
/admin/dashboard
```

---

## Admin Dashboard

Main sections:

```text
Dashboard
│
├── Products
│   ├── Create Product
│   ├── Product List
│   ├── Product Details
│   └── Product Documents
│
├── Partners
│   ├── Partner List
│   ├── Partner Details
│   └── Partner Status
│
├── Customers
│   ├── Customer List
│   ├── Customer Details
│   └── Customer Status
│
├── Employees
│   ├── Create Employee
│   ├── Employee List
│   └── Permissions
│
├── Warranties
│
├── Tickets
│
├── Notifications
│
└── Settings
```

---

# 16. Product Management

Admin can create and manage products.

## Product Structure

```text
Product
│
├── Name
├── Type
├── Image
├── Short Description
├── Introduction
├── Specifications
├── Features
├── Datasheet
├── Driver
├── Manual
├── Configuration
└── Customization
```

---

## Product Lifecycle

```text
Create
  ↓
Upload Media
  ↓
Add Specifications
  ↓
Add Documentation
  ↓
Publish
  ↓
Display on Website
  ↓
Customer / Partner Access
```

---

# 17. File & Media Management

Kelax plans to maintain its own storage instead of relying completely on external cloud storage.

Possible structure:

```text
/storage
│
├── products/
├── images/
├── datasheets/
├── certificates/
├── manuals/
├── drivers/
├── software/
├── tickets/
└── temporary/
```

---

## Supported Files

Examples:

```text
JPG
PNG
WEBP
PDF
ZIP
EXE
DOCX
XLSX
```

Large files should be handled using:

* Streaming
* Download endpoints
* Access control
* File size limits
* MIME validation
* Secure filenames

---

# 18. Email & OTP System

Production email uses SMTP.

Current architecture:

```text
Application
    │
    ▼
Nodemailer
    │
    ▼
Brevo SMTP
    │
    ▼
User Email
```

---

## OTP Use Cases

* Registration verification
* Forgot password
* Email verification
* Sensitive account actions

OTP should have:

```text
OTP
Expiry
Attempt Limit
Purpose
Email
```

OTP should never be stored as plain text where avoidable.

---

# 19. Warranty Management

Warranty information can be associated with registered products.

Example:

```text
Product
Serial Number
Customer
Reseller
Warranty Type
Start Date
End Date
```

---

## Warranty Status

Possible statuses:

```text
Upcoming
Active
Expiring Soon
Expired
```

---

# 20. Cron Jobs

The backend uses scheduled jobs.

Example:

```text
server/src/cron/
```

Current/planned jobs include:

```text
userExpiry.cron.js
warrantyExpiry.cron.js
```

---

## Warranty Cron

```text
Cron
  ↓
Check warranties
  ↓
Find expiring warranties
  ↓
Generate notification
  ↓
Send email
```

---

## User Expiry Cron

```text
Cron
  ↓
Check user expiry
  ↓
Find expired users
  ↓
Update status
  ↓
Notify administrator
```

---

# 21. API Architecture

Base API:

```text
/api
```

---

## Authentication

```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
POST /api/auth/send-otp
POST /api/auth/verify-otp
POST /api/auth/forgot-password
POST /api/auth/reset-password
```

---

## Users

```http
GET    /api/users
GET    /api/users/:id
PATCH  /api/users/:id
DELETE /api/users/:id
```

---

## Products

```http
GET    /api/products
GET    /api/products/:id
POST   /api/products
PATCH  /api/products/:id
DELETE /api/products/:id
```

---

## Partners

```http
GET /api/partners
GET /api/partners/:id
PATCH /api/partners/:id
```

---

## Customers

```http
GET /api/customers
GET /api/customers/:id
PATCH /api/customers/:id
```

---

## Employees

```http
POST /api/employees
GET /api/employees
GET /api/employees/:id
PATCH /api/employees/:id
DELETE /api/employees/:id
```

---

## Warranty

```http
GET /api/warranties
GET /api/warranties/:id
POST /api/warranties
PATCH /api/warranties/:id
```

---

# 22. Security

Security is a core requirement of the platform.

## Backend Security

Use:

```text
Helmet
CORS
JWT
HTTP-only Cookies
bcrypt
Input Validation
Rate Limiting
Secure Headers
Environment Variables
```

---

## Password Security

Passwords must never be stored as plain text.

```text
Password
   ↓
bcrypt
   ↓
Password Hash
   ↓
MongoDB
```

---

## Cookie Security

Production cookies should use:

```text
httpOnly: true
secure: true
sameSite: "none" / appropriate deployment configuration
```

Cookie configuration must match the actual frontend/backend origin architecture.

---

## Authentication Security

Every protected request:

```text
Request
 ↓
JWT
 ↓
Verify
 ↓
User lookup
 ↓
Check userStatus
 ↓
Authorize role
 ↓
Controller
```

---

# 23. Deployment Architecture

Production deployment:

```text
Internet
   │
   ▼
kelax.in
   │
   ▼
Public IP
   │
   ▼
Ubuntu Server
   │
   ├── Nginx
   │
   ├── React Build
   │
   ├── Node.js / Express
   │
   ├── PM2
   │
   └── MongoDB
```

---

# 24. Server Infrastructure

Current Kelax infrastructure uses an Ubuntu Server environment.

Example:

```text
Operating System:
Ubuntu Server LTS

Web Server:
Nginx

Backend:
Node.js + Express

Process Manager:
PM2

Database:
MongoDB

Virtualization:
Proxmox
```

---

## Production Directory

Recommended:

```text
/var/www/kelax
```

Structure:

```text
/var/www/kelax
│
├── client
│
└── server
```

---

# 25. Nginx

Nginx handles:

* HTTPS
* SSL termination
* React static files
* API reverse proxy
* Security headers
* Request routing

Example architecture:

```text
https://kelax.in
        │
        ▼
      Nginx
        │
        ├── /       → React
        │
        └── /api    → Node.js :8000
```

---

# 26. PM2

PM2 keeps the backend application running.

Example:

```bash
pm2 start server/src/server.js --name kelax-api
```

Check:

```bash
pm2 status
```

Logs:

```bash
pm2 logs kelax-api
```

Restart:

```bash
pm2 restart kelax-api
```

Save:

```bash
pm2 save
```

Enable startup:

```bash
pm2 startup
```

---

# 27. Environment Variables

## Frontend

Example:

```env
VITE_API_URL=https://kelax.in/api
```

Never expose private secrets through Vite environment variables.

---

## Backend

Example:

```env
NODE_ENV=production

PORT=8000

MONGO_URI=mongodb://localhost:27017/kelax

JWT_SECRET=CHANGE_THIS_SECRET

CLIENT_URL=https://kelax.in

SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=

EMAIL_FROM=

COOKIE_NAME=
```

---

# 28. Development Workflow

Development workflow:

```text
Developer
    │
    ▼
Create Feature
    │
    ▼
Develop Locally
    │
    ▼
Test
    │
    ▼
Git Commit
    │
    ▼
GitHub
    │
    ▼
Production Server
    │
    ▼
Build
    │
    ▼
Restart PM2
```

---

# 29. Git & GitHub Workflow

Recommended branch structure:

```text
main
│
├── develop
│
├── feature/*
│
├── fix/*
│
└── hotfix/*
```

---

## Feature Workflow

```bash
git checkout develop

git pull origin develop

git checkout -b feature/customer-portal

# Development

git add .

git commit -m "feat: add customer portal"

git push origin feature/customer-portal
```

Create Pull Request:

```text
feature/customer-portal
          ↓
       develop
          ↓
         main
```

---

# 30. Production Deployment

## Step 1 — Pull Code

```bash
cd /var/www/kelax
git pull origin main
```

---

## Step 2 — Backend Dependencies

```bash
cd /var/www/kelax/server
npm install
```

---

## Step 3 — Frontend Dependencies

```bash
cd /var/www/kelax/client
npm install
```

---

## Step 4 — Build Frontend

```bash
npm run build
```

---

## Step 5 — Restart Backend

```bash
pm2 restart kelax-api
```

---

## Step 6 — Check Logs

```bash
pm2 logs kelax-api
```

---

## Step 7 — Verify Nginx

```bash
sudo nginx -t
```

Then:

```bash
sudo systemctl reload nginx
```

---

# 31. Backup Strategy

Production backups should include:

## Database

```text
MongoDB
   ↓
Daily Backup
   ↓
Backup Storage
```

---

## Application

GitHub acts as the source-code repository.

---

## Uploaded Files

Backup:

```text
/storage
```

including:

```text
Products
Datasheets
Certificates
Manuals
Drivers
Ticket Attachments
```

---

## Recommended Backup Schedule

```text
Daily
    └── Database

Weekly
    └── Full application storage

Monthly
    └── Full infrastructure backup
```

Keep multiple backup generations.

---

# 32. Monitoring & Logs

## Backend

```bash
pm2 status
pm2 logs kelax-api
```

---

## Server

```bash
df -h
free -h
top
htop
```

---

## Nginx

```bash
sudo systemctl status nginx
```

Logs:

```text
/var/log/nginx/access.log
/var/log/nginx/error.log
```

---

## MongoDB

Monitor:

```text
Connection
Memory
Disk usage
Database size
Slow queries
Backup status
```

---

# 33. Security Checklist

Before production release:

* [ ] HTTPS enabled
* [ ] SSL certificate valid
* [ ] HTTP redirected to HTTPS
* [ ] Strong JWT secret
* [ ] Strong MongoDB credentials
* [ ] Password hashing enabled
* [ ] HTTP-only cookies
* [ ] Secure cookies in production
* [ ] CORS configured
* [ ] Helmet enabled
* [ ] Rate limiting enabled
* [ ] Input validation
* [ ] File type validation
* [ ] File size limits
* [ ] Protected admin routes
* [ ] Role-based authorization
* [ ] No secrets committed to GitHub
* [ ] `.env` in `.gitignore`
* [ ] Database backups configured
* [ ] Upload directory protected
* [ ] Error responses don't expose sensitive information
* [ ] Production logs monitored
* [ ] MongoDB not publicly exposed

---

# 34. Development Roadmap

## Phase 1 — Foundation

* [x] React + Vite setup
* [x] Tailwind CSS
* [x] Express backend
* [x] MongoDB
* [x] Mongoose
* [x] Basic routing
* [x] Basic API structure

---

## Phase 2 — Public Website

* [x] Navbar
* [x] Hero
* [x] About
* [x] Services
* [x] Products
* [x] Solutions
* [x] Industries
* [x] Clients
* [x] Testimonials
* [x] FAQ
* [x] CTA
* [x] Footer
* [x] Legal pages

---

## Phase 3 — Authentication

* [x] Registration
* [x] Login
* [x] Logout
* [x] OTP verification
* [x] Password hashing
* [x] JWT
* [x] Protected routes
* [x] Role authorization
* [ ] Advanced rate limiting
* [ ] Login security monitoring

---

## Phase 4 — Partner Portal

* [x] Partner registration
* [x] Partner dashboard
* [x] Profile
* [x] Company information
* [x] Certificate download
* [ ] Product registration
* [ ] Warranty tracking
* [ ] Partner support

---

## Phase 5 — Customer Portal

* [ ] Customer dashboard
* [ ] Customer profile
* [ ] Registered products
* [ ] Warranty
* [ ] Product documents
* [ ] Ticket creation
* [ ] Ticket tracking
* [ ] Notifications

---

## Phase 6 — Admin Portal

* [x] Separate admin login
* [x] Admin dashboard
* [ ] Product management
* [ ] Partner management
* [ ] Customer management
* [ ] Employee management
* [ ] Warranty management
* [ ] Ticket management
* [ ] Notifications
* [ ] Audit logs

---

## Phase 7 — Employee Portal

* [ ] Employee authentication
* [ ] Employee dashboard
* [ ] Role-based permissions
* [ ] Sales access
* [ ] Technical access
* [ ] Ticket management
* [ ] Customer/partner access control

---

## Phase 8 — Product Management

* [ ] Product CRUD
* [ ] Product images
* [ ] Product specifications
* [ ] Datasheet uploads
* [ ] Manual uploads
* [ ] Driver uploads
* [ ] Software downloads
* [ ] Product versioning
* [ ] Product visibility control

---

## Phase 9 — Warranty

* [ ] Warranty creation
* [ ] Warranty registration
* [ ] Warranty status
* [ ] Expiry notifications
* [ ] Warranty renewal
* [ ] Warranty history

---

## Phase 10 — Support System

* [ ] Ticket creation
* [ ] Ticket assignment
* [ ] Ticket status
* [ ] Priority
* [ ] Comments
* [ ] Attachments
* [ ] Employee assignment
* [ ] Email notifications
* [ ] Ticket history

---

# 35. Future Features

Future versions can include:

## Customer Features

```text
Customer Dashboard
     │
     ├── Products
     ├── Warranty
     ├── Tickets
     ├── Documents
     ├── Notifications
     └── Profile
```

---

## Partner Features

```text
Partner Dashboard
     │
     ├── Leads
     ├── Orders
     ├── Products
     ├── Certificates
     ├── Warranty
     ├── Documents
     └── Support
```

---

## Admin Features

```text
Admin
 │
 ├── Analytics
 ├── Users
 ├── Customers
 ├── Partners
 ├── Employees
 ├── Products
 ├── Warranty
 ├── Tickets
 ├── Reports
 ├── Notifications
 └── Audit Logs
```

---

# 36. Maintenance Roadmap

## Daily

```text
Check:
- PM2
- API
- Nginx
- Disk
- Error logs
```

---

## Weekly

```text
Check:
- Database backup
- Storage usage
- Application errors
- Security logs
- Failed login attempts
```

---

## Monthly

```text
Update:
- Node.js dependencies
- npm packages
- OS security updates
- MongoDB
- Nginx
```

Before major updates:

```text
Backup
   ↓
Update
   ↓
Test
   ↓
Deploy
```

---

# 37. Quick Commands

## Git

```bash
git status

git pull origin main

git add .

git commit -m "your message"

git push origin main
```

---

## Frontend

```bash
cd /var/www/kelax/client

npm install

npm run build
```

---

## Backend

```bash
cd /var/www/kelax/server

npm install

npm start
```

---

## PM2

```bash
pm2 status

pm2 logs kelax-api

pm2 restart kelax-api

pm2 save
```

---

## Nginx

```bash
sudo nginx -t

sudo systemctl reload nginx

sudo systemctl status nginx
```

---

## Server

```bash
df -h

free -h

uptime

top
```

---

# 🏗️ Overall Kelax Platform Roadmap

```text
                         KELAX PLATFORM
                              │
              ┌───────────────┴───────────────┐
              │                               │
         PUBLIC WEBSITE                 BUSINESS PLATFORM
              │                               │
      ┌───────┼────────┐             ┌───────┼────────┐
      │       │        │             │       │        │
    Home    Products Solutions     Customer Partner Employee
      │       │        │             │       │        │
      └───────┴────────┘             └───────┴────────┘
                              │
                              ▼
                         ADMIN PORTAL
                              │
             ┌────────────────┼────────────────┐
             │                │                │
          Products          Users           Support
             │                │                │
             ▼                ▼                ▼
          Warranty       Customers/Partners  Tickets
                              │
                              ▼
                         MongoDB
                              │
                              ▼
                       Backup / Storage
```

---

# 🚀 Long-Term Architecture

The long-term objective is to evolve Kelax from a corporate website into a complete digital business platform.

```text
                         KELAX
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
     Website            Portals           Support
        │                  │                  │
        │          ┌───────┼───────┐          │
        │          │       │       │          │
        │       Customer Partner Employee     │
        │          │       │       │          │
        └──────────┴───────┴───────┴──────────┘
                           │
                           ▼
                      Admin Platform
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
      Products          Warranty           Users
        │                  │                  │
        └──────────────────┼──────────────────┘
                           │
                           ▼
                       REST API
                           │
                           ▼
                       MongoDB
                           │
                           ▼
                   Kelax Infrastructure
```

---

# 📌 Project Principles

The Kelax platform should follow these principles:

1. **Security First**
2. **Scalable Architecture**
3. **Clean Code**
4. **Role-Based Access**
5. **API-First Development**
6. **Reusable Components**
7. **Production-Ready Infrastructure**
8. **Reliable Backups**
9. **Minimal Third-Party Dependency**
10. **Maintainable Documentation**

---

# 📄 License

This software and website are proprietary to **Kelax**.

Unauthorized copying, redistribution, modification, or commercial use is prohibited without permission from Kelax.

---

# 👨‍💻 Development

**Project:** Kelax Website & Business Platform
**Architecture:** MERN Stack
**Frontend:** React + Vite + Tailwind CSS
**Backend:** Node.js + Express.js
**Database:** MongoDB
**Deployment:** Self-Hosted Ubuntu Server
**Process Manager:** PM2
**Web Server:** Nginx
**Version Control:** Git + GitHub
