import { ImageResponse } from "next/og";

export const alt = "Tasklyn: Enterprise AI Engineering & Products. AI is the future and we are building it.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The share card. Built from the traced mark and the brand tokens, so it
 * cannot drift from the logo. No photograph and no claims: name, descriptor
 * and the tagline. (ImageResponse cannot read CSS variables, so the token
 * values are repeated here.)
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: 24,
          background: "#ffffff",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "72px 80px",
            borderRadius: 28,
            background: "#101b30",
            color: "#f4f6fa",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <svg width="56" height="56" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="g" x1="0" y1="100" x2="100" y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#0196FD" />
                  <stop offset="1" stopColor="#04BDFA" />
                </linearGradient>
              </defs>
              <path
                fill="url(#g)"
                d="M62.9 0 L99.5 0 L99.5 37 L85.6 23.4 L63.4 58.9 L39.7 59.9 L39.7 73.4 L27.8 85.4 L27.8 100 L0 100 L0 70.8 L23.7 70.3 L24.2 42.7 L55.2 42.7 L60.8 34.4 L73.7 13 Z"
              />
            </svg>
            <div style={{ marginLeft: 22, fontSize: 30, letterSpacing: "0.16em", fontWeight: 500 }}>TASKLYN</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 26, color: "#a3b1c6", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Enterprise AI Engineering &amp; Products
            </div>
            <div style={{ marginTop: 24, fontSize: 72, lineHeight: 1.05, letterSpacing: "-0.035em", maxWidth: 900 }}>
              AI is the future and we are building it.
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
