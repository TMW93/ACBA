import {useState} from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Divider from '../components/Divider'
import iLoveSnow from '../assets/placeholders/ilovesnow.jpg'
import wideJiggling from '../assets/placeholders/wideJiggling.webp'
import catBanner from '../assets/placeholders/catbanner.jpg'
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
];

const autumnSeasonInfo = [
  {
    division: 'Sunday Social 10',
    startDate: '22/06/2025',
    gameTime: '11.00a.m - 3.30p.m'
  },
  {
    division: 'Sunday Pool A',
    startDate: '22/06/2025',
    gameTime: '9.45a.m - 12.30p.m'
  },
  {
    division: 'Sunday Pool B',
    startDate: '22/06/2025',
    gameTime: '9.45a.m - 12.30p.m'
  },
  {
    division: 'Sunday Division 8A & 8B',
    startDate: '22/06/2025',
    gameTime: '8.10a.m - 9a.m'
  },
  {
    division: 'Sunday Unisex 7',
    startDate: '23/03/2025',
    gameTime: '3.30p.m - 6:30p.m'
  },
  {
    division: 'Monday Social',
    startDate: '16/04/2025',
    gameTime: '6.50p.m - 10p.m'
  },
  {
    division: 'Monday Division 2',
    startDate: '16/06/2025',
    gameTime: '7p.m - 10p.m'
  },
  {
    division: 'Tuesday Social A & B',
    startDate: '07/07/2025',
    gameTime: '6.50p.m - 10p.m'
  },
  {
    division: 'Wednesday Division 3',
    startDate: '4/06/2025',
    gameTime: '7p.m - 8:40p.m'
  },
  {
    division: 'Thursday Social B',
    startDate: '22/05/25',
    gameTime: '7p.m - 10.15p.m'
  },
  {
    division: 'Thursday Social C',
    startDate: '29/05/2025',
    gameTime: '6:30p.m - 7:15p.m, One off 9:30p.m game'
  },
  {
    division: 'Thursday Unisex 7',
    startDate: '22/06/2025',
    gameTime: '7p.m - 9:30p.m'
  },
];

