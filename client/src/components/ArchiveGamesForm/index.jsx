import {useState, useEffect, Suspense} from 'react'
import {QUERY_ALL_DIVISIONS, QUERY_SINGLE_DIVISION, QUERY_SINGLE_GAME} from '../../utils/queries'
import {UPDATE_SINGLE_GAME} from '../../utils/mutations'
import {useQuery, useMutation, useLazyQuery, skipToken, useSuspenseQuery} from '@apollo/client/react'
import {ChevronDownIcon} from '@heroicons/react/24/solid'

export default function ArchiveGamesForm () {
  const [formState, setFormState] = useState({
    divisionId: '',
    gameId: '',
    winner: '',
    loser: '',
    scoreWinner: 0,
    scoreLoser: 0,
  });
  const [loadingGames, setLoadingGames] = useState(true);
  const [loadingTeams, setLoadingTeams] = useState(true);
  // const [loadingGameDetails, setLoadingGameDetails] = useState(true);
  const [currentDiv, setDivState] = useState();
  const [games, setGameState] = useState();
  const [currentGame, setSingleGameState] = useState();
  const [teams, setTeams] = useState([]);

  const {loading, error, data} = useQuery(QUERY_ALL_DIVISIONS);
  const [selectedDiv, {loadingSingleDiv, errorSingleDiv, dataSingleDiv}] = useLazyQuery(QUERY_SINGLE_DIVISION);
  const [selectedGame, {loadingSingleGame, errorSingleGame, dataSingleGame}] = useLazyQuery(QUERY_SINGLE_GAME);
  const [archiveGame, {archiveGameError}] = useMutation(UPDATE_SINGLE_GAME);

  const initialTeamState = [];

  const resetTeams = () => {
    setTeams(initialTeamState);
  };
  
  // Games useEffect
  useEffect(() => {
    setLoadingGames(true);
    const avaliableGames = async () => {
      if(currentDiv) {
      const divInfo = await selectedDiv({variables: {divisionId: currentDiv}});
        // console.log(divInfo.data.division.games);
        if(divInfo) {
          setGameState(divInfo.data.division.games.map(game => ({gameId: game._id, time: game.name, date: game.date, teamOne: game.teamOne, teamTwo: game.teamTwo})));
          // console.log(teams);
          setLoadingGames(false);
        }
      } 
    };
    avaliableGames();
  }, [currentDiv]);

  // Teams useEffect
  useEffect(() => {
    setLoadingTeams(true);
    resetTeams();
    const avaliableTeams = async () => {
      if(currentGame != undefined) {
        const gameData = await selectedGame({variables: {gameId: currentGame}, skipToken});
        if(gameData) {
          // console.log(gameData.data.game);
          updateTeams(gameData.data.game.teamOne);
          updateTeams(gameData.data.game.teamTwo);
          setLoadingTeams(false);
          // console.log(teams);
        }
      }
    };
    avaliableTeams();
  }, [currentGame]);

  if(loading) {
    return null;
  }
  if(error) {
    return `Error! ${error}`;
  }

  const divisions = data?.allDivisions || [];

  const handleChange = async (e) => {
    const {name, value} = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
    // console.log(typeof(formState.scoreLoser));
  };

  const handleGameChange = async (e) => {
    setSingleGameState(e.target.value);
    // console.log(currentGame);
    const {name, value} = e.target;
      setFormState({
      ...formState,
      [name]: value,
    });
  };  

  const handleDivChange = async (e) => {
    setDivState(e.target.value);
    const {name, value} = e.target;
      setFormState({
      ...formState,
      [name]: value,
    });
    // console.log(formState);
  };

  const updateTeams = (newTeam) => {
    setTeams(playingTeams => [...playingTeams, newTeam]);
  };

  const handleScoreChange = async (e) => {
    // console.log(typeof(e.target.value));
    const intValue = parseInt(e.target.value, 10);
    if(!isNaN(intValue)) {
      const {name} = e.target;
      // console.log(name);
      setFormState({
        ...formState,
        [name]: intValue,
      });
    } 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formState);
    try {
      await archiveGame({
        variables: {
          divisionId: formState.divisionId,
          gameId: formState.gameId,
          scoreWinner: formState.scoreWinner,
          scoreLoser: formState.scoreLoser,
          winner: formState.winner,
          loser: formState.loser
        }
      });

      window.location.reload();
      console.log('Game updated.');
    } catch (error) {
      alert("There was an error archiving the game.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <h2 className="text-base/7 font-semibold text-gray-900 dark:text-white">Archive Games</h2>
        {/* Division Select */}
        <div className="sm:col-span-2">
          <label htmlFor="divisionlabel" className="block text-sm/6 font-semibold text-gray-900 dark:text-white">
            Division
          </label>
          <div className="mt-2 grid grid-cols-1">
            <select
              id="divisionId"
              name="divisionId"
              type="divisionId"
              defaultValue={'defaultDiv'}
              className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:*:bg-gray-800 dark:focus:outline-indigo-500"
              onChange={handleDivChange}
            >
              <option value='defaultDiv' disabled>Choose a Division...</option>
              {divisions.map((div) => (
                <option key={div._id} value={div._id}>{div.day} {div.name}</option>
              ))}
            </select>
            <ChevronDownIcon
              aria-hidden="true"
              className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4 dark:text-gray-400"
            />
          </div>
        </div>
        {/* Game Select */}
        <div className="sm:col-span-2">
          <label htmlFor="gameselectlabel" className="block text-sm/6 font-semibold text-gray-900 dark:text-white">
            Games
          </label>
          <div className="mt-2 grid grid-cols-1">
            <select
              id="gameId"
              name="gameId"
              type="gameId"
              defaultValue={'defaultGame'}
              className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:*:bg-gray-800 dark:focus:outline-indigo-500"
              onChange={handleGameChange}
            >
              <option value='defaultGame' disabled>Choose a Game...</option>
              {loadingGames ? <option value='Loading' disabled>Loading...</option> :
               games.map((game) => (
                <option key={game.gameId} value={game.gameId}>{game.teamOne} VS {game.teamTwo}</option>
               ))}
            </select>
            <ChevronDownIcon
              aria-hidden="true"
              className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4 dark:text-gray-400"
            />
          </div>
        </div>
        {/* Game Stats */}
        {/* Winner */}
        <div className="sm:col-span-2">
          <label htmlFor="winner" className="block text-sm/6 font-semibold text-gray-900 dark:text-white">
            Winner
          </label>
          <div className='mt-2 grid grid-cols-1'>
            <select
              id='winner'
              name='winner'
              type='winner'
              defaultValue={'defaultWinner'}
              onChange={handleChange}
              className='col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:*:bg-gray-800 dark:focus:outline-indigo-500'
            >
              <option value='defaultWinner' disabled>Choose a Team...</option>
              <option value='draw'>Draw</option>
              {loadingTeams ? <option value='Loading' disabled>Loading...</option> :
              teams.map((team) => (
                <option key={teams.indexOf(team)} value={team}>{team}</option>
              ))}
            </select>
            <ChevronDownIcon
              aria-hidden="true"
              className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4 dark:text-gray-400"
            />
          </div>
          <label htmlFor="scoreWinner" className="block text-sm/6 font-semibold text-gray-900 dark:text-white">
            Winner's Score
          </label>
          <div className="mt-2.5">
            <input
              id="scoreWinner"
              type="number"
              name="scoreWinner"
              placeholder='Score'
              className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
              onChange={handleScoreChange}            
            />
          </div>
        </div>
        {/* Loser */}
        <div className="sm:col-span-2">
          <label htmlFor="loser" className="block text-sm/6 font-semibold text-gray-900 dark:text-white">
            Loser
          </label>
          <div className='mt-2 grid grid-cols-1'>
            <select
              id='loser'
              name='loser'
              type='loser'
              defaultValue={'defaultLoser'}
              onChange={handleChange}
              className='col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:*:bg-gray-800 dark:focus:outline-indigo-500'
            >
              <option value='defaultLoser' disabled>Choose a Team...</option>
              <option value='draw'>Draw</option>
              {loadingTeams ? <option value='Loading' disabled>Loading...</option> :
              teams.map((team) => (
                <option key={teams.indexOf(team)} value={team}>{team}</option>
              ))}
            </select>
            <ChevronDownIcon
              aria-hidden="true"
              className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4 dark:text-gray-400"
            />
          </div>
          <label htmlFor="scoreLoser" className="block text-sm/6 font-semibold text-gray-900 dark:text-white">
            Loser's Score
          </label>
          <div className="mt-2.5">
            <input
              id="scoreLoser"
              type="number"
              name="scoreLoser"
              placeholder='Score'
              className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
              onChange={handleScoreChange}            
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
          Archive Game
        </button>
      </div>
    </form>
  )
}