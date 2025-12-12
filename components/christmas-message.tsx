"use client"

import { useEffect, useState } from "react"

export default function ChristmasMessage() {
  const [isVisible, setIsVisible] = useState(false)
  const [index, setIndex] = useState(0)

  // Mensajes navideños ampliados
  const messages = [
    "✨ Que la magia navideña ilumine tu vida",
    "🎄 Rodeate de amor, paz y alegría estas fiestas",
    "❄️ Cada momento es especial cuando es con quienes amas",
    "🎁 Los mejores regalos son abrazos sinceros y momentos inolvidables",
    "⭐ Que tu Navidad esté llena de luz, esperanza y nuevos sueños",
    "🌟 Que cada estrella del cielo te recuerde todo lo que ya lograste",
    "🎅 La Navidad es el mejor recordatorio de que nunca estás solo",
    "💫 Que esta época te regale motivos para sonreír cada día",
    "🔥 Que el calor del hogar abrace tu corazón esta Navidad",
    "🕯️ En cada chispa, una ilusión; en cada abrazo, un mundo",
    "🎀 Que el espíritu navideño envuelva tu vida de bendiciones",
    "🎄 La Navidad no está en los regalos, sino en las personas",
    "✨ Que la paz y la magia te acompañen en el camino",
    "🌲 Hoy es un buen día para agradecer todo lo bueno que te rodea",
    "🌟 Que la luz de esta Navidad guíe tus próximos pasos",
  ]

  // Mostrar el primer mensaje con transición suave
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 800)
    return () => clearTimeout(timer)
  }, [])

  // Cambiar mensaje cada 60 segundos (1 min)
  useEffect(() => {
    const changeTimer = setInterval(() => {
      setIsVisible(false) // fade out

      setTimeout(() => {
        setIndex((i) => (i + 1) % messages.length)
        setIsVisible(true) // fade in
      }, 600)
    }, 60000) // 60,000 ms → 1 minuto

    return () => clearInterval(changeTimer)
  }, [messages.length])

  return (
    <div
      className={`text-center transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
    >
      <div className="relative inline-block">

        {/* Glow elegante detrás */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/30 to-yellow-300/30 blur-2xl rounded-2xl -z-10"></div>

        {/* Caja estilo cristal navideño */}
        <div
          className="
            bg-gradient-to-br from-red-950/40 to-yellow-800/10
            backdrop-blur-md border border-yellow-400/40
            rounded-2xl p-6 md:p-8 shadow-xl max-w-xl mx-auto
          "
        >
          <p className="text-yellow-200/90 text-lg md:text-xl leading-relaxed font-light select-none">
            {messages[index]}
          </p>
        </div>
      </div>
    </div>
  )
}
