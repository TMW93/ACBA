// import { useState, useEffect } from 'react'
// import Drawer from '../Drawer'
// import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
// import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
// import Auth from '../../utils/auth'
// import ACBALogo from '/icons/acbaLogo.png'
// import catbanner from '/placeholders/catbanner.jpg'

// const navigation = [
//   { name: 'Home', href: '/', current: false },
//   { name: 'Divisions', href: '/divisions', current: false },
//   { name: 'Tours', href: '/tours', current: false },
//   { name: 'Team Registration', href: '/team-registration', current: false },
//   { name: 'Merch', href: '/merch', current: false },
//   { name: 'Contact Us', href: '/contact-us', current: false },
// ]

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }

// export default function Nav() {
//   const [mounted, setMounted] = useState(false)
//   const [drawerOpen, setDrawerOpen] = useState(false)

//   useEffect(() => setMounted(true), [])
//   if (!mounted) return null

//   // Admin menu (user avatar + dropdown)
//   const AdminMenu = () => {
//     if (!Auth.loggedIn()) return null
//     return (
//       <Menu as="div" className="relative">
//         <MenuButton className="relative flex rounded-full focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
//           <span className="sr-only">Open user menu</span>
//           <img
//             alt="user avatar"
//             src={catbanner}
//             width={32}
//             height={32}
//             className="rounded-full bg-gray-800 outline outline-1 outline-white/10"
//           />
//         </MenuButton>
//         <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg dark:bg-gray-800 dark:outline-white/10">
//           <MenuItem>
//             {({ active }) => (
//               <a href="#" className={classNames(active ? 'bg-gray-100 dark:bg-white/5' : '', 'block px-4 py-2 text-sm text-gray-700 dark:text-gray-300')}>
//                 Your profile
//               </a>
//             )}
//           </MenuItem>
//           <MenuItem>
//             {({ active }) => (
//               <a href="/admin" className={classNames(active ? 'bg-gray-100 dark:bg-white/5' : '', 'block px-4 py-2 text-sm text-gray-700 dark:text-gray-300')}>
//                 Admin
//               </a>
//             )}
//           </MenuItem>
//           <MenuItem>
//             {({ active }) => (
//               <a
//                 href="/"
//                 onClick={() => Auth.logout()}
//                 className={classNames(active ? 'bg-gray-100 dark:bg-white/5' : '', 'block px-4 py-2 text-sm text-gray-700 dark:text-gray-300')}
//               >
//                 Sign out
//               </a>
//             )}
//           </MenuItem>
//         </MenuItems>
//       </Menu>
//     )
//   }

//   return (
//     <Disclosure as="nav" aria-label="Global" className="absolute inset-x-0 top-0 z-50 bg-gray-800 dark:bg-gray-800/50">
//       {({ open }) => (
//         <>
//           {/* Nav bar */}
//           <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
//             <div className="relative flex h-16 items-center justify-between">

//               {/* Mobile hamburger button */}
//               <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
//                 <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
//                   <span className="sr-only">Open main menu</span>
//                   <Bars3Icon className={classNames('h-6 w-6', open ? 'hidden' : 'block')} />
//                   <XMarkIcon className={classNames('h-6 w-6', open ? 'block' : 'hidden')} />
//                 </DisclosureButton>
//               </div>

//               {/* Logo + desktop links */}
//               <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
//                 <div className="flex shrink-0 items-center">
//                   <img alt="ACBA" src={ACBALogo} width={32} height={32} className="h-8 w-auto" />
//                 </div>

//                 {/* Desktop links */}
//                 <div className="hidden sm:ml-6 sm:flex space-x-4">
//                   {navigation.map(item => (
//                     <a
//                       key={item.name}
//                       href={item.href}
//                       className={classNames(
//                         item.current ? 'bg-gray-900 text-white dark:bg-gray-950/50' : 'text-gray-300 hover:bg-white/5 hover:text-white',
//                         'rounded-md px-3 py-2 text-base font-medium'
//                       )}
//                     >
//                       {item.name}
//                     </a>
//                   ))}
//                 </div>
//               </div>

