import {useState} from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import iLoveSnow from '../assets/placeholders/ilovesnow.jpg'
import wideJiggling from '../assets/placeholders/wideJiggling.webp'
import 
{
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon, 
} from '@heroicons/react/20/solid'

const features = [
  {
    name: 'Cool Feature 1.',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Cool Feature 2.',
    description: 'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.',
    icon: LockClosedIcon,
  },
  {
    name: 'Cool Feature 3.',
    description: 'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
    icon: ServerIcon,
  },
]

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-white py-24 sm:py-32 dark:bg-gray-900">
      <Nav/>
      {/* Main Content */}
      <div className="flex-1 mx-auto max-w-7xl px-6 lg:px-8">
        <p className="max-w-2xl text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-6xl sm:text-balance dark:text-white">
          I love the snow
        </p>
        <div className="relative overflow-hidden pt-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <img
              alt="App screenshot"
              src={iLoveSnow}
              width={2432}
              height={1442}
              className="rounded-xl shadow-2xl ring-1 ring-gray-900/10 dark:hidden dark:ring-white/10"
            />
            <img
              alt="App screenshot"
              src={iLoveSnow}
              width={2432}
              height={1442}
              className="rounded-xl shadow-2xl ring-1 ring-gray-900/10 not-dark:hidden dark:ring-white/10"
            />
            <div aria-hidden="true" className="relative">
              <div className="absolute -inset-x-20 bottom-0 bg-linear-to-t from-white pt-[2%] dark:from-gray-900" />
            </div>
          </div>
        </div>
        {/* space */}
        <div className="mx-auto  mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pt-4 lg:pr-8">
            <div className="lg:max-w-lg">
              <h2 className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">Yeee Boi</h2>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
                Filler Text
              </p>
              <p className="mt-6 text-lg/8 text-gray-700 dark:text-gray-300">
                I need to write a 200 word essay by tomorrow, but I can't count to 100.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none dark:text-gray-400">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900 dark:text-white">
                      <feature.icon
                        aria-hidden="true"
                        className="absolute top-1 left-1 size-5 text-indigo-600 dark:text-indigo-400"
                      />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <img
            alt="Product screenshot"
            src={wideJiggling}
            width={2432}
            height={1442}
            className="w-3xl max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 not-dark:hidden sm:w-228 md:-ml-4 lg:-ml-0 dark:ring-white/10"
          />
          <img
            alt="Product screenshot"
            src={wideJiggling}
            width={2432}
            height={1442}
            className="w-3xl max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-228 md:-ml-4 lg:-ml-0 dark:hidden dark:ring-white/10"
          />
        </div>
        
      </div>
      <Footer/>
    </div>
  )
};

export default Home;