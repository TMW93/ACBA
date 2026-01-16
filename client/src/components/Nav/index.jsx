import { useState, useEffect } from 'react'
import Drawer from '../Drawer'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Auth from '../../utils/auth'
import ACBALogo from '/icons/acbaLogo.png'
import catbanner from '/placeholders/catbanner.jpg'

const navigation = [
  { name: 'Home', href: '/', current: false },
  { name: 'Divisions', href: '/divisions', current: false },
  { name: 'Tours', href: '/tours', current: false },
  { name: 'Team Registration', href: '/team-registration', current: false },
  { name: 'Merch', href: '/merch', current: false },
  { name: 'Contact Us', href: '/contact-us', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Nav() {
  const [mounted, setMounted] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  // Admin menu (user avatar + dropdown)
  const AdminMenu = () => {
    if (!Auth.loggedIn()) return null
    return (
      <Menu as="div" className="relative">
        <MenuButton className="relative flex rounded-full focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
          <span className="sr-only">Open user menu</span>
          <img
            alt="user avatar"
            src={catbanner}
            width={32}
            height={32}
            className="rounded-full bg-gray-800 outline outline-1 outline-white/10"
          />
        </MenuButton>
        <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg dark:bg-gray-800 dark:outline-white/10">
          <MenuItem>
            {({ active }) => (
              <a href="#" className={classNames(active ? 'bg-gray-100 dark:bg-white/5' : '', 'block px-4 py-2 text-sm text-gray-700 dark:text-gray-300')}>
                Your profile
              </a>
            )}
          </MenuItem>
          <MenuItem>
            {({ active }) => (
              <a href="/admin" className={classNames(active ? 'bg-gray-100 dark:bg-white/5' : '', 'block px-4 py-2 text-sm text-gray-700 dark:text-gray-300')}>
                Admin
              </a>
            )}
          </MenuItem>
          <MenuItem>
            {({ active }) => (
              <a
                href="/"
                onClick={() => Auth.logout()}
                className={classNames(active ? 'bg-gray-100 dark:bg-white/5' : '', 'block px-4 py-2 text-sm text-gray-700 dark:text-gray-300')}
              >
                Sign out
              </a>
            )}
          </MenuItem>
        </MenuItems>
      </Menu>
    )
  }

  return (
    <Disclosure
      as="nav"
      aria-label="Global"
      className="fixed inset-x-0 top-0 z-50 bg-gray-800 dark:bg-gray-900/90 shadow"
    >
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-14 items-center justify-between">
              {/* Logo */}
              <div className="flex items-center">
                <img
                  alt="ACBA"
                  src={ACBALogo}
                  className="h-6 sm:h-8 w-auto max-h-8"
                />
              </div>

              {/* Desktop nav */}
              <div className="hidden sm:flex sm:space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? 'bg-gray-900 text-white dark:bg-gray-950/50'
                        : 'text-gray-300 hover:bg-white/5 hover:text-white',
                      'px-3 py-2 rounded-md text-sm font-medium'
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>

              {/* Right section */}
              <div className="flex items-center gap-2">
                <AdminMenu />
                <button
                  className="hidden sm:inline-flex px-3 py-2 rounded-md text-sm font-semibold bg-gray-950/5 hover:bg-gray-950/10 dark:bg-white/10 dark:text-white"
                  onClick={() => setDrawerOpen(true)}
                >
                  Our Socials
                </button>

                {/* Mobile menu button */}
                <Disclosure.Button className="sm:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="h-5 w-5" />
                  ) : (
                    <Bars3Icon className="h-5 w-5" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile panel */}
          <Disclosure.Panel className="sm:hidden bg-gray-800 dark:bg-gray-900/90">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-gray-900 text-white dark:bg-gray-950/50'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                >
                  {item.name}
                </Disclosure.Button>
              ))}

              <button
                onClick={() => setDrawerOpen(true)}
                className="block w-full px-3 py-2 rounded-md text-sm font-semibold bg-gray-950/5 hover:bg-gray-950/10 dark:bg-white/10 dark:text-white"
              >
                Our Socials
              </button>
            </div>
          </Disclosure.Panel>

          <Drawer open={drawerOpen} setOpen={setDrawerOpen} />
        </>
      )}
    </Disclosure>
  )
}