//               {/* Right-most section: admin menu + desktop drawer */}
//               <div className="flex items-center gap-2 sm:gap-4">
//                 <AdminMenu />
//                 {/* Desktop drawer button */}
//                 <button
//                   className="hidden sm:inline-flex rounded-md bg-gray-950/5 px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-950/10 dark:bg-white/10 dark:text-white"
//                   onClick={() => setDrawerOpen(true)}
//                 >
//                   Our Socials
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Mobile menu panel */}
//           <DisclosurePanel className="sm:hidden">
//             <div className="space-y-1 px-2 pt-2 pb-3">
//               {navigation.map(item => (
//                 <DisclosureButton
//                   key={item.name}
//                   as="a"
//                   href={item.href}
//                   className={classNames(
//                     item.current ? 'bg-gray-900 text-white dark:bg-gray-950/50' : 'text-gray-300 hover:bg-white/5 hover:text-white',
//                     'block rounded-md px-3 py-2 text-base font-medium'
//                   )}
//                 >
//                   {item.name}
//                 </DisclosureButton>
//               ))}

//               {/* Mobile drawer button — only visible on mobile */}
//               <button
//                 onClick={() => setDrawerOpen(true)}
//                 className="block sm:hidden w-full rounded-md bg-gray-950/5 px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-950/10 dark:bg-white/10 dark:text-white"
//               >
//                 Our Socials
//               </button>
//             </div>
//           </DisclosurePanel>

//           {/* Drawer panel */}
//           <Drawer open={drawerOpen} setOpen={setDrawerOpen} />
//         </>
//       )}
//     </Disclosure>
//   )
// }

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
    <Disclosure as="nav" aria-label="Global" className="absolute inset-x-0 top-0 z-50 bg-gray-800 dark:bg-gray-800/50">
      {({ open }) => (
        <>
          {/* Nav wrapper: full width on mobile */}
          <div className="w-full">
            {/* Inner container: full width on mobile, max-w-7xl on sm+ */}
            <div className="w-full sm:max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">

                {/* Mobile hamburger button */}
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                    <span className="sr-only">Open main menu</span>
                    <Bars3Icon className={classNames('h-6 w-6', open ? 'hidden' : 'block')} />
                    <XMarkIcon className={classNames('h-6 w-6', open ? 'block' : 'hidden')} />
                  </DisclosureButton>
                </div>

                {/* Logo + desktop links */}
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex shrink-0 items-center">
                    <img alt="ACBA" src={ACBALogo} width={32} height={32} className="h-8 w-auto" />
                  </div>

                  {/* Desktop links */}
                  <div className="hidden sm:ml-6 sm:flex space-x-4">
                    {navigation.map(item => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white dark:bg-gray-950/50' : 'text-gray-300 hover:bg-white/5 hover:text-white',
                          'rounded-md px-3 py-2 text-base font-medium'
                        )}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Right-most section: admin menu + desktop drawer */}
                <div className="flex items-center gap-2 sm:gap-4">
                  <AdminMenu />
                  {/* Desktop drawer button */}
                  <button
                    className="hidden sm:inline-flex rounded-md bg-gray-950/5 px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-950/10 dark:bg-white/10 dark:text-white"
                    onClick={() => setDrawerOpen(true)}
                  >
                    Our Socials
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu panel */}
          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map(item => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white dark:bg-gray-950/50' : 'text-gray-300 hover:bg-white/5 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                >
                  {item.name}
                </DisclosureButton>
              ))}

              {/* Mobile drawer button — only visible on mobile */}
              <button
                onClick={() => setDrawerOpen(true)}
                className="block sm:hidden w-full rounded-md bg-gray-950/5 px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-950/10 dark:bg-white/10 dark:text-white"
              >
                Our Socials
              </button>
            </div>
          </DisclosurePanel>

          {/* Drawer panel */}
          <Drawer open={drawerOpen} setOpen={setDrawerOpen} />
        </>
      )}
    </Disclosure>
  )
}
