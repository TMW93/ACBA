import Nav from "../components/Nav";
import Footer from "../components/Footer";
import {useParams} from 'react-router-dom';
import {useQuery, useLazyQuery} from '@apollo/client/react';
import {QUERY_SINGLE_DIVISION, QUERY_DIVISION_BY_SLUG, QUERY_SINGLE_TEAM, QUERY_SINGLE_GAME} from '../utils/queries';
import Auth from '../utils/auth'
import {useEffect, useState} from 'react';
import quickSortStandings from '../utils/quickSortStandings'
import DuragCat from '../assets/placeholders/duragCat.jpg'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, FocusTrap } from '@headlessui/react'

const tableHeaders = [
  {
    name: 'Pos',
  },
  {
    name: 'Team',
  },
  {
    name: 'Wins',
  },
  {
    name: 'Losses',
  },
  {
    name: 'Draws',
  },
  {
    name: 'Total Points',
  }
];

const archiveHeaders = [
  {
    name: 'Date',
  },
  {
    name: 'Winner',
  },
  {
    name: 'Final Score',
  },
  {
    name: 'Loser',
  }
];

const Div = () => {
  const {slug} = useParams();
  const [currentTeam, setTeamState] = useState('');
  const [currentGame, setGameState] = useState('');
  const [currentMode, setModeState] = useState('');
  const [loadingTeam, setLoadingTeam] = useState(true);
  const [loadingGame, setLoadingGame] = useState(true);
  const [team, setTeam] = useState();
  const [game, setGame] = useState();
  const [open, setOpen] = useState(false);
  const [teamFormState, setTeamFormState] = useState({
    name: '',
    wins: '',
    losses: '',
    totalPoints: ''
  });
  const [gameFormState, setGameFormState] = useState({
    scoreWinner: '',
    scoreLoser: '',
    date: '',
    Winner: '',
    Loser: '',
  });
  let sortedTeams = [];

  const [teamQuery, {loadingSingleTeam, errorSingleTeam, dataSingleTeam}] = useLazyQuery(QUERY_SINGLE_TEAM);
  const [gameQuery, {loadingSingleGame, errorSingleGame, dataSingleGame}] = useLazyQuery(QUERY_SINGLE_GAME);
  const {loading, error, data} = useQuery(QUERY_DIVISION_BY_SLUG, {
    variables: {slug: slug},
  });

  // Game useEffect
  useEffect(() => {
    setLoadingGame(true);
    const selectedGame = async () => {
      if(currentGame) {
        const gameInfo = await gameQuery({variables: {gameId: currentGame}});
        if(gameInfo) {
          // console.log(gameInfo.data.game);
          setGame({
            date: gameInfo.data.game.date,
            winner: gameInfo.data.game.winner,
            loser: gameInfo.data.game.loser,
            scoreWinner: gameInfo.data.game.scoreWinner,
            scoreLoser: gameInfo.data.game.scoreLoser,
            teamOne: gameInfo.data.game.teamOne,
            teamTwo: gameInfo.data.game.teamTwo,
          });
          setGameFormState({
            date: gameInfo.data.game.date,
            winner: gameInfo.data.game.winner,
            loser: gameInfo.data.game.loser,
            scoreWinner: gameInfo.data.game.scoreWinner,
            scoreLoser: gameInfo.data.game.scoreLoser,
          });
          setLoadingGame(false);
        }
        console.log(game);
      }
    }
    selectedGame();
  }, [currentGame]);

  // Team useEffect
  useEffect(() => {
    setLoadingTeam(true);
    const selectedTeam = async () => {
      if(currentTeam) {
        const teamInfo = await teamQuery({variables: {teamId: currentTeam}});
        if(teamInfo) {
          // console.log(teamInfo.data.teamById);
          setTeam({
            teamId: teamInfo.data.teamById._id,
            name: teamInfo.data.teamById.name,
            wins: teamInfo.data.teamById.wins,
            losses: teamInfo.data.teamById.losses,
            draws: teamInfo.data.teamById.draws,
            totalPoints: teamInfo.data.teamById.totalPoints,
          });
          setTeamFormState({
            name: teamInfo.data.teamById.name,
            wins: teamInfo.data.teamById.wins,
            losses: teamInfo.data.teamById.losses,
            draws: teamInfo.data.teamById.draws,
            totalPoints: teamInfo.data.teamById.totalPoints,
          })
          setLoadingTeam(false);
        }
        // console.log(team);
      }
    }
    selectedTeam();
  }, [currentTeam]);

  if(loading) {
    return null;
  };

  if(error) {
    return `Error! ${error}`;
  };

  const division = data?.divisionBySlug || {};
  // console.log(division);  

  if(division) {
    sortedTeams = quickSortStandings(division.teams);
    // console.log(sortedTeams);
  }

  const closeModal = () => {
    setOpen(false);
  };

  const handleTeamClick = async (teamId) => {
    setOpen(true);
    setTeamState(teamId);
    setModeState('team');
    // console.log(teamId);
    // console.log('im clicked');
  };

  const handleGameClick = async (gameId) => {
    setOpen(true);
    setGameState(gameId);
    setModeState('game');
    // console.log(currentGame);
    // console.log('im clicked');
  };

  const handleTeamFormChange = (e) => {
    const {name, value} = e.target;
    setTeamFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleGameFormChange = (e) => {
    const {name, value} = e.target;
    setTeamFormState({
      ...formState,
      [name]: value,
    });
  };

  const adminTableHeaders = () => {
    if(Auth.loggedIn()) {
      return (
        <tr>
          {tableHeaders.map((header, index) => (
            <th
              key={index}
              scope="col"
              className="py-3.5 pr-3 pl-4 text-center text-sm font-semibold text-gray-900 sm:pl-6 dark:text-gray-200"
            >
              {header.name}
            </th>
          ))}
          <th scope="col" className="py-3.5 pr-4 pl-3 sm:pr-6">
            <span className="sr-only">Edit</span>
          </th>
        </tr>
      );
    } else {
      return (
        <tr>
          {tableHeaders.map((header, index) => (
            <th
              key={index}
              scope="col"
              className="py-3.5 pr-3 pl-4 text-center text-sm font-semibold text-gray-900 sm:pl-6 dark:text-gray-200"
            >
              {header.name}
            </th>
          ))}
        </tr>
      );
    }
  };

  const adminTableContent = () => {
    if(Auth.loggedIn()) {
      return (
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
              <td 
                className="py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-6"
                
              >
                <p
                  className="text-indigo-600 cursor-pointer hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                  onClick={() => handleTeamClick(team._id)}  
                >
                  Edit<span className="sr-only">, {team._id}</span>
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      );
    } else {
      return (
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
            </tr>
          ))}
        </tbody>
      );
    }
  };

  const adminArchiveHeaders = () => {
    if(Auth.loggedIn()) {
      return (
        <tr>
          {archiveHeaders.map((header, index) => (
            <th
              key={index}
              scope="col"
              className="py-3.5 pr-3 pl-4 text-center text-sm font-semibold text-gray-900 sm:pl-6 dark:text-gray-200"
            >
              {header.name}
            </th>
          ))}
          <th scope="col" className="py-3.5 pr-4 pl-3 sm:pr-6">
            <span className="sr-only">Edit</span>
          </th>
        </tr>
      )
    } else {
      return (
        <tr>
          {archiveHeaders.map((header, index) => (
            <th
              key={index}
              scope="col"
              className="py-3.5 pr-3 pl-4 text-center text-sm font-semibold text-gray-900 sm:pl-6 dark:text-gray-200"
            >
              {header.name}
            </th>
          ))}
        </tr>
      )
    }
  };

  const adminArchiveContent = () => {
    if(Auth.loggedIn()) {
      return (
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
                <p
                  className="text-indigo-600 cursor-pointer hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                  onClick={() => handleGameClick(game._id)}
                >
                  Edit<span className="sr-only">, {game._id}</span>
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      );
    } else {
      return (
        <tbody className="divide-y divide-gray-200 bg-white dark:divide-white/10 dark:bg-gray-800/50">
          {division.playedGames.map((game) => (
            <tr key={game._id}>
              <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6 dark:text-white">
                {game.name}
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
            </tr>
          ))}
        </tbody>
      );
    }
  };

  const teamUpdateForm = () => {
    if(team !== undefined) {
      return (
        <form className="mx-auto mt-16 max-w-xl sm:mt-20">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <h2 className="text-base/7 font-semibold text-gray-900 dark:text-white">Update Team Info</h2>
            {/* Team Name */}
            <div className="sm:col-span-2">
              <label htmlFor="divisionlabel" className="block text-sm/6 font-semibold text-gray-900 dark:text-white">
                Team Name
              </label>
              <div className="mt-2 grid grid-cols-1">
                <input
                  id="teamName"
                  type="teamName"
                  name="teamName"
                  defaultValue={team.name}
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                  onChange={handleTeamFormChange}            
                />
              </div>
            </div>
            {/* Wins */}
            <div className="sm:col-span-2">
              <label htmlFor="gameselectlabel" className="block text-sm/6 font-semibold text-gray-900 dark:text-white">
                Wins
              </label>
              <div className="mt-2 grid grid-cols-1">
                <input
                  id="wins"
                  type="number"
                  name="wins"
                  defaultValue={team.wins}
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                  onChange={handleTeamFormChange}            
                />
              </div>
            </div>
            {/* Losses */}
            <div className="sm:col-span-2">
              <label htmlFor="gameselectlabel" className="block text-sm/6 font-semibold text-gray-900 dark:text-white">
                Losses
              </label>
              <div className="mt-2 grid grid-cols-1">
                <input
                  id="losses"
                  type="number"
                  name="losses"
                  defaultValue={team.losses}
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                  onChange={handleTeamFormChange}            
                />
              </div>
            </div>
            {/* Draws */}
            <div className="sm:col-span-2">
              <label htmlFor="gameselectlabel" className="block text-sm/6 font-semibold text-gray-900 dark:text-white">
                Draws
              </label>
              <div className="mt-2 grid grid-cols-1">
                <input
                  id="draws"
                  type="number"
                  name="draws"
                  defaultValue={team.draws}
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                  onChange={handleTeamFormChange}            
                />
              </div>
            </div>
            {/* Total Points */}
            <div className="sm:col-span-2">
              <label htmlFor="gameselectlabel" className="block text-sm/6 font-semibold text-gray-900 dark:text-white">
                Total Points
              </label>
              <div className="mt-2 grid grid-cols-1">
                <input
                  id="ttp"
                  type="number"
                  name="ttp"
                  defaultValue={team.totalPoints}
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                  onChange={handleTeamFormChange}            
                />
              </div>
            </div>
          </div>
          {/* Submit Button */}
          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-black shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
            >
              Update Team Info
            </button>
          </div>
          {/* Cancel Button */}
          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-black shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </form>
      )
    } else {
      return (
        <p>There was an error in loading the form...</p>
      )
    }
  };

  const gameUpdateForm = () => {
    if(division.playedGames.length > 0) {
      if(game !== undefined) {
        return (
          <form className="mx-auto mt-16 max-w-xl sm:mt-20">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <h2 className="text-base/7 font-semibold text-gray-900 dark:text-white">Update Game Info</h2>
              {/* Date */}
              <div className="sm:col-span-2">
                <label htmlFor="divisionlabel" className="block text-sm/6 font-semibold text-gray-900 dark:text-white">
                  Date
                </label>
                <div className="mt-2 grid grid-cols-1">
                  <input
                    id="gameDate"
                    type="gameDate"
                    name="gameDate"
                    defaultValue={game.date}
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                    onChange={handleGameFormChange}            
                  />
                </div>
              </div>
              {/* Winner */}
              <div className="sm:col-span-2">
                <label htmlFor="gameselectlabel" className="block text-sm/6 font-semibold text-gray-900 dark:text-white">
                  Winner
                </label>
                <div className="mt-2 grid grid-cols-1">
                  <select
                    id="winner"
                    name="winner"
                    type="winner"
                    defaultValue={game.winner}
                  >
                    <option value={game.teamOne}>{game.teamOne}</option>
                    <option value={game.teamtwo}>{game.teamTwo}</option>
                  </select>
                </div>
              </div>
              {/* Loser */}
              <div className="sm:col-span-2">
                <label htmlFor="gameselectlabel" className="block text-sm/6 font-semibold text-gray-900 dark:text-white">
                  Loser
                </label>
                <div className="mt-2 grid grid-cols-1">
                  <select
                    id="loser"
                    name="loser"
                    type="loser"
                    defaultValue={game.loser}
                  >
                    <option value={game.teamOne}>{game.teamOne}</option>
                    <option value={game.teamtwo}>{game.teamTwo}</option>
                  </select>
                </div>
              </div>
              {/* Score Winner */}
              <div className="sm:col-span-2">
                <label htmlFor="gameselectlabel" className="block text-sm/6 font-semibold text-gray-900 dark:text-white">
                  Winner's Score
                </label>
                <div className="mt-2 grid grid-cols-1">
                  <input
                    id="scoreWinner"
                    type="number"
                    name="scoreWinner"
                    defaultValue={game.scoreWinner}
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                    onChange={handleGameFormChange}            
                  />
                </div>
              </div>
              {/* Score Loser */}
              <div className="sm:col-span-2">
                <label htmlFor="gameselectlabel" className="block text-sm/6 font-semibold text-gray-900 dark:text-white">
                  Loser's Score
                </label>
                <div className="mt-2 grid grid-cols-1">
                  <input
                    id="ttp"
                    type="number"
                    name="ttp"
                    defaultValue={game.scoreLoser}
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                    onChange={handleGameFormChange}            
                  />
                </div>
              </div>
            </div>
            {/* Submit Button */}
            <div className="mt-10">
              <button
                type="submit"
                className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-black shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
              >
                Update Game Info
              </button>
            </div>
            {/* Cancel Button */}
            <div className="mt-10">
              <button
                type="submit"
                className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-black shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </form>
        );
      }
    } else if (division.playedGames.length === 0) {
      <p>No games have been played.</p>
    } else {
      return (
        <p>There was a problem in loading the form...</p>
      );
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-white py-24 sm:py-32 dark:bg-gray-900">
      <Nav />
      {/* Content */}
      <div className="-mt-10 mx-auto flex-1 max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl dark:text-white">{division.day}</h2>
        <h2 className="mt-2 text-center text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl dark:text-white">{division.name}</h2>
        <div className="max-w-2xl lg:mx-0 lg:max-w-none">
          {/* Standings */}
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow-sm outline-1 outline-black/5 sm:rounded-lg dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
                  <table className="relative min-w-full divide-y divide-gray-300 dark:divide-white/15">
                    <thead className="bg-gray-50 dark:bg-gray-800/75">
                      {adminTableHeaders()}
                    </thead>
                    {adminTableContent()}
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* Games & Images */}
          <div className="mt-10 grid max-w-xl grid-cols-1 gap-8 text-base/7 text-gray-700 lg:max-w-none lg:grid-cols-2 dark:text-gray-300">
            <div>
              <h2 className="mt-2 mb-5 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl dark:text-white">Upcoming Games</h2>
              {division.games.length > 0 && (
                <div> 
                <h2 className="mx-auto mt-2  mb-5 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl dark:text-white">{division.games[0].date}</h2>
                {division.games.map((game) => (
                  <div key={game._id} className="max-w-sm rounded overflow-hidden shadow-lg mb-10">
                    <div className="px-6 py-4">
                      <div className="font-bold text-xl">
                        {game.time}
                      </div>
                      <div className="font-bold text-xl mb-2">
                        {game.venue}
                      </div>
                      <p className="text-gray-700 text-base">
                        <span>{game.teamOne}</span>
                        <span> VS </span>
                        <span>{game.teamTwo}</span>
                      </p>
                    </div>
                  </div>
                ))}
                </div>
              )}
            </div>
            {/* Images */}
            <div>
              <img
                alt="duragcat"
                // src={DuragCat}
                className="w-full rounded-lg bg-gray-200"
              />
            </div>
          </div>
        </div>
        {/* Past Games */}
        <div className="relative overflow-hidden pt-16 lg:pt-20 mb-10">
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow-sm outline-1 outline-black/5 sm:rounded-lg dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
                  <table className="relative min-w-full divide-y divide-gray-300 dark:divide-white/15">
                    <thead className="bg-gray-50 dark:bg-gray-800/75">
                      {adminArchiveHeaders()}
                    </thead>
                    {adminArchiveContent()}
                  </table>
                </div>
              </div>
            </div>
          </div>                
        </div>
      </div>
      {/* Modal */}
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in dark:bg-gray-900/50"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95 dark:bg-gray-800 dark:outline dark:-outline-offset-1 dark:outline-white/10"
            >
              {currentMode === 'team' && teamUpdateForm()}
              {currentMode === 'game' && gameUpdateForm()}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      <Footer/>
    </div>
  )
}

export default Div;