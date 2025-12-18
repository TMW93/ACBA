import Nav from "../components/Nav";

import {useQuery} from '@apollo/client/react'
import {QUERY_ALL_DIVISIONS} from '../../utils/queries'
import {Link} from "react-router-dom";
import ACBALogo from '../assets/icons/acbaLogo.png'

const Divisions = () => {
  const {loading, error, data} = useQuery(QUERY_ALL_DIVISIONS);

  if(loading) {
    return null;
  }

  if(error) {
    return `Error! ${error}`;
  }

  const divs = data?.allDivisions || [];
  // console.log(divs);

  //Sunday Divs
  let sundayDivs = divs.filter(div => div.day.includes("Sunday"));
  //Monday Divs
  let mondayDivs = divs.filter(div => div.day.includes("Monday"));
  //Tuesday Divs
  let tuesdayDivs = divs.filter(div => div.day.includes("Tuesday"));
  //Wednesday Divs
  let wednesdayDivs = divs.filter(div => div.day.includes("Wednesday"));
  //Thursday Divs
  let thursdayDivs = divs.filter(div => div.day.includes("Thursday"));

  // console.log(sundayDivs, mondayDivs, tuesdayDivs, wednesdayDivs, thursdayDivs);

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <Nav />
      <h1>Divisions</h1>
      <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-4 md:max-w-2xl md:grid-cols-2 lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-5">
        {/* Sunday Divs */}
        <div>
          <h2>Sunday</h2>
          <h2>Divisions</h2>
          <div>
            {sundayDivs.map((div) => (
              <a key={div._id} 
                    className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700
                                transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
                    href={`/divisions/${div._id}`}>
                <img className="w-full" src={ACBALogo} alt="acba logo"/>
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2 text-center">{div.day}</div>
                  <div className="font-bold text-xl mb-2 text-center">{div.name}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
        {/* Monday Divs */}
        <div>
          <h2>Monday</h2>
          <h2>Divisions</h2>
          <div>
            {mondayDivs.map((div) => (
              <Link key={div._id} 
                    className="w-full rounded-2xl object-cover outline-1 -outline-offset-1 outline-black/5 dark:outline-white/10"
                    to={`/divisions/${div._id}`}>
                <img className="w-full" src={ACBALogo} alt="acba logo"/>
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2 text-center">{div.day}</div>
                  <div className="font-bold text-xl mb-2 text-center">{div.name}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {/* Tuesday Divs */}
        <div>
          <h2>Tuesday</h2>
          <h2>Divisions</h2>
          <div>
            {tuesdayDivs.map((div) => (
              <Link key={div._id} 
                    className="w-full rounded-2xl object-cover outline-1 -outline-offset-1 outline-black/5 dark:outline-white/10"
                    to={`/divisions/${div._id}`}>
                <img className="w-full" src={ACBALogo} alt="acba logo"/>
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2 text-center">{div.day}</div>
                  <div className="font-bold text-xl mb-2 text-center">{div.name}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {/* Wednesday Divs */}
        <div>
          <h2>Wednesday</h2>
          <h2>Divisions</h2>
          <div>
            {wednesdayDivs.map((div) => (
              <Link key={div._id} 
                    className="w-full rounded-2xl object-cover outline-1 -outline-offset-1 outline-black/5 dark:outline-white/10"
                    to={`/divisions/${div._id}`}>
                <img className="w-full" src={ACBALogo} alt="acba logo"/>
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2 text-center">{div.day}</div>
                  <div className="font-bold text-xl mb-2 text-center">{div.name}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {/* Thursday Divs */}
        <div>
          <h2>Thursday</h2>
          <h2>Divisions</h2>
          <div>
          {thursdayDivs.map((div) => (
            <Link key={div._id} 
                  className="w-full rounded-2xl object-cover outline-1 -outline-offset-1 outline-black/5 dark:outline-white/10"
                  to={`/divisions/${div._id}`}>
              <img className="w-full" src={ACBALogo} alt="acba logo"/>
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-center">{div.day}</div>
                <div className="font-bold text-xl mb-2 text-center">{div.name}</div>
              </div>
            </Link>
          ))}
          </div>
        </div>  
      </div>
    </div>
  )
};

export default Divisions;