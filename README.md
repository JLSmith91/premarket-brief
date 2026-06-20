# ⬡ Pre-Market Brief

An AI-powered pre-market trading intelligence tool that generates a structured morning brief for a personal watchlist — including sentiment analysis, technical levels, and GO/NO-GO trade verdicts.

**Live Demo:** [premarket-brief-lemon.vercel.app](https://premarket-brief-lemon.vercel.app)

---

## What It Does

One click generates a full pre-market brief for a configured watchlist. For each ticker, the agent returns:

- Pre-market price and percentage change
- Volume estimate
- Key support and resistance levels
- Sentiment (Bullish / Bearish / Neutral)
- Recent news summary
- Upcoming catalysts
- GO / NO-GO / WAIT verdict with reasoning
- Overall market summary (SPY/QQQ macro context)

Default watchlist: **NOK · SOFI · SPCE · VRA · SPY · QQQ**

---

## Tech Stack

- **React** + **Vite** — frontend framework and build tool
- **Anthropic Claude API** (`claude-sonnet-4-6`) — AI analysis and brief generation
- **Vercel** — deployment and hosting

---

## Getting Started

### Prerequisites
- Node.js v18+
- Anthropic API key ([console.anthropic.com](https://console.anthropic.com))

### Installation

```bash
git clone https://github.com/JLSmith91/premarket-brief.git
cd premarket-brief
npm install
```

### Environment Variables

Create a `.env` file in the root of the project:

```
VITE_ANTHROPIC_API_KEY=your_api_key_here
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and click **Run Morning Scan**.

---

## Customization

To change the watchlist, edit the `WATCHLIST` array at the top of `src/App.jsx`:

```javascript
const WATCHLIST = ["NOK", "SOFI", "SPCE", "VRA", "SPY", "QQQ"];
```

---

## Deployment

This project is deployed on Vercel. To deploy your own instance:

1. Fork this repo
2. Import it into [vercel.com](https://vercel.com)
3. Add `VITE_ANTHROPIC_API_KEY` as an environment variable in Vercel project settings
4. Deploy

---

## Project Structure

```
premarket-brief/
├── src/
│   └── App.jsx        # Main application component and AI agent logic
├── public/
├── index.html
├── vite.config.js
└── package.json
```

---

## Part of a Larger AI Tooling Portfolio

This agent is one of several AI-powered tools built for personal trading and daily workflows. Others in development include a Trade Journal Agent, Risk Rules Enforcer, and Weekly Life Planner.

---

## Author

**Jared Smith** — [@JLSmith91](https://github.com/JLSmith91)
