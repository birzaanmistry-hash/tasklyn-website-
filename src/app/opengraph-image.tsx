import { ImageResponse } from "next/og";

export const alt = "Tasklyn AI: custom AI systems for your business operations";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The share card shown when a Tasklyn link is posted anywhere.
 *
 * Built at deploy time from the same traced mark and brand colours as the site,
 * so it cannot drift from the logo. There is no photograph and no claim on it:
 * name, mark and the one-line description the site already uses.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "0 96px",
          background: "#05070c",
          backgroundImage:
            "radial-gradient(circle at 78% 30%, rgba(0,128,255,0.22), rgba(5,7,12,0) 55%)",
          color: "#f4f7fb",
        }}
      >
        <svg width="190" height="190" viewBox="0 0 100 100" style={{ flexShrink: 0 }}>
          <defs>
            <linearGradient id="g" x1="0" y1="100" x2="100" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#0080FF" />
              <stop offset="1" stopColor="#06D0F9" />
            </linearGradient>
          </defs>
          <path
            fill="url(#g)"
            d="M62.9 0 L99.5 0 L99.5 37 L85.6 23.4 L63.4 58.9 L39.7 59.9 L39.7 73.4 L27.8 85.4 L27.8 100 L0 100 L0 70.8 L23.7 70.3 L24.2 42.7 L55.2 42.7 L60.8 34.4 L73.7 13 Z"
          />
        </svg>

        <div style={{ display: "flex", flexDirection: "column", marginLeft: 72 }}>
          <div style={{ fontSize: 92, fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1 }}>
            Tasklyn AI
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 38,
              lineHeight: 1.3,
              color: "#9db1cb",
              maxWidth: 680,
            }}
          >
            Custom AI systems that run the repetitive work inside your business.
          </div>
          <div style={{ marginTop: 40, fontSize: 28, color: "#0080ff" }}>tasklyn.in</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
