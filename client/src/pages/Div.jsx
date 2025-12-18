import {useParams} from 'react-router-dom';
import {useQuery} from '@apollo/client/react';
import {QUERY_SINGLE_DIVISION} from '../../utils/queries';
import {useState} from 'react';
import quickSortStandings from '../../utils/quickSortStandings'
import ACBALogo from '../assets/icons/acbaLogo.png'
import wideJiggle from '../assets/placeholders/widejiggling.webp'

import Nav from "../components/Nav";

const Div = () => {
  const {divisionId} = useParams();
  let sortedTeams = [];

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

  if(division) {
    sortedTeams = quickSortStandings(division.teams);
    console.log(sortedTeams);
  }

  return (
    <div>
      <Nav />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl dark:text-white">{division.day}</h2>
        <h2 className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl dark:text-white">{division.name}</h2>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            {/* Standings */}
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
                            Pos
                          </th>
                          <th
                            scope="col"
                            className="py-3.5 pr-3 pl-4 text-center text-sm font-semibold text-gray-900 sm:pl-6 dark:text-gray-200"
                          >
                            Team
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 dark:text-gray-200"
                          >
                            Wins
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 dark:text-gray-200"
                          >
                            Losses
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 dark:text-gray-200"
                          >
                            Draws
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 dark:text-gray-200"
                          >
                            Total Points
                          </th>
                          <th scope="col" className="py-3.5 pr-4 pl-3 sm:pr-6">
                            <span className="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white dark:divide-white/10 dark:bg-gray-800/50">
                        {sortedTeams.map((team, index) => (
                          <tr key={team._id}>
                            <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6 dark:text-white">
                              {index + 1}
                            </td>
                            <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6 dark:text-white">
                              {team.name}
                            </td>
                            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                              {team.wins}
                            </td>
                            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                              {team.losses}
                            </td>
                            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                              {team.draws}
                            </td>
                              <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                              {team.totalPoints}
                            </td>
                            <td className="py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-6">
                              <a
                                href="#"
                                className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                              >
                                Edit<span className="sr-only">, {team._id}</span>
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-1 gap-8 text-base/7 text-gray-700 lg:max-w-none lg:grid-cols-2 dark:text-gray-300">
              {/* Games */}
              <div>
                {division.games.length > 0 && (
                  <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8"> 
                  <h2 className="mx-auto mt-2  mb-5 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl dark:text-white">Upcoming Games For {division.games[0].date}</h2>
                  {division.games.map((game) => (
                    <div key={game._id} className="divide-y divide-gray-200 overflow-hidden mb-5 rounded-lg bg-white shadow-sm dark:divide-white/10 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
                      <div className="bg-gray-50 px-4 py-5 sm:px-6 dark:bg-gray-800/50">
                        <p>{game.time}</p>
                        <p>{game.venue}</p>
                      </div>
                      <div className="bg-gray-50 px-4 py-5 sm:p-6 dark:bg-gray-800/50">
                        <span>{game.teamOne}</span>
                        <span> VS </span>
                        <span>{game.teamTwo}</span>
                      </div>
                    </div>
                  ))}
                </div>
                )}
              </div>
              <div>
                <img
                  alt=""
                  src={wideJiggle}
                  className="h-auto w-auto dark:hidden"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Past Games */}
        <div className="relative overflow-hidden pt-16 lg:pt-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
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
                              Date
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-centertext-sm font-semibold text-gray-900 dark:text-gray-200"
                            >
                              Winner
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 dark:text-gray-200"
                            >
                              Final Score
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 dark:text-gray-200"
                            >
                              Loser
                            </th>
                            <th scope="col" className="py-3.5 pr-4 pl-3 sm:pr-6">
                              <span className="sr-only">Edit</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white dark:divide-white/10 dark:bg-gray-800/50">
                          {division.playedGames.map((game) => (
                            <tr key={game._id}>
                              <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6 dark:text-white">
                                {game.date}
                              </td>
                              <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                                {game.winner}
                              </td>
                              <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                                {game.scoreWinner} - {game.scoreLoser}
                              </td>
                              <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                                {game.loser}
                              </td>
                              <td className="py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-6">
                                <a
                                  href="#"
                                  className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                >
                                  Edit<span className="sr-only">, {game._id}</span>
                                </a>
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
        </div>
      </div>
    </div>
  )
}

export default Div;