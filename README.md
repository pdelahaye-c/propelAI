# Propel AI - Real Estate Agent

An AI receptionist platform for real estate agencies that answers calls, qualifies leads, syncs to CRM systems, and engages with prospects via WhatsApp.

## Features

- **AI Voice Receptionist** - Answers calls instantly with Google Gemini AI
- **Live Demo** - Interactive voice demo powered by Gemini 2.5 Flash
- **ROI Calculator** - Lead capture tool that calculates potential revenue savings
- **CRM Integration** - Webhook-based lead syncing to your CRM
- **Agent Dashboard** - Track calls, leads, and performance metrics
- **WhatsApp Follow-up** - Automated prospect engagement

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS
- **AI**: Google Gemini 2.5 Flash (Native Audio)
- **Voice Widget**: ElevenLabs ConvAI

## Getting Started

### Prerequisites

- Node.js 18+
- A Google Gemini API key ([Get one here](https://aistudio.google.com/app/apikey))

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/pdelahaye-c/propelAI.git
   cd propelAI
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and add your API keys:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   WEBHOOK_URL=your_webhook_url_here  # Optional
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── components/
│   ├── Dashboard.tsx      # Agent dashboard with stats
│   ├── FAQ.tsx            # FAQ section
│   ├── Features.tsx       # Feature showcase
│   ├── Footer.tsx         # Site footer
│   ├── Header.tsx         # Navigation header
│   ├── Hero.tsx           # Landing page hero
│   ├── LiveAgentDemo.tsx  # Gemini AI voice demo
│   ├── Login.tsx          # Login modal
│   ├── Pricing.tsx        # Pricing section
│   ├── ROICalculator.tsx  # Interactive ROI calculator
│   ├── TrustedBy.tsx      # Trust indicators
│   └── Visualizer.tsx     # Audio visualization
├── App.tsx                # Main app component
├── index.tsx              # React entry point
├── types.ts               # TypeScript interfaces
├── utils.ts               # Audio utilities
└── vite.config.ts         # Vite configuration
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | Yes | Google Gemini API key for AI voice demo |
| `WEBHOOK_URL` | No | Webhook URL for lead capture (CRM integration) |

## License

MIT License - see [LICENSE](LICENSE) for details.
