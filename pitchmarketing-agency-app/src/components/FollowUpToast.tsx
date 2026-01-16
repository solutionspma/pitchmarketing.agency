'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function FollowUpToast() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 10000)
    return () => clearTimeout(timer)
  }, [])

  if (!show) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 right-4 bg-white text-gray-800 px-5 py-3 rounded-xl shadow-xl border border-pink-200 z-50 max-w-sm"
    >
      <p className="text-sm">
        👋 Carolina, explore your <strong>Orders</strong> tab first — that's where your event magic begins.
      </p>
    </motion.div>
  )
}
