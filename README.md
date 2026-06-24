# 🌿 AgriSustain - Sustainable Agriculture Information System

A modern web application providing farmers and agricultural enthusiasts with comprehensive tools for organic farming, soil testing, and government scheme information — powered by Azure AI integration.

![AgriSustain Banner](assets/agri_hero_banner.png)

## ✨ Features

- **Organic Farming Portal** — Guides on composting, vermicomposting, crop rotation, and bio-pesticides
- **Soil Test Recommendation Engine** — Analyze N-P-K levels and pH to get organic amendment prescriptions
- **Organic Yield Estimator** — Calculate conversion costs and projected organic yields
- **Government Schemes Directory** — Searchable, filterable database of agricultural schemes with eligibility checker
- **Azure AI Chatbot** — Integrated chatbot assistant for real-time agricultural guidance
- **Dark/Light Theme** — Modern UI with glassmorphism design and responsive layouts

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 14** | React framework with App Router |
| **React 18** | UI component library |
| **Tailwind CSS** | Utility-first styling |
| **Prisma** | Database ORM |
| **Azure AI** | Chatbot integration |
| **HTML5 / CSS3 / JS** | Legacy static version |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL (optional, for Prisma)

### Installation
```bash
git clone https://github.com/carey/sustainable-agriculture-info-system.git
cd sustainable-agriculture-info-system
npm install
cp .env.example .env
npm run dev
```

Open [AgriSustain](https://careyonline.github.io/sustainable_agriculture_info_system/) in your browser.

### Static Version
You can also open `index.html` directly in any browser for the legacy static version.

## 📁 Project Structure
```
├── app/              # Next.js App Router pages
├── assets/           # Static image assets
├── components/       # Reusable React components
├── lib/              # Data utilities and engine logic
├── prisma/           # Database schema
├── index.html        # Legacy static version
├── script.js         # Legacy JavaScript
└── style.css         # Legacy stylesheet
```

## 📄 License

This project is licensed under the MIT License — see the [LICENSE.md](LICENSE.md) file for details.

## 🤝 Contributing

Contributions are welcome! Please read the [CONTRIBUTING.md](CONTRIBUTING.md) guide first.

---

Developed with ❤️ by **carey**
