import { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Divider from '../components/Divider';
import iLoveSnow from '/placeholders/ilovesnow.jpg?url';
import catBanner from '/placeholders/catbanner.jpg?url';

const autumnSeasonInfo = [
  { division: 'Sunday Social 10', startDate: '22/06/2025', gameTime: '11.00a.m - 3.30p.m' },
  { division: 'Sunday Pool A', startDate: '22/06/2025', gameTime: '9.45a.m - 12.30p.m' },
  { division: 'Sunday Pool B', startDate: '22/06/2025', gameTime: '9.45a.m - 12.30p.m' },
  { division: 'Sunday Division 8A & 8B', startDate: '22/06/2025', gameTime: '8.10a.m - 9a.m' },
  { division: 'Sunday Unisex 7', startDate: '23/03/2025', gameTime: '3.30p.m - 6:30p.m' },
  { division: 'Monday Social', startDate: '16/04/2025', gameTime: '6.50p.m - 10p.m' },
  { division: 'Monday Division 2', startDate: '16/06/2025', gameTime: '7p.m - 10p.m' },
  { division: 'Tuesday Social A & B', startDate: '07/07/2025', gameTime: '6.50p.m - 10p.m' },
  { division: 'Wednesday Division 3', startDate: '4/06/2025', gameTime: '7p.m - 8:40p.m' },
  { division: 'Thursday Social B', startDate: '22/05/25', gameTime: '7p.m - 10.15p.m' },
  { division: 'Thursday Social C', startDate: '29/05/2025', gameTime: '6:30p.m - 7:15p.m, One off 9:30p.m game' },
  { division: 'Thursday Unisex 7', startDate: '22/06/2025', gameTime: '7p.m - 9:30p.m' },
];

const summerSeasonInfo = [
  { division: 'Sunday Social 10', startDate: '09/02/2025', gameTime: '11.30a.m - 3.30p.m' },
  { division: 'Sunday Pool A', startDate: '09/02/2025', gameTime: '9.45a.m - 12.30p.m' },
  { division: 'Sunday Pool B', startDate: '09/02/2025', gameTime: '9.45a.m - 12.30p.m' },
  { division: 'Sunday Division 8A & 8B', startDate: '09/02/2025', gameTime: '8.10a.m - 9a.m' },
  { division: 'Sunday Unisex 7', startDate: '23/03/2025', gameTime: '4p.m - 6p.m' },
  { division: 'Monday Womens Social', startDate: '26/05/2025', gameTime: '7p.m - 8:40p.m' },
  { division: 'Monday Social', startDate: '03/02/2025', gameTime: '6.50p.m - 9:10p.m' },
  { division: 'Monday Division 3', startDate: '17/02/2025', gameTime: '7p.m - 9:25p.m' },
  { division: 'Monday Division 5', startDate: '10/02/2025', gameTime: '7p.m - 9:25p.m' },
  { division: 'Tuesday Social A & B', startDate: '12/03/2025', gameTime: '7p.m - 9:25p.m' },
  { division: 'Wednesday Division 5', startDate: '11/12/2024', gameTime: '7p.m - 9:25p.m' },
  { division: 'Wednesday Premier', startDate: '05/02/25', gameTime: '7p.m - 9:25p.m' },
  { division: 'Thursday Social A', startDate: '30/01/25', gameTime: '7p.m - 9:25p.m' },
  { division: 'Thursday Social B', startDate: '05/12/24', gameTime: '7p.m - 9:25p.m' },
  { division: 'Thursday Social C', startDate: '12/12/2024', gameTime: '6:30p.m - 7:15p.m' },
  { division: 'Thursday Unisex 7', startDate: '30/01/2025', gameTime: '7p.m - 9:25p.m' },
];

const Home = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen w-full overflow-hidden bg-white dark:bg-gray-900 pt-14 sm:pt-14">
      <Nav />
      {/* Main Content */}
      <div className="flex-1 w-full">
        {/* Top Content */}
        <section className="mx-auto max-w-7xl px-6 lg:px-8 mt-20 mb-10">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:ml-auto lg:pt-4 lg:pl-4">
              <div className="lg:max-w-lg">
                <h2 className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">11/01/2026</h2>
                <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
                  New Sunday Social Beginners Competition
                </p>
                <p className="mt-10 text-base/7 text-gray-600 lg:col-span-7 dark:text-gray-400">
                  ACBA will be launching a new Sunday Social Beginners Competition starting in late February. Games are at Cumberland University (Lidcombe) from 6pm - 8pm. 
                  It's a great way to enjoy a social game, get some exercise, and have fun with light cardio.
                </p>
                <p className="mt-6 text-base/7 text-gray-600 lg:col-span-7 dark:text-gray-400">
                  Teams and individual players are welcome. For more information, please email info@acba.com.au
                </p>
              </div>
            </div>
            <div className="flex items-start justify-end lg:order-first">
              <img
                alt="Sunday Social Beginners Image"
                src={iLoveSnow}
                width={2432}
                height={1442}
                className="w-3xl max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-228 dark:hidden dark:ring-white/10"
              />
              <img
                alt="Sunday Social Beginners Image"
                src={iLoveSnow}
                width={2432}
                height={1442}
                className="w-3xl max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 not-dark:hidden sm:w-228 dark:ring-white/10"
              />
            </div>
          </div>
        </section>
        <Divider />

        {/* New Monday Social C */}
        <section className="mx-auto max-w-7xl px-6 lg:px-8 mt-5 mb-5">
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
                <defs>
                  <pattern
                    id="e87443c8-56e4-4c20-9111-55b82fa704e3"
                    width={200}
                    height={200}
                    patternUnits="userSpaceOnUse"
                  >
                    <path d="M0.5 0V200M200 0.5L0 0.499983" />
                  </pattern>
                </defs>
                <rect fill="url(#e87443c8-56e4-4c20-9111-55b82fa704e3)" width="100%" height="100%" strokeWidth={0} />
              </svg>
              <figure className="border-l border-indigo-600 pl-8 dark:border-indigo-400">
                <img
                  alt="monday social c image"
                  className="object-cover rounded-xl"
                  src={catBanner}
                />
              </figure>
            </div>
            <div className="max-w-xl text-base/7 text-gray-600 lg:col-span-7 dark:text-gray-400">
              <p>
                Dust off those basketball shoes - it's time to hit the court! 🙌 Our new Monday Social C division 
                kicks off on 22/09 at Auburn PCYC and it's perfect for players
                who love the game without the pressure. 💪
              </p>
              <p className="mt-8">
                Whether you're looking to stay active, have some fun, or just ball out with friends
                - this league is for you! 🏆 Bring your crew, invite your fam - it's a social comp
                everyone can enjoy!
              </p>
            </div>
          </div>
        </section>
        <Divider/>

        {/* Seasons */}
        <SeasonTable title="2025 Autumn Season" data={autumnSeasonInfo} />
        <Divider />

        <SeasonTable title="2025 Summer Season" data={summerSeasonInfo} />
        <Divider />
      </div>

      <Footer />
    </div>
  );
};

