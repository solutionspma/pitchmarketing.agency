'use client'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function WelcomeBanner() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 7000)
    return () => clearTimeout(timer)
  }, [])

  if (!show) return null

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3">
        <span className="text-2xl">🎈</span>
        <div>
          <h2 className="text-lg font-semibold">Welcome, Carolina!</h2>
          <p className="text-sm text-white/90">
            Your personalized Balloon QueenX experience is live!
          </p>
        </div>
      </div>
    </motion.div>
  )
}
