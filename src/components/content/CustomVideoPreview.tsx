"use client"
import React, { useState } from "react"

export default function CustomVideoPreview() {
  const [showVideo, setShowVideo] = useState(false)
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginLeft: "auto",
        marginRight: "auto",
        maxWidth: 900,
        width: "100%",
        paddingLeft: 16,
        paddingRight: 16,
      }}
    >
      {!showVideo ? (
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 900,
            aspectRatio: "16/9",
            cursor: "pointer",
          }}
          onClick={() => setShowVideo(true)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/images/yt-thumb.png"
            alt="Dexie video thumbnail"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 16,
              boxShadow: "0 4px 32px #0008",
              display: "block",
            }}
          />
          <button
            aria-label="Play video"
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              background: "rgba(0,0,0,0.7)",
              border: "none",
              borderRadius: "50%",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 16px #0008",
              cursor: "pointer",
              transition: "background 0.2s",
              zIndex: 2,
            }}
          >
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
              <circle cx="28" cy="28" r="28" fill="var(--dexie-bright)" fillOpacity="0.9" />
              <polygon points="22,18 22,38 40,28" fill="#7C3AED" />
            </svg>
          </button>
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            maxWidth: 900,
            aspectRatio: "16/9",
            position: "relative",
          }}
        >
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/BjPNPuHpX7w?si=rY76FZ9KhRqHGWdI&autoplay=1"
            title="Dexie How it Works"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              borderRadius: 16,
              boxShadow: "0 4px 32px #0008",
              width: "100%",
              height: "100%",
              position: "absolute",
              left: 0,
              top: 0,
            }}
          ></iframe>
        </div>
      )}
    </div>
  )
}