// Table component
function SeasonTable({ title, data }) {
  return (
  <section className="px-4 sm:px-6 lg:px-8 mt-5 mb-5">
    <div className="sm:flex sm:items-center">
      <div className="sm:flex-auto">
        <h1 className="text-base font-semibold text-gray-900 dark:text-white">{title}</h1>
        <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">
          Information for the {title}
        </p>
      </div>  
    </div>
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow-sm outline-1 outline-black/5 sm:rounded-lg dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
            <table className="relative min-w-full divide-y divide-gray-300 dark:divide-white/15">
              <thead className="bg-gray-50 dark:bg-gray-800/75">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pr-3 pl-4 text-center text-sm font-semibold text-gray-900 sm:pl-6 dark:text-gray-200"
                  >
                    Division
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 dark:text-gray-200"
                  >
                    Start Date
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 dark:text-gray-200"
                  >
                    Game Times
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-white/10 dark:bg-gray-800/50">
                {data.map((info) => (
                  <tr key={info.division}>
                    <td className="py-4 pr-3 pl-4 text-center text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6 dark:text-white">
                      {info.division}
                    </td>
                    <td className="px-3 py-4 text-center text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                      {info.startDate}
                    </td>
                    <td className="px-3 py-4 text-center text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
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
  </section>
  );
}


export default Home;
