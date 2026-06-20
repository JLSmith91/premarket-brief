import { useState } from "react";

const WATCHLIST = ["NOK", "SOFI", "SPCE", "VRA", "SPY", "QQQ"];

const COLORS = {
  bg: "#0a0a0f",
  surface: "#111118",
  border: "#1e1e2e",
  accent: "#c8a96e",
  accentDim: "#8a7040",
  green: "#4ade80",
  red: "#f87171",
  yellow: "#fbbf24",
  muted: "#52526b",
  text: "#e2e2f0",
  textDim: "#9999b3",
};

const styles = {
  app: {
    minHeight: "100vh",
    background: COLORS.bg,
    color: COLORS.text,
    fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
    padding: "0",
  },
  header: {
    borderBottom: `1px solid ${COLORS.border}`,
    padding: "20px 32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: COLORS.surface,
  },
  logo: {
    fontSize: "13px",
    letterSpacing: "0.2em",
    color: COLORS.accent,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  timestamp: {
    fontSize: "11px",
    color: COLORS.muted,
    letterSpacing: "0.1em",
  },
  main: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "40px 32px",
  },
  briefingHeader: {
    marginBottom: "40px",
    textAlign: "center",
  },
  headline: {
    fontSize: "28px",
    fontWeight: "300",
    letterSpacing: "0.05em",
    color: COLORS.text,
    marginBottom: "8px",
    fontFamily: "'IBM Plex Sans', system-ui, sans-serif",
  },
  subheadline: {
    fontSize: "12px",
    color: COLORS.muted,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
  },
  scanBtn: {
    display: "block",
    margin: "0 auto 48px",
    padding: "14px 48px",
    background: "transparent",
    border: `1px solid ${COLORS.accent}`,
    color: COLORS.accent,
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: "13px",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    cursor: "pointer",
    transition: "all 0.15s ease",
    borderRadius: "2px",
  },
  loadingWrap: {
    textAlign: "center",
    padding: "60px 0",
  },
  loadingText: {
    color: COLORS.accentDim,
    fontSize: "12px",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    animation: "pulse 1.5s ease-in-out infinite",
  },
  tickerGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "16px",
    marginBottom: "32px",
  },
  tickerCard: {
    background: COLORS.surface,
    border: `1px solid ${COLORS.border}`,
    borderRadius: "4px",
    padding: "20px",
    position: "relative",
  },
  tickerHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "14px",
  },
  tickerSymbol: {
    fontSize: "18px",
    fontWeight: "700",
    color: COLORS.text,
    letterSpacing: "0.05em",
  },
  tickerName: {
    fontSize: "10px",
    color: COLORS.muted,
    marginTop: "2px",
    letterSpacing: "0.05em",
  },
  dataRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "5px 0",
    borderBottom: `1px solid ${COLORS.border}`,
    fontSize: "11px",
  },
  dataLabel: {
    color: COLORS.muted,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  sectionLabel: {
    fontSize: "10px",
    color: COLORS.accentDim,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    marginTop: "14px",
    marginBottom: "6px",
  },
  newsText: {
    fontSize: "11px",
    color: COLORS.textDim,
    lineHeight: "1.6",
  },
  reasonText: {
    fontSize: "11px",
    color: COLORS.textDim,
    lineHeight: "1.6",
    fontStyle: "italic",
  },
  marketSummaryCard: {
    background: COLORS.surface,
    border: `1px solid ${COLORS.accent}`,
    borderRadius: "4px",
    padding: "24px",
    marginBottom: "32px",
  },
  marketSummaryTitle: {
    fontSize: "11px",
    color: COLORS.accent,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    marginBottom: "12px",
  },
  marketSummaryText: {
    fontSize: "13px",
    color: COLORS.text,
    lineHeight: "1.7",
    fontFamily: "'IBM Plex Sans', system-ui, sans-serif",
    fontWeight: "300",
  },
  errorBox: {
    background: "rgba(248,113,113,0.08)",
    border: `1px solid rgba(248,113,113,0.3)`,
    borderRadius: "4px",
    padding: "20px",
    color: COLORS.red,
    fontSize: "12px",
    textAlign: "center",
  },
};

