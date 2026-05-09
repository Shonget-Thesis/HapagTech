import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const STORAGE_KEY = 'hapagtech_cookie_consent'

const CookieConsent: React.FC = () => {
  const [accepted, setAccepted] = useState<boolean | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    setAccepted(stored === 'true')
  }, [])

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'true')
    setAccepted(true)
  }

  if (accepted) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 w-full max-w-xl px-4">
      <div className="bg-[#F8F0D8]/95 backdrop-blur-sm border border-[#32347C]/10 rounded-xl p-4 shadow-lg flex items-center gap-4 text-[#32347C]">
        <div className="flex-1">
          <p className="text-sm">We use cookies to improve your experience. By continuing, you agree to our <Link to="/privacy" className="cursor-pointer text-[#FF5300] underline underline-offset-4">Privacy Policy</Link> and <Link to="/terms" className="cursor-pointer text-[#FF5300] underline underline-offset-4">Terms</Link>.</p>
        </div>
        <div className="flex-shrink-0">
          <button
            onClick={accept}
            className="cursor-pointer bg-[#FF5300] text-white px-4 py-2 rounded-full font-semibold transform transition-all duration-300 hover:scale-105 active:translate-x-1"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}

export default CookieConsent
