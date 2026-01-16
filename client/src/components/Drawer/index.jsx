import { useRef, useState, useEffect } from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function Drawer({ open, setOpen, children }) {
  const panelRef = useRef(null)
  const startX = useRef(0)
  const currentX = useRef(0)
  const [dragging, setDragging] = useState(false)
  const [isVisible, setIsVisible] = useState(open)

  // Smooth open/close
  useEffect(() => {
    if (open) {
      setIsVisible(true)
    } else if (panelRef.current) {
      // Wait for transition to finish before removing from DOM
      const timeout = setTimeout(() => setIsVisible(false), 300)
      return () => clearTimeout(timeout)
    }
  }, [open])

  // Swipe handlers
  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX
    setDragging(true)
  }

  const handleTouchMove = (e) => {
    if (!dragging) return
    currentX.current = e.touches[0].clientX
    const diff = currentX.current - startX.current
    if (panelRef.current && diff < 0) {
      panelRef.current.style.transform = `translateX(${diff}px)`
    }
  }

  const handleTouchEnd = () => {
    setDragging(false)
    const diff = currentX.current - startX.current
    if (diff < -50) {
      setOpen(false)
    } else if (panelRef.current) {
      panelRef.current.style.transform = '' // reset
    }
  }

  if (!isVisible) return null

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-50">
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/30 transition-opacity ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
            <DialogPanel
              ref={panelRef}
              className={`pointer-events-auto w-screen max-w-md transform transition-transform duration-300 ease-in-out
                ${open ? 'translate-x-0' : 'translate-x-full'}`}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="relative flex h-full flex-col overflow-y-auto bg-white py-6 shadow-xl dark:bg-gray-800">
                {/* Header */}
                <div className="px-4 sm:px-6 flex items-center justify-between">
                  <DialogTitle className="text-base font-semibold text-gray-900 dark:text-white">
                    Our Socials
                  </DialogTitle>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="relative rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    <span className="sr-only">Close panel</span>
                    <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                  </button>
                </div>
                {/* Content */}
                <div className="relative mt-6 flex-1 px-4 sm:px-6">{children}</div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
