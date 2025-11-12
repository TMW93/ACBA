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
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl dark:text-white">{division.day}</h2>
        <h2 className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl dark:text-white">{division.name}</h2>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="mt-10 grid max-w-xl grid-cols-1 gap-8 text-base/7 text-gray-700 lg:max-w-none lg:grid-cols-2 dark:text-gray-300">
              {/* Standings */}
              <div className="block flex px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                  <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold text-gray-900 dark:text-white"></h1>
                  </div>
                </div>
                <div className="mt-8 flow-root">
                  <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                      <table className="relative min-w-full divide-y divide-gray-300 dark:divide-white/15">  
                        <thead>    
                          <tr>      
                            <th
                              scope="col"
                              className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0 dark:text-white"
                            >
                              Position
                            </th>      
                            <th scope="col">Team</th>      
                            <th scope="col">W</th>
                            <th scope="col">L</th>
                            <th scope="col">D</th>
                            <th scope="col">Games Played</th>
                            <th scope="col">TP</th>
                            <th scope="col">Points Behind</th>    
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
                  </div>
                </div>
              </div>
              {/* Games */}
              <div>
                {division.games.length > 0 && (
                  <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8"> 
                  <h2 className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl dark:text-white">Upcoming Games For {division.games[0].date}</h2>
                  {division.games.map((game) => (
                    <div key={game._id} className="overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
                      <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                        <p>{game.time}</p>
                        <p>{game.venue}</p>
                        <p>{game.teamOne} VS {game.teamTwo}</p>
                      </div>
                    </div>
                  ))}
                </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden pt-16 lg:pt-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {/* Past Games */}
            <div className="block max-w-xl flex px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                  <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold text-gray-900 dark:text-white"></h1>
                  </div>
                </div>
                <div className="mt-8 flow-root">
                  <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                      <table className="relative min-w-full divide-y divide-gray-300 dark:divide-white/15">  
                        <thead>    
                          <tr>      
                            <th
                              scope="col"
                              className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0 dark:text-white"
                            >
                              Position
                            </th>      
                            <th scope="col">Team</th>      
                            <th scope="col">W</th>
                            <th scope="col">L</th>
                            <th scope="col">D</th>
                            <th scope="col">Games Played</th>
                            <th scope="col">TP</th>
                            <th scope="col">Points Behind</th>    
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
                  </div>
                </div>
              </div>
          </div>                  
        </div>
      </div>
    </div>
  )
}

export default Div;