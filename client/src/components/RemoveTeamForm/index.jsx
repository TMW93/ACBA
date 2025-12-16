import {ChevronDownIcon} from '@heroicons/react/24/solid'
import {useState, useEffect} from 'react'
import {useQuery, useLazyQuery, useMutation} from '@apollo/client/react'
import {QUERY_ALL_DIVISIONS, QUERY_SINGLE_DIVISION} from '../../../utils/queries'
import {REMOVE_TEAM} from '../../../utils/mutations'

export default function RemoveTeamForm () {

  const [currentDiv, setDivState] = useState();
  const [teams, setTeamState] = useState();
  const [loadingTeams, setLoadingTeams] = useState(true);
  const [formState, setFormState] = useState({teamId: ''});
  
  const [selectedDiv, {loadingSingleDiv, errorSingleDiv, dataSingleDiv}] = useLazyQuery(QUERY_SINGLE_DIVISION);
  const {loading, error, data} = useQuery(QUERY_ALL_DIVISIONS);
  const [removeTeam, {removeTeamError}] = useMutation(REMOVE_TEAM);

  if(loading) {
    return null;
  }
  if(error) {
    return `Error! ${error}`;
  }

  const divsData = data?.allDivisions || [];
    // console.log(divsData);
  
  const handleDivChange = async (e) => {
    setDivState(e.target.value);
  };

  const handleTeamChange = async (e) => {
    const {name, value} = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
    // console.log(formState);
  };

  useEffect(() => {
    setLoadingTeams(true);
    const avaliableTeams = async () => {
      if(currentDiv) {
      const divInfo = await selectedDiv({variables: {divisionId: currentDiv}});
        // console.log(divInfo.data.division.teams);
        if(divInfo) {
          setTeamState(divInfo.data.division.teams.map(team => ({teamId: team._id, name: team.name})));
          // console.log(teams);
          setLoadingTeams(false);
        }
      } 
    };
    avaliableTeams();
  }, [currentDiv]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const deleteTeamId = formState.teamId;
    if(window.confirm('Are you sure you want to remove this team?')) {
      try {
        await removeTeam({
          variables: {teamId: formState.teamId},
          update(cache) {
            const deletedId = cache.identify({deleteTeamId, __typename: 'Team'});
            cache.evict({id: deletedId});
            cache.gc();
          }
        });

        window.location.reload();
        console.log('Team removed.');

      } catch (error) {
        console.error(error);
        alert("There was an error removing the team.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <h2 className="text-base/7 font-semibold text-gray-900 dark:text-white">Remove a Team</h2>
        {/* Division Select */}
        <div className="sm:col-span-2">
          <label htmlFor="divisionselectlabel" className="block text-sm/6 font-semibold text-gray-900 dark:text-white">
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
              {divsData.map((div) => (
                <option key={div._id} value={div._id}>{div.day} {div.name}</option>
              ))}
            </select>
            <ChevronDownIcon
              aria-hidden="true"
              className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4 dark:text-gray-400"
            />
          </div>
        </div>
        {/* Team Select */}
        <div className="sm:col-span-2">
          <label htmlFor="teamselectlabel" className="block text-sm/6 font-semibold text-gray-900 dark:text-white">
            Team
          </label>
          <div className="mt-2 grid grid-cols-1">
            <select
              id="teamId"
              name="teamId"
              type="teamId"
              defaultValue={'Loading'}
              className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:*:bg-gray-800 dark:focus:outline-indigo-500"
              onChange={handleTeamChange}
            >
              {loadingTeams ? <option value='Loading' disabled>Loading...</option> :
               teams.map((team) => (
                <option key={team.teamId} value={team.teamId}>{team.name}</option>
               ))}
            </select>
            <ChevronDownIcon
              aria-hidden="true"
              className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4 dark:text-gray-400"
            />
          </div>
        </div>
      </div>
      {/* Buttons */}
      <div className="mt-10">
        <button
          type="submit"
          className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-black shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
        >
          Remove Team
        </button>
      </div>
    </form>
  )
};