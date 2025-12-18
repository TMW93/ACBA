import {useState} from 'react'
import { Disclosure, DisclosureButton, DisclosurePanel} from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import ACBALogo from '../../assets/icons/acbaLogo.png'

const navigation = [
  {
    name: 'Home', 
    href: '/',
    current: true,
  },
  {
    name: 'Divisions', 
    href: '/divisions',
    current: false,
  },
  {
    name: 'Tours', 
    href: '/tours',
    current: false,
  },
  {
    name: 'Team Registration', 
    href: '/team-registration',
    current: false,
  },
  {
    name: 'Contact Us', 
    href: '/contact-us',
    current: false,
  },
  {
    name: 'Admin', 
    href: '/admin',
    current: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
};

export default function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <Disclosure
      as='nav'
      className="absolute inset-x-0 top-0 z-50 bg-gray-800 dark:bg-gray-800/50 dark:after:pointer-events-none dark:after:absolute dark:after:inset-x-0 dark:after:bottom-0 dark:after:h-px dark:after:bg-white/10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className='flex'>
            <div className="mr-2 -ml-2 flex items-center md:hidden">
              {/* Mobile Menu Button */}
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
              </DisclosureButton>
            </div>
            {/* Navbar Icon */}
            <div className="flex shrink-0 items-center">
              <img
                alt='ACBA Logo'
                src={ACBALogo}
                className='h-8 w-auto'
              />
            </div>
            {/* Navbar Items */}
            <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  aria-current={item.current ? 'page' : undefined}
                  className={classNames(item.current ? 'bg-gray-900 text-white dark:bg-gray-950/50' : 'text-gray-300 hover:bg-white/5 hover:text-white',
                    'rounded-md px-3 py-2 text-sm font-medium',
                  )}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel>
        <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as='a'
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(item.current ? 'bg-gray-900 text-white dark:bg-gray-950/50' : 'text-gray-300 hover:bg-white/5 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
};