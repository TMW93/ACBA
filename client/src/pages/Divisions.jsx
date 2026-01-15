// import {useState, useEffect} from 'react';
// import Nav from "../components/Nav";
// import Footer from "../components/Footer";
// import {useQuery} from '@apollo/client/react'
// import {QUERY_ALL_DIVISIONS} from '../utils/queries'
// import {Link} from "react-router-dom";
// import ACBALogo from '/icons/acbaLogo.png?url'

// const Divisions = () => {

//   const {loading, error, data} = useQuery(QUERY_ALL_DIVISIONS);

//   if(loading) {
//     return null;
//   }

//   if(error) {
//     return `Error! ${error}`;
//   }

//   const divs = data?.allDivisions || [];
//   // console.log(divs);

//   //Sunday Divs
//   let sundayDivs = divs.filter(div => div.day.includes("Sunday"));
//   //Monday Divs
//   let mondayDivs = divs.filter(div => div.day.includes("Monday"));
//   //Tuesday Divs
//   let tuesdayDivs = divs.filter(div => div.day.includes("Tuesday"));
//   //Wednesday Divs
//   let wednesdayDivs = divs.filter(div => div.day.includes("Wednesday"));
//   //Thursday Divs
//   let thursdayDivs = divs.filter(div => div.day.includes("Thursday"));

//   // console.log(sundayDivs, mondayDivs, tuesdayDivs, wednesdayDivs, thursdayDivs);

//   return (
//     <div className="flex flex-col min-h-screen overflow-hidden bg-white py-24 sm:py-32 dark:bg-gray-900">
//       <Nav />
//       {/* Content */}
//       <div className="flex-1 -mt-10 mx-auto max-w-7xl px-6 lg:px-8">
//         <h1 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">Divisions</h1>
//         <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-4 md:max-w-2xl md:grid-cols-2 lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-5">
//           {/* Sunday Divs */}
//           <div>
//             <h2>Sunday</h2>
//             <h2>Divisions</h2>
//             <div className="mt-3">
//               {sundayDivs.map((div) => (
//                 <Link key={div._id} 
//                       className="block flex max-w-sm mb-3 p-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700
//                                   transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105"
//                       to={`/divisions/${div.slug}`}>
//                   <img className="w-full" src={ACBALogo} alt="acba logo"/>
//                   <div className="px-6 py-4 content-center">
//                     <div className="font-bold text-base text-center">{div.day}</div>
//                     <div className="font-bold text-base text-center">{div.name}</div>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </div>
//           {/* Monday Divs */}
//           <div>
//             <h2>Monday</h2>
//             <h2>Divisions</h2>
//             <div className="mt-3">
//               {mondayDivs.map((div) => (
//                 <Link key={div._id} 
//                       className="block max-w-sm mb-3 p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700
//                                   transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105"
//                       to={`/divisions/${div.slug}`}>
//                   <img className="w-full" src={ACBALogo} alt="acba logo"/>
//                   <div className="px-6 py-4">
//                     <div className="font-bold text-xl text-center">{div.day}</div>
//                     <div className="font-bold text-xl text-center">{div.name}</div>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </div>
//           {/* Tuesday Divs */}
//           <div>
//             <h2>Tuesday</h2>
//             <h2>Divisions</h2>
//             <div className="mt-3">
//               {tuesdayDivs.map((div) => (
//                 <Link key={div._id} 
//                       className="block max-w-sm mb-3 p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700
//                                   transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105"
//                       to={`/divisions/${div.slug}`}>
//                   <img className="w-full" src={ACBALogo} alt="acba logo"/>
//                   <div className="px-6 py-4">
//                     <div className="font-bold text-xl text-center">{div.day}</div>
//                     <div className="font-bold text-xl text-center">{div.name}</div>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </div>
//           {/* Wednesday Divs */}
//           <div>
//             <h2>Wednesday</h2>
//             <h2>Divisions</h2>
//             <div className="mt-3">
//               {wednesdayDivs.map((div) => (
//                 <Link key={div._id} 
//                       className="block max-w-sm mb-3 p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700
//                                   transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105"
//                       to={`/divisions/${div.slug}`}>
//                   <img className="w-full" src={ACBALogo} alt="acba logo"/>
//                   <div className="px-3 py-2">
//                     <div className="font-bold text-xl text-center">{div.day}</div>
//                     <div className="font-bold text-xl text-center">{div.name}</div>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </div>
//           {/* Thursday Divs */}
//           <div>
//             <h2>Thursday</h2>
//             <h2>Divisions</h2>
//             <div className="mt-3">
//             {thursdayDivs.map((div) => (
//               <Link key={div._id} 
//                     className="block flex max-w-sm mb-3 p-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700
//                                   transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105"
//                     to={`/divisions/${div.slug}`}>
//                 <img className="w-full" src={ACBALogo} alt="acba logo"/>
//                 <div className="px-3 py-2 content-center">
//                   <div className="font-bold text-base text-center">{div.day}</div>
//                   <div className="font-bold text-base text-center">{div.name}</div>
//                 </div>
//               </Link>
//             ))}
//             </div>
//           </div>  
//         </div>
//       </div>
//       <Footer/>
//     </div>
//   )
// };

// export default Divisions;

import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client/react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { QUERY_ALL_DIVISIONS } from '../utils/queries';
import ACBALogo from '/icons/acbaLogo.png?url';

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

      <main className="flex-1 mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white mb-12">
          Divisions
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {days.map(day => (
            <DayDivisions key={day} day={day} divisions={divisionsByDay[day]} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Reusable component for a day’s divisions
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
