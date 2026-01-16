import { useState, useRef } from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function Drawer({ open, setOpen, children }) {
  const panelRef = useRef(null)
  const startX = useRef(0)
  const currentX = useRef(0)
  const [dragging, setDragging] = useState(false)

  // Start touch
  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX
    setDragging(true)
  }

  // Move touch
  const handleTouchMove = (e) => {
    if (!dragging) return
    currentX.current = e.touches[0].clientX
    const diff = currentX.current - startX.current
    if (panelRef.current) {
      // Only allow swipe to close (right-to-left swipe)
      if (diff < 0) {
        panelRef.current.style.transform = `translateX(${diff}px)`
      }
    }
  }

  // End touch
  const handleTouchEnd = () => {
    setDragging(false)
    const diff = currentX.current - startX.current
    // If swiped more than 50px to the left, close drawer
    if (diff < -50) {
      setOpen(false)
    } else if (panelRef.current) {
      panelRef.current.style.transform = '' // reset position
    }
  }

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <DialogPanel
              ref={panelRef}
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out sm:duration-700"
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