const summerSeasonInfo = [
  {
    division: 'Sunday Social 10',
    startDate: '09/02/2025',
    gameTime: '11.30a.m - 3.30p.m'
  },
  {
    division: 'Sunday Pool A',
    startDate: '09/02/2025',
    gameTime: '9.45a.m - 12.30p.m'
  },
  {
    division: 'Sunday Pool B',
    startDate: '09/02/2025',
    gameTime: '9.45a.m - 12.30p.m'
  },
  {
    division: 'Sunday Division 8A & 8B',
    startDate: '09/02/2025',
    gameTime: '8.10a.m - 9a.m'
  },
  {
    division: 'Sunday Unisex 7',
    startDate: '23/03/2025',
    gameTime: '4p.m - 6p.m'
  },
  {
    division: 'Monday Womens Social',
    startDate: '26/05/2025',
    gameTime: '7p.m - 8:40p.m'
  },
  {
    division: 'Monday Social',
    startDate: '03/02/2025',
    gameTime: '6.50p.m - 9:10p.m'
  },
  {
    division: 'Monday Division 3',
    startDate: '17/02/2025',
    gameTime: '7p.m - 9:25p.m'
  },
  {
    division: 'Monday Division 5',
    startDate: '10/02/2025',
    gameTime: '7p.m - 9:25p.m'
  },
  {
    division: 'Tuesday Social A & B',
    startDate: '12/03/2025',
    gameTime: '7p.m - 9:25p.m'
  },
  {
    division: 'Wednesday Division 5',
    startDate: '11/12/2024',
    gameTime: '7p.m - 9:25p.m'
  },
  {
    division: 'Wednesday Premier',
    startDate: '05/02/25',
    gameTime: '7p.m - 9:25p.m'
  },
  {
    division: 'Thursday Social A',
    startDate: '30/01/25',
    gameTime: '7p.m - 9:25p.m'
  },
  {
    division: 'Thursday Social B',
    startDate: '05/12/24',
    gameTime: '7p.m - 9:25p.m'
  },
  {
    division: 'Thursday Social C',
    startDate: '12/12/2024',
    gameTime: '6:30p.m - 7:15p.m'
  },
  {
    division: 'Thursday Unisex 7',
    startDate: '30/01/2025',
    gameTime: '7p.m - 9:25p.m'
  },
];

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-white py-24 sm:py-32 dark:bg-gray-900">
      <Nav/>
      {/* Main Content */}
      <div className="flex-1 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Content */}
        <div className="mx-auto max-w-7xl lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <p className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">08/07/2025</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
              New Monday Social C
            </h1>
            <p className="mt-6 text-xl/8 text-gray-700 dark:text-gray-300">
              🏀 New Monday Social C Season! 🏀
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:mt-10 lg:max-w-none lg:grid-cols-12">
            <div className="relative lg:order-last lg:col-span-5">
              <svg
                aria-hidden="true"
                className="absolute -top-160 left-1 -z-10 h-256 w-702 -translate-x-1/2 mask-[radial-gradient(64rem_64rem_at_111.5rem_0%,white,transparent)] stroke-gray-900/10 dark:stroke-white/10"
              >
                
                <rect fill="url(#e87443c8-56e4-4c20-9111-55b82fa704e3)" width="100%" height="100%" strokeWidth={0} />
              </svg>
              <figure className="border-l border-indigo-600 pl-8 dark:border-indigo-400">
                <img 
                  alt='catBanner'
                  src={catBanner}
                >
                </img>
              </figure>
            </div>
            <div className="max-w-xl text-base/7 text-gray-600 lg:col-span-7 dark:text-gray-400">
              <p>
                Dust off those basketball shoes - it's time to hit the court! 🙌
                Our new Monday Social C division kicks off on 22/09 at Auburn PCYC and it's perfect for players who love the game without the pressure. 💪
              </p>
              <p className="mt-8">
                Whether you're looking to stay active, have some fun, or just ball out with friends - this league is for you! 🏆
                Bring your crew, invite your fam - it's a social comp everyone can enjoy!
              </p>
            </div>
          </div>
        </div>
        <Divider/>
        {/* Content */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <p className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">17/06/2025</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
              2025 Autumn Season
            </h1>
          </div>
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow-sm outline-1 outline-black/5 sm:rounded-lg dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
                  <table className="relative min-w-full divide-y divide-gray-300 dark:divide-white/15">
                    <thead className="bg-gray-50 dark:bg-gray-800/75">
                      <tr>
                        <th scope="col" className="py-3.5 pr-3 pl-4 text-center text-sm font-semibold text-gray-900 sm:pl-6 dark:text-gray-200">
                          Division
                        </th>
                        <th scope="col" className="py-3.5 pr-3 pl-4 text-center text-sm font-semibold text-gray-900 sm:pl-6 dark:text-gray-200">
                          Start Date
                        </th>
                        <th scope="col" className="py-3.5 pr-3 pl-4 text-center text-sm font-semibold text-gray-900 sm:pl-6 dark:text-gray-200">
                          Game Times
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white dark:divide-white/10 dark:bg-gray-800/50">
                      {autumnSeasonInfo.map((info) => (
                        <tr key={info.division}>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6 dark:text-white">
                            {info.division}
                          </td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                            {info.startDate}
                          </td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                            {info.gameTime}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Divider/>
        {/* Content */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <p className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">04/01/2025</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
              2025 Summer Season
            </h1>
          </div>
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow-sm outline-1 outline-black/5 sm:rounded-lg dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
                  <table className="relative min-w-full divide-y divide-gray-300 dark:divide-white/15">
                    <thead className="bg-gray-50 dark:bg-gray-800/75">
                      <tr>
                        <th scope="col" className="py-3.5 pr-3 pl-4 text-center text-sm font-semibold text-gray-900 sm:pl-6 dark:text-gray-200">
                          Division
                        </th>
                        <th scope="col" className="py-3.5 pr-3 pl-4 text-center text-sm font-semibold text-gray-900 sm:pl-6 dark:text-gray-200">
                          Start Date
                        </th>
                        <th scope="col" className="py-3.5 pr-3 pl-4 text-center text-sm font-semibold text-gray-900 sm:pl-6 dark:text-gray-200">
                          Game Times
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white dark:divide-white/10 dark:bg-gray-800/50">
                      {summerSeasonInfo.map((info) => (
                        <tr key={info.division}>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6 dark:text-white">
                            {info.division}
                          </td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                            {info.startDate}
                          </td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                            {info.gameTime}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Divider/>
      </div>
      <Footer/>
    </div>
  )
};

export default Home;