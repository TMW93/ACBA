import Nav from "../components/Nav";

import {useQuery} from '@apollo/client/react'
import {QUERY_ALL_DIVISIONS} from '../../utils/queries'
import { useParams } from "react-router-dom";
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

  console.log(sundayDivs, mondayDivs, tuesdayDivs, wednesdayDivs, thursdayDivs);

  return (
    <div>
      <Nav />
      <h1>Divisions</h1>
      <div>
        {divs.map((div) => (
          <div key={div._id} className="max-w-sm rounded overflow-hidden shadow-lg">
            <img className="w-full" src={ACBALogo} alt="acba logo"/>
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{div.day}</div>
              <div className="font-bold text-xl mb-2">{div.name}</div>
            </div>
          </div>
        ))
        }
      </div>
    </div>
  )
};

export default Divisions;