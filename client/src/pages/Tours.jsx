import {useState, useEffect} from 'react';
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Divider from "../components/Divider";
import Snow from '/placeholders/ilovesnow.jpg?url'
import CatBanner from '/placeholders/ilovesnow.jpg?url'

const touredCountries = [
  {
    name: 'Malaysia, Singapore & Thailand',
    date: 1997,
  },
  {
    name: 'China',
    date: 1998,
  },
  {
    name: 'Malaysia and Vietnam',
    date: 1999,
  },
  {
    name: 'Thailand and Malaysia',
    date: 2001,
  },
  {
    name: 'China and Hong Kong',
    date: 2002,
  },
  {
    name: 'China and Malaysia',
    date: 2004,
  },
  {
    name: 'China and Japan',
    date: 2006,
  },
  {
    name: 'China, Macau, Hong Kong and Taiwan',
    date: 2008,
  },
  {
    name: 'Malaysia, Cambodia and Philippines',
    date: 2009,
  },
  {
    name: 'China',
    date: 2010,
  },
  {
    name: 'MABA International Basketball Invitation',
    date: 2017,
  },
];

const Tours = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // prevents forced layout before mount

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-white py-24 sm:py-32 dark:bg-gray-900">
      <Nav />
      <div className="flex-1 -mt-5 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl px-6 lg:max-w-7xl lg:px-8">
          <div className="grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {/* Content */}
          <div className="lg:pt-4 lg:pr-8">
            <div className="lg:max-w-lg">
              <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
                Tours
              </p>
              <p className="mt-6 text-lg/8 text-gray-700 dark:text-gray-300">
                2024 Easter Classic Tournament held in Sydney
              </p>
              <p className="mt-2 text-lg/8 text-gray-700 dark:text-gray-300">
                Date: 29/03/2024 - 01/04/2024
              </p>
              <p className="mt-2 text-lg/8 text-gray-700 dark:text-gray-300">
                June 2024 - Indonesia International under 23's Tournament comprising of 4 Nations. Tour date is 18/06 - 23/06/2024.
              </p>
              <p className="mt-6 text-lg/8 text-gray-700 dark:text-gray-300">
                Tryout details:
              </p>
              <p className="mt-2">
                Date: 4/02/2024
              </p>
              <p className="mt-2">
                Venue: Cumberland Uni
              </p>
              <p className="mt-2">
                Gate 2, East Street
              </p>
              <p className="mt-2">
                Lidcombe NSW
              </p>
              <p className="mt-2">
                Time: 1pm - 2.30pm
              </p>
              <p className="mt-8">
                Must have prior representative experience and be 23 years old and under in 2024.
              </p>
              <p className="mt-2">
                Malaysian/Singapore Tour: 06/09/2024 - 16/09/2024. Acba will visit provinces in these countries and play exhibition games whilst traveling and experience the cultures . The team has been selected from the previous tryouts.
              </p>
              <p className="mt-2">
                Please visit this page for up to date tours in 2024 - 2025.
              </p>
            </div>
          </div>
          {/* Images */}
          <div>
            {/* First Image */}
            <img
              alt="Product screenshot"
              src={Snow}
              width={2432}
              height={1442}
              className="w-3xl max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 not-dark:hidden sm:w-228 md:-ml-4 lg:-ml-0 dark:ring-white/10"
            />
            <img
              alt="Product screenshot"
              src={Snow}
              width={2432}
              height={1442}
              className="w-3xl max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-228 md:-ml-4 lg:-ml-0 dark:hidden dark:ring-white/10"
            />
            {/* Second Image */}
            <img
              alt="Product screenshot"
              src={CatBanner}
              width={2432}
              height={1442}
              className="w-3xl max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 not-dark:hidden sm:w-228 md:-ml-4 lg:-ml-0 dark:ring-white/10 mt-10"
            />
            <img
              alt="Product screenshot"
              src={CatBanner}
              width={2432}
              height={1442}
              className="w-3xl max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-228 md:-ml-4 lg:-ml-0 dark:hidden dark:ring-white/10 mt-10"
            />
          </div>         
          </div>
          {/* Content left side */}
          <div className="grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 mt-20">
            <div className="lg:pt-4 lg:pr-8">
              <div className="lg:max-w-lg">
                <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Histories of Acba Tours
                </h2>
                <p className="mt-6">
                  The end of year tour has been a staple of the ACBA calendar since 1998. These tours coincide with the annual World Invitation Basketball Tournament for Chinese, which is held in various locations around the world. While the tournament primarily features a veteran's team, the ACBA also brings their youth men's and women's teams along to play exhibition games against local teams.
                </p>
                <p className="mt-6">
                  For the youth players, these tours provide not only an opportunity to play against foreign basketball players, but also a cultural experience. The teams have the chance to visit famous tourist attractions in the host country and make new friends with players from different cultures.
                </p>
                <p className="mt-6">
                  The competition may be fierce on the court, but off the court, the teams are treated with respect and welcomed warmly. It is common for the youth teams to socialize with their opponents after the games, leading to lasting friendships and memorable cultural exchanges.
                </p>
              </div>
            </div>
            {/* Content right side */}
            <div className="lg:pt-4 lg:pr-8">
              <div className="lg:max-w-lg">
                <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  The countries ACBA have toured are:
                </h2>
                <ul role="list" className="divide-y divide-gray-100 dark:divide-white/5 mt-5">
                  {touredCountries.map((tour) => (
                    <li key={tour.date} className="flex justify-between gap-x-6 py-3">
                      <div className="min-w-0 flex-auto">
                        <span className="text-sm/6 text-gray-900 dark:text-white">{tour.date}</span>
                        <span> - </span>
                        <span className="text-sm/6 text-gray-900 dark:text-white">{tour.name}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
};

export default Tours;