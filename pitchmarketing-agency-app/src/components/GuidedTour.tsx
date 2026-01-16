'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const steps = [
  {
    id: 1,
    target: '#nav-orders',
    title: 'Orders',
    description:
      'Here you can see your event bookings and balloon orders — everything organized in one place.',
  },
  {
    id: 2,
    target: '#nav-contacts',
    title: 'Contacts',
    description:
      'All your clients and leads live here. Add notes, view details, and track relationships easily.',
  },
  {
    id: 3,
    target: '#nav-messages',
    title: 'Messages',
    description:
      'Stay connected — view, reply, or send updates via email or SMS directly inside your dashboard.',
  },
]

export default function GuidedTour() {
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const seen = localStorage.getItem('bqx_tour_done')
    if (!seen) setStep(1)
  }, [])

  const nextStep = () => {
    if (step < steps.length) setStep(step + 1)
    else {
      setDone(true)
      localStorage.setItem('bqx_tour_done', 'true')
    }
  }

  const current = steps.find((s) => s.id === step)
  if (!current || done) return null

  const targetEl = document.querySelector(current.target)
  const rect = targetEl?.getBoundingClientRect()

  return (
    <AnimatePresence>
      {rect && (
        <motion.div
          key={current.id}
          className="fixed inset-0 bg-black/60 z-[999] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute border-2 border-pink-400 rounded-xl"
            style={{
              top: rect.top - 8,
              left: rect.left - 8,
              width: rect.width + 16,
              height: rect.height + 16,
            }}
          />
          <motion.div
            className="bg-white p-6 rounded-2xl shadow-xl max-w-sm text-center"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          >
            <h3 className="text-xl font-semibold mb-2 text-pink-600">{current.title}</h3>
            <p className="text-gray-600 mb-4">{current.description}</p>
            <button
              onClick={nextStep}
              className="bg-pink-500 text-white px-4 py-2 rounded-xl hover:bg-pink-600 transition"
            >
              {step < steps.length ? 'Next' : 'Finish'}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