function verdictBadgeStyle(verdict) {
  return {
    padding: "4px 10px",
    borderRadius: "2px",
    fontSize: "10px",
    fontWeight: "700",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    background:
      verdict === "GO"
        ? "rgba(74,222,128,0.12)"
        : verdict === "NO-GO"
        ? "rgba(248,113,113,0.12)"
        : "rgba(251,191,36,0.12)",
    color:
      verdict === "GO"
        ? COLORS.green
        : verdict === "NO-GO"
        ? COLORS.red
        : COLORS.yellow,
    border: `1px solid ${
      verdict === "GO"
        ? "rgba(74,222,128,0.3)"
        : verdict === "NO-GO"
        ? "rgba(248,113,113,0.3)"
        : "rgba(251,191,36,0.3)"
    }`,
  };
}

function tickerCardStyle(verdict) {
  return {
    ...styles.tickerCard,
    borderLeft: `3px solid ${
      verdict === "GO"
        ? COLORS.green
        : verdict === "NO-GO"
        ? COLORS.red
        : COLORS.yellow
    }`,
  };
}

function dataValueStyle(color) {
  return {
    color: color || COLORS.text,
    fontWeight: "600",
    fontSize: "11px",
  };
}

function sentimentColor(sentiment) {
  if (sentiment === "Bullish") return COLORS.green;
  if (sentiment === "Bearish") return COLORS.red;
  return COLORS.yellow;
}

function TickerCard({ data }) {
  const { symbol, name, price, priceChange, volume, support, resistance, sentiment, news, catalysts, verdict, reason } = data;
  const isPos = priceChange && priceChange.startsWith("+");

  return (
    <div style={tickerCardStyle(verdict)}>
      <div style={styles.tickerHeader}>
        <div>
          <div style={styles.tickerSymbol}>{symbol}</div>
          <div style={styles.tickerName}>{name}</div>
        </div>
        <div style={verdictBadgeStyle(verdict)}>{verdict}</div>
      </div>

      <div style={styles.dataRow}>
        <span style={styles.dataLabel}>Pre-Mkt Price</span>
        <span style={dataValueStyle(isPos ? COLORS.green : COLORS.red)}>
          {price} <span style={{ fontSize: "10px" }}>({priceChange})</span>
        </span>
      </div>

      <div style={styles.dataRow}>
        <span style={styles.dataLabel}>Volume</span>
        <span style={dataValueStyle()}>{volume}</span>
      </div>

      <div style={styles.dataRow}>
        <span style={styles.dataLabel}>Support</span>
        <span style={dataValueStyle(COLORS.green)}>{support}</span>
      </div>

      <div style={styles.dataRow}>
        <span style={styles.dataLabel}>Resistance</span>
        <span style={dataValueStyle(COLORS.red)}>{resistance}</span>
      </div>

      <div style={styles.dataRow}>
        <span style={styles.dataLabel}>Sentiment</span>
        <span style={dataValueStyle(sentimentColor(sentiment))}>{sentiment}</span>
      </div>

      {news && (
        <>
          <div style={styles.sectionLabel}>News</div>
          <div style={styles.newsText}>{news}</div>
        </>
      )}

      {catalysts && (
        <>
          <div style={styles.sectionLabel}>Catalyst</div>
          <div style={styles.newsText}>{catalysts}</div>
        </>
      )}

      <div style={styles.sectionLabel}>Reasoning</div>
      <div style={styles.reasonText}>{reason}</div>
    </div>
  );
}

