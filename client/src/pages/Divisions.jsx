import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client/react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { QUERY_ALL_DIVISIONS } from '../utils/queries';
import ACBALogo from '/icons/acbaLogo.png?url';
import Divider from '../components/Divider';

export default function Divisions() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { loading, error, data } = useQuery(QUERY_ALL_DIVISIONS);

  if (!mounted) return null; // prevent forced layout before hydration
  if (loading) return null;
  if (error) return <p>Error! {error.message}</p>;

  const divs = data?.allDivisions || [];

  // Group divisions by day
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
  const divisionsByDay = days.reduce((acc, day) => {
    acc[day] = divs.filter(div => div.day.includes(day));
    return acc;
  }, {});

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 overflow-hidden">
      <Nav />
      <main className="flex-1 w-full px-6 lg:px-8 py-24 sm:py-32">
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white mb-12">
          Divisions
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {days.map(day => (
            <DayDivisions key={day} day={day} divisions={divisionsByDay[day]} />
          ))}
        </div>
      </main>
      <Divider/>
      <Footer />
    </div>
  );
}

// Card Component
function DayDivisions({ day, divisions }) {
  if (!divisions || divisions.length === 0) return null;

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">{day}</h2>
      <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-4">Divisions</h3>

      <div className="space-y-4">
        {divisions.map(div => (
          <Link
            key={div._id}
            to={`/divisions/${div.slug}`}
            className="block bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700
                       transition-transform duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          >
            <img
              src={ACBALogo}
              alt="ACBA Logo"
              width={300}
              height={150}
              className="w-full h-auto rounded-t-lg"
            />
            <div className="px-4 py-3 text-center">
              <div className="font-bold text-base text-gray-900 dark:text-white">{div.day}</div>
              <div className="font-bold text-base text-gray-700 dark:text-gray-300">{div.name}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
