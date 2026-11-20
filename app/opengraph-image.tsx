import { ImageResponse } from "next/og";

export const alt =
  "Marvex Technologies | Websites, Mobile Apps & Custom Software";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#000000",
          padding: "72px 80px",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
          }}
        >
          <span
            style={{
              fontSize: 46,
              fontWeight: 700,
              letterSpacing: "-0.06em",
              color: "#ffffff",
            }}
          >
            Marvex
          </span>
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: 9999,
              backgroundColor: "#00c47a",
              marginLeft: 4,
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 960,
          }}
        >
          <div
            style={{
              fontSize: 66,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-0.045em",
              color: "#ffffff",
            }}
          >
            Software, AI systems, and digital platforms built to last.
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 26,
              lineHeight: 1.45,
              color: "#b4b4bc",
              maxWidth: 820,
            }}
          >
            Web platforms, mobile apps, AI systems, FinTech, data &amp; BI,
            enterprise ERP, cloud infrastructure, and cybersecurity.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #27272a",
            paddingTop: 28,
            fontSize: 20,
            color: "#00c47a",
            fontWeight: 600,
          }}
        >
          <span>marvextechnologies.vercel.app</span>
          <span style={{ color: "#a1a1aa", fontWeight: 400 }}>
            Port Harcourt, Nigeria
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
