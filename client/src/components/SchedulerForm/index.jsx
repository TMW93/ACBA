import { useState, useEffect } from "react"
import { useQuery, useLazyQuery, useMutation } from "@apollo/client/react"
import { QUERY_ALL_DIVISIONS, QUERY_SINGLE_DIVISION } from "../../utils/queries"
import {ADD_GAME, REMOVE_GAMES, REMOVE_SINGLE_GAME} from '../../utils/mutations'
import timeConvert from "../../utils/timeConvert"
import {ChevronDownIcon} from '@heroicons/react/24/solid'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'

const venues = ['PCYC Auburn Court 1', 'PCYC Auburn Court 2', 'Lidcombe Uni', 'Concord'];

export default function SchedulerForm ({day, date, onClose, dialogOpen}) {
  const [currentDiv, setDivState] = useState();
  const [teams, setTeamState] = useState();
  const [loadingTeams, setLoadingTeams] = useState(true);
  const [formState, setFormState] = useState({
    teamOneId: '',
    teamTwoId: '',
    time: '',
    venue: '',
  });

  const [selectDiv, {loadingSingleDiv, errorSingleDiv, dataSingleDiv}] = useLazyQuery(QUERY_SINGLE_DIVISION);
  const {loading, error, data} = useQuery(QUERY_ALL_DIVISIONS);
  const [addGame, {errorAddGmae}] = useMutation(ADD_GAME);

  useEffect(() => {
    setLoadingTeams(true);
    const avaliableTeams = async () => {
      if(currentDiv) {
      const divInfo = await selectDiv({variables: {divisionId: currentDiv}})
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

  if(loading) {
    return null;
  }

  if(error) {
    return `Error! ${error}`;
  }

  const divs = data?.allDivisions || [];

  //Sunday Divs
  const sundayDivs = divs.filter(div => div.day.includes("Sunday"));
  //Monday Divs
  const mondayDivs = divs.filter(div => div.day.includes("Monday"));
  //Tuesday Divs
  const tuesdayDivs = divs.filter(div => div.day.includes("Tuesday"));
  //Wednesday Divs
  const wednesdayDivs = divs.filter(div => div.day.includes("Wednesday"));
  //Thursday Divs
  const thursdayDivs = divs.filter(div => div.day.includes("Thursday"));

  let selectedDiv;

  if(day === 'Sunday') {
    selectedDiv = sundayDivs;
  } else if(day === 'Monday') {
    selectedDiv = mondayDivs;
  } else if(day === 'Tuesday') {
    selectedDiv = tuesdayDivs;
  } else if(day === 'Wednesday') {
    selectedDiv = wednesdayDivs;
  } else if(day === 'Thursday') {
    selectedDiv = thursdayDivs; 
  }

  const handleDivChange = async (e) => {
    setDivState(e.target.value);
  };

  const handleFormChange = async (e) => {
    const {name, value} = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
    console.log(formState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(typeof(date));
    // console.log(formState);
    const convertedTime = timeConvert(formState.time);
    try {
      const {mutationResponse} = await addGame({
        variables: {
          gameTime: convertedTime,
          gameDate: date,
          teamOneId: formState.teamOneId,
          teamTwoId: formState.teamTwoId,
          divisionId: currentDiv,
          venue: formState.venue,
        },
      });

      window.location.reload();
      console.log('Team added.');
    } catch (error) {
      console.error(error);
      alert("There was an error adding the team.");
    }
  };

  return (
    <Dialog open={dialogOpen} onClose={onClose} className="relative z-10">
      <DialogBackdrop transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in dark:bg-gray-900/50"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95 dark:bg-gray-800 dark:outline dark:-outline-offset-1 dark:outline-white/10"
          >
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="border-b border-gray-900/10 pb-12 dark:border-white/10">
                  {/* Division Select */}
                  <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label className="block text-sm/6 font-medium text-gray-900 dark:text-white">
                        {day} Games {date}
                      </label>
                      <div className="mt-2 grid grid-cols-1">
                          <select
                              id="divSelect"
                              name="divSelect"
                              type="divSelect"
                              defaultValue={'defaultDiv'}
                              className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:*:bg-gray-800 dark:focus:outline-indigo-500"
                              onChange={handleDivChange}
                            >
                              <option value='defaultDiv' disabled>Choose a Division ...</option>
                              {selectedDiv.map((div) => (
                                <option key={div._id} value={div._id}>
                                  {div.day} {div.name}
                                </option>
                              ))}
                            </select>
                            <ChevronDownIcon
                              aria-hidden="true"
                              className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4 dark:text-gray-400"
                            />
                        </div>
                    </div>
                  </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12 dark:border-white/10">
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    {/* First Team Select */}
                    <div className="sm:col-span-3">
                      <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900 dark:text-white">
                        Team
                      </label>
                      <div className="mt-2 grid grid-cols-1">
                        <select
                          id="teamOneId"
                          name="teamOneId"
                          type="teamOneId"
                          defaultValue={'defaultTeam'}
                          className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:*:bg-gray-800 dark:focus:outline-indigo-500"
                          onChange={handleFormChange}
                        >
                          <option value='defaultTeam' disabled>Choose a Team...</option>
                          {loadingTeams ? <option value='Loading' disabled>Loading...</option> :
                          teams.map((team) => (
                            <option key={team.teamId} value={team.name}>{team.name}</option>
                          ))}
                        </select>
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4 dark:text-gray-400"
                        />
                      </div> 
                    </div>
                    {/* Second Team Select*/}
                    <div className="sm:col-span-3">
                      <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900 dark:text-white">
                        Team
                      </label>
                      <div className="mt-2 grid grid-cols-1">
                        <select
                          id="teamTwoId"
                          name="teamTwoId"
                          type="teamTwoId"
                          defaultValue={'defaultTeam'}
                          className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:*:bg-gray-800 dark:focus:outline-indigo-500"
                          onChange={handleFormChange}
                        >
                          <option value='defaultTeam' disabled>Choose a Team...</option>
                          {loadingTeams ? <option value='Loading' disabled>Loading...</option> :
                          teams.map((team) => (
                            <option key={team.teamId} value={team.name}>{team.name}</option>
                          ))}
                        </select>
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4 dark:text-gray-400"
                        />
                      </div>
                    </div>
                    {/* Time */}
                    <div className="sm:col-span-3">
                      <label className="block text-sm/6 font-medium text-gray-900 dark:text-white">
                        Game Time
                      </label>
                      <div className="mt-2 grid grid-cols-1">
                        <input 
                          id="time"
                          type="time"
                          name="time"
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                          onChange={handleFormChange}
                        />
                      </div>
                    </div>
                    {/* Venue Select */}
                    <div className="sm:col-span-3">
                      <label className="block text-sm/6 font-medium text-gray-900 dark:text-white">
                        Venue
                      </label>
                      <div className="mt-2 grid grid-cols-1">
                        <select
                          id="venue"
                          type="venue"
                          name="venue"
                          defaultValue={'defaultVenue'}
                          className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:*:bg-gray-800 dark:focus:outline-indigo-500"
                          onChange={handleFormChange}
                        >
                          <option value='defaultVenue' disabled>Choose a Venue...</option>
                          {venues.map((venue) => (
                            <option key={venue}>{venue}</option>
                          ))}
                        </select>
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4 dark:text-gray-400"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button 
                  type="button" 
                  className="text-sm/6 font-semibold text-red-500 dark:text-white"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-black shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:focus-visible:outline-indigo-500"
                >
                  Add Game
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}