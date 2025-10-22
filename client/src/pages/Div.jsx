import {useParams} from 'react-router-dom';
import {useQuery} from '@apollo/client/react';
import {QUERY_SINGLE_DIVISION} from '../../utils/queries';
import {useState} from 'react';

import Nav from "../components/Nav";

const Div = () => {
  const {divisionId} = useParams();

  const {loading, error, data} = useQuery(QUERY_SINGLE_DIVISION, {
    variables: {divisionId: divisionId},
  });

  if(loading) {
    return null;
  };

  if(error) {
    return `Error! ${error}`;
  };

  const division = data?.division || {};

  // console.log(division);

  return (
    <div>
      <Nav />
      <div>
        <h2>{division.day}</h2>
        <h2>{division.name}</h2>
        <div className='mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2'>
          <div className='flex p-px lg:col-span-4'>
            {/* Table */}
            <table className="table-auto border-separate border-spacing-2 border border-gray-400 dark:border-gray-500">  
              <thead>    
                <tr>      
                  <th>Position</th>      
                  <th>Team</th>      
                  <th>W</th>
                  <th>L</th>
                  <th>D</th>
                  <th>Games Played</th>
                  <th>TP</th>
                  <th>Points Behind</th>    
                </tr>  
              </thead>  
              <tbody>
                {division.teams.map((team, index) => (
                  <tr key={team._id}>
                    <td>{index + 1}</td>
                    <td>{team.name}</td>
                  </tr>
                ))}              
              </tbody>
            </table>
          </div>
          <div className='flex p-px lg:col-span-2'>
            <p>Upcoming Games</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Div;