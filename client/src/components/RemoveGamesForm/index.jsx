import {useState, useEffect} from 'react'
import {QUERY_ALL_DIVISIONS, QUERY_SINGLE_DIVISION} from '../../../utils/queries'
import {REMOVE_GAMES, REMOVE_SINGLE_GAME, REMOVE_ARCHIVED_GAMES} from '../../../utils/mutations'
import {useQuery, useMutation, useLazyQuery} from '@apollo/client/react'
import {ChevronDownIcon} from '@heroicons/react/24/solid'

export default function RemoveGamesForm () {
  const [formState, setFormState] = useState({gameId: ''});
  const [loadingGames, setLoadingGames] = useState(true);
  const [currentDiv, setDivState] = useState();
  const [games, setGameState] = useState();

  const [removeGames, {removeGamesWError}] = useMutation(REMOVE_GAMES);
  const [removeSingleGame, {removeSingleGameError}] = useMutation(REMOVE_SINGLE_GAME);
  const [removeArchivedGames, {removeArchivedGamesError}] = useMutation(REMOVE_ARCHIVED_GAMES);
  const {loading, error, data} = useQuery(QUERY_ALL_DIVISIONS);
  const [selectedDiv, {loadingSingleDiv, errorSingleDiv, dataSingleDiv}] = useLazyQuery(QUERY_SINGLE_DIVISION);

  useEffect(() => {
    setLoadingGames(true);
    const avaliableGames = async () => {
      if(currentDiv) {
      const divInfo = await selectedDiv({variables: {divisionId: currentDiv}});
        console.log(divInfo.data.division.games);
        if(divInfo) {
          setGameState(divInfo.data.division.games.map(game => ({gameId: game._id, time: game.name, date: game.date, teamOne: game.teamOne, teamTwo: game.teamTwo})));
          // console.log(teams);
          setLoadingGames(false);
        }
      } 
    };
    avaliableGames();
  }, [currentDiv]);

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
    // console.log(formState.gameId);
  };

  const handleDivChange = async (e) => {
    setDivState(e.target.value);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitter = e.nativeEvent.submitter;

    if(submitter.name === 'singleGame') {
      const deleteGameId = formState.gameId;
      if(window.confirm('Are you sure you want to delete this game?')) {
        try {
          await removeSingleGame({
            variables: {gameId: formState.gameId},
            update(cache) {
              const deletedId = cache.identify({deleteGameId, __typename: 'Game'});
              cache.evict({id: deletedId});
              cache.gc();
            }
          });

          window.location.reload();
          console.log('Game removed.');
        } catch (error) {
          alert("There was an error removing the game.");
        }
      }
    } else if(submitter.name === 'allGames') {
      if(window.confirm('Are you sure you want to delete all games from this division?')) {
        try {
          await removeGames({variables: {divisionId: currentDiv}});
          window.location.reload();
          console.log('Games removed.');
        } catch (error) {
          alert("There was an error removing the games.");
        }
      }
    } else if(submitter.name === 'archiveGames') {
      if(window.confirm('Are you sure you want to delete all archived games from this division?')) {
        try {
          await removeArchivedGames({variables: {divisionId: currentDiv}});
          window.location.reload();
          console.log("Games Removed.");
        } catch (error) {
          alert("There was an error removing the games.");
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <h2 className="text-base/7 font-semibold text-gray-900 dark:text-white">Remove Game/s</h2>
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
              <option value='defaultDiv' disabled>Choose a Division ...</option>
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
              defaultValue={'Loading'}
              className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:*:bg-gray-800 dark:focus:outline-indigo-500"
              onChange={handleChange}
            >
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
      </div>
      {/* Remove Single Game Button */}
      <div className="mt-10">
        <button
          type="submit"
          name='singleGame'
          className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-black shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
        >
          Remove Games
        </button>
      </div>
      {/* Remove All Games Button */}
      <div className="mt-10">
        <button
          type="submit"
          name='allGames'
          className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-black shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
        >
          Remove All Games
        </button>
      </div>
      {/* Remove All Archived Games Button */}
      <div className="mt-10">
        <button
          type="submit"
          name='archiveGames'
          className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-black shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
        >
          Remove All Archived Games
        </button>
      </div>
    </form>
  )

}