function getToday() {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getTime() {
  return new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

export default function PreMarketBrief() {
  const [loading, setLoading] = useState(false);
  const [brief, setBrief] = useState(null);
  const [error, setError] = useState(null);
  const [scanTime, setScanTime] = useState(null);

  async function runScan() {
    setLoading(true);
    setError(null);
    setBrief(null);

    const today = getToday();

    const prompt = `You are a professional pre-market trading analyst. Today is ${today}.

Generate a pre-market brief for these tickers: ${WATCHLIST.join(", ")}.

Use your web search tool to find current pre-market prices, recent news, and market sentiment for each ticker.

Return ONLY a valid JSON object with this exact structure (no markdown, no explanation, no trailing commas):
{
  "marketSummary": "2-3 sentence overall market vibe for today. SPY/QQQ direction, macro context, risk-on or risk-off feel.",
  "tickers": [
    {
      "symbol": "NOK",
      "name": "Nokia Corp",
      "price": "$4.12",
      "priceChange": "+1.2%",
      "volume": "2.1M",
      "support": "$3.95",
      "resistance": "$4.25",
      "sentiment": "Bullish",
      "news": "One sentence summarizing the most relevant recent news.",
      "catalysts": "Any earnings, partnership, or event catalyst today or this week. None if nothing.",
      "verdict": "GO",
      "reason": "One sentence justifying the GO/NO-GO/WAIT verdict based on price action, sentiment, and setup."
    }
  ]
}

Sentiment must be exactly one of: Bullish, Bearish, Neutral.
Verdict must be exactly one of: GO, NO-GO, WAIT.
Include all 6 tickers: NOK, SOFI, SPCE, VRA, SPY, QQQ.
Use real current data from your search. If exact pre-market price is unavailable, use last close with a note.
IMPORTANT: Return only the JSON object. No extra text before or after.`;

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "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",
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 4096,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "API error");
      }

      const fullText = data.content
  .map((item) => (item.type === "text" ? item.text : ""))
  .filter(Boolean)
  .join("\n");

const clean = fullText.replace(/```json|```/g, "").trim();

const jsonStart = clean.indexOf("{");
const jsonEnd = clean.lastIndexOf("}");
if (jsonStart === -1 || jsonEnd === -1) throw new Error("No JSON found in response");

let jsonStr = clean.slice(jsonStart, jsonEnd + 1);
// Fix common JSON issues
jsonStr = jsonStr.replace(/,(\s*[}\]])/g, "$1"); // trailing commas
jsonStr = jsonStr.replace(/[\u0000-\u001F\u007F-\u009F]/g, " "); // control characters
jsonStr = jsonStr.replace(/\n/g, " "); // newlines inside strings
jsonStr = jsonStr.replace(/\r/g, ""); // carriage returns

let parsed;
try {
  parsed = JSON.parse(jsonStr);
} catch(parseErr) {
  console.log("Raw response:", fullText);
  throw new Error("JSON parse failed - check console for raw response");
}
      setBrief(parsed);
      setScanTime(getTime());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.app}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;600;700&family=IBM+Plex+Sans:wght@300;400;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0a0f; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        button:hover { background: rgba(200,169,110,0.08) !important; }
      `}</style>

      <div style={styles.header}>
        <div style={styles.logo}>⬡ Trade Brief</div>
        <div style={styles.timestamp}>
          {getToday()}{scanTime ? ` · Scanned ${scanTime}` : ""}
        </div>
      </div>

      <div style={styles.main}>
        <div style={styles.briefingHeader}>
          <div style={styles.headline}>Pre-Market Intelligence</div>
          <div style={styles.subheadline}>{WATCHLIST.join(" · ")}</div>
        </div>

        <button style={styles.scanBtn} onClick={runScan} disabled={loading}>
          {loading ? "Scanning Markets..." : "Run Morning Scan"}
        </button>

        {loading && (
          <div style={styles.loadingWrap}>
            <div style={styles.loadingText}>
              Pulling pre-market data · Analyzing sentiment · Building brief...
            </div>
          </div>
        )}

        {error && (
          <div style={styles.errorBox}>Scan failed: {error}</div>
        )}

        {brief && (
          <>
            <div style={styles.marketSummaryCard}>
              <div style={styles.marketSummaryTitle}>Market Overview</div>
              <div style={styles.marketSummaryText}>{brief.marketSummary}</div>
            </div>
            <div style={styles.tickerGrid}>
              {brief.tickers?.map((ticker) => (
                <TickerCard key={ticker.symbol} data={ticker} />
              ))}
            </div>
          </>
        )}

        {!loading && !brief && !error && (
          <div style={{ textAlign: "center", color: COLORS.muted, fontSize: "12px", letterSpacing: "0.1em" }}>
            Markets are waiting. Run your scan.
          </div>
        )}
      </div>
    </div>
  );
}