"use client"

import { useEffect, useRef } from "react"

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    // Intenta reproducir en silencio
    audio.play().catch(() => {})

    // En el primer clic, activa el volumen
    const enableSound = () => {
      if (!audio) return
      audio.muted = false
      audio.volume = 0.6 // volumen suave
      audio.play()
      window.removeEventListener("click", enableSound)
    }

    window.addEventListener("click", enableSound)

    return () => window.removeEventListener("click", enableSound)
  }, [])

  return (
    <audio
      ref={audioRef}
      src="/navidad.mp3"
      autoPlay
      loop
      muted
      style={{ display: "none" }}
    />
  )
}
