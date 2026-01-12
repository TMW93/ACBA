import {useState} from 'react'
import Drawer from '../Drawer'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Auth from '../../utils/auth'
import ACBALogo from '/icons/acbaLogo.png'
import catbanner from '/placeholders/catbanner.jpg'

const navigation = [
  {
    name: 'Home', 
    href: '/',
    current: false,
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
    name: 'Merch', 
    href: '/merch',
    current: false,
  },
  // {
  //   name: 'Our Team',
  //   href: '/our-team',
  //   current: false,
  // },
  {
    name: 'Contact Us', 
    href: '/contact-us',
    current: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
};

export default function Nav() {
  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const adminNav = () => {
    if(Auth.loggedIn()) {
      return (
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 mr-4">
          {/* Profile dropdown */}
          <Menu as="div" className="relative ml-3">
            <MenuButton className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
              <span className="absolute -inset-1.5"/>
              <span className="sr-only">Open user menu</span>
              <img
                alt="acba-logo"
                src={catbanner}
                className="size-8 rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10"
              />
            </MenuButton>
            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg outline outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in dark:bg-gray-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10"
            >
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden dark:text-gray-300 dark:data-focus:bg-white/5"
                >
                  Your profile
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  href="/admin"
                  className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden dark:text-gray-300 dark:data-focus:bg-white/5"
                >
                  Admin
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  href="/"
                  className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden dark:text-gray-300 dark:data-focus:bg-white/5"
                  onClick={() => Auth.logout()}
                >
                  Sign out
                </a>
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
      );
    } else {
      // return (
      //   <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 mr-4">
      //     <a
      //     href='/login'
      //       className="relative rounded-full p-1 text-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500 dark:hover:text-white"
      //     >
      //       Sign In
      //     </a>   
      //   </div>
      // );
    }
  };

  return (
    <Disclosure
      as='nav'
      aria-label='Global'
      className="absolute inset-x-0 top-0 z-50 bg-gray-800 dark:bg-gray-800/50 dark:after:pointer-events-none dark:after:absolute dark:after:inset-x-0 dark:after:bottom-0 dark:after:h-px dark:after:bg-white/10"
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile Menu Button */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            {/* Logo */}
            <div className="flex shrink-0 items-center">
              <img
                alt="ACBA"
                src={ACBALogo}
                className="h-8 w-auto"
              />
            </div>
            {/* Navbar Items */}
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(item.current ? 'bg-gray-900 text-white dark:bg-gray-950/50' : 'text-gray-300 hover:bg-white/5 hover:text-white',
                      'rounded-md px-3 py-2 text-base font-medium',
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          {adminNav()}
          <Drawer/>
        </div>
      </div>
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current
                  ? 'bg-gray-900 text-white dark:bg-gray-950/50'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white',
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