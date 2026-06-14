# ⚜️ Aurix — Digital Gold Trading Platform

Aurix is a fintech platform that allows users to buy, sell, and manage digital gold.

## 🚀 Tech Stack
- **Frontend**: React.js + Vite
- **Backend**: PHP 8.4
- **Database**: MySQL
- **Auth**: JWT

## ⚙️ Installation

### Backend
```bash
cd backend
composer install
php -S localhost:8080 index.php
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Database
- Create database `aurix_db`
- Import `database/schema.sql`

## 🤖 How AI Adds Value to Aurix
- Personalized investment advice based on portfolio
- Explains financial terms in simple language
- Helps users make informed buy/sell decisions
- Available 24/7 inside the platform

## 🔮 Future AI Features
- Gold price prediction using machine learning
- Smart alerts when gold price drops/rises
- Sentiment analysis on gold market news
- Personalized portfolio recommendations

## 📈 How the System Could Scale
- Horizontal PHP-FPM scaling behind a load balancer
- Redis caching for wallet and price data
- MySQL read replicas for heavy query load
- CDN for React frontend static assets
- Queue system for AI requests

## 🗄️ Database Schema
See `/database/schema.sql`
