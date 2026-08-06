"use client"

import React from "react"
import { TypeAnimation } from "react-type-animation"

interface TypeWriterProps {
  strings: string[]
  colorClass?: string
  breakRows?: boolean
}

export default function TypeWriter({
  strings = [],
  colorClass = "primary",
  breakRows = true,
}: TypeWriterProps) {
  if (!breakRows) {
    return (
      <TypeAnimation
        sequence={[...strings.flatMap((element) => [element, 2000])]}
        wrapper="span"
        speed={50}
        repeat={Infinity}
        style={{
          background:
            "linear-gradient(to right, #7b2cbf,  var(--dexie-accent-strong),  var(--dexie-accent),  var(--dexie-accent-strong),  #7b2cbf)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      />
    )
  }

  return (
    <div className={`typewrite ${colorClass}`}>
      <TypeAnimation
        sequence={[...strings.flatMap((element) => [element, 2000])]}
        wrapper="span"
        speed={50}
        repeat={Infinity}
        style={{
          background:
            "linear-gradient(to right, #7b2cbf,  var(--dexie-accent-strong),  var(--dexie-accent),  var(--dexie-accent-strong),  #7b2cbf)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      />
    </div>
  )
}
