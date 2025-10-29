import { useState, useEffect } from "react"
import { useQuery, useLazyQuery } from "@apollo/client/react"
import { QUERY_ALL_DIVISIONS, QUERY_SINGLE_DIVISION } from "../../../utils/queries"
import {ChevronDownIcon} from '@heroicons/react/24/solid'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'

const ampm = ['a.m', 'p.m'];

const venues = ['PCYC Auburn', 'Lidcombe Uni', 'Concord'];

export default function SchedulerForm ({day, date, onClose, dialogOpen}) {
  const [currentDiv, setDivState] = useState();
  const [teams, setTeamState] = useState();
  const [loadingTeams, setLoadingTeams] = useState(true);
  const [formState, setFormState] = useState({teamId: ''});

  const [selectDiv, {loadingSingleDiv, errorSingleDiv, dataSingleDiv}] = useLazyQuery(QUERY_SINGLE_DIVISION);
  const {loading, error, data} = useQuery(QUERY_ALL_DIVISIONS);

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
  } else {
    return `Error! No Divisions on this day.`;
  }

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
            <form method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <h2 className="text-base/7 font-semibold text-gray-900 dark:text-white">{day} Games {date}</h2>
                {/* Division Select */}
                <div className="sm:col-span-2">
                  <label htmlFor="teamnamelabel" className="block text-sm/6 font-semibold text-gray-900 dark:text-white">
                    Select A Division
                  </label>
                  <div className="mt-2 grid grid-cols-1">
                    <select
                      id="divSelect"
                      name="divSelect"
                      type="divSelect"
                      className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:*:bg-gray-800 dark:focus:outline-indigo-500"
                      onChange={handleDivChange}
                    >
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
                {/* Team Select */}
                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  {/* Team Select  1*/}
                  <div className="sm:col-span-2">
                    <label htmlFor="teamselectlabel" className="block text-sm/6 font-semibold text-gray-900 dark:text-white">
                      Team
                    </label>
                    <div className="mt-2 grid grid-cols-1">
                      <select
                        id="teamId"
                        name="teamId"
                        type="teamId"
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
                  {/* Team Select 2 */}
                  <div className="sm:col-span-2">
                    <label htmlFor="teamselectlabel" className="block text-sm/6 font-semibold text-gray-900 dark:text-white">
                      Team
                    </label>
                    <div className="mt-2 grid grid-cols-1">
                      <select
                        id="teamId"
                        name="teamId"
                        type="teamId"
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
                {/* Time Select */}
                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <div>
                    <label className="block text-sm/6 font-semibold text-gray-900 dark:text-white">
                      Game Time
                    </label>
                    <div className="mt-2">
                      <input className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm/6 font-semibold text-gray-900 dark:text-white">
                        Time Period
                      </label>
                      <select>
                        {ampm.map((time) => (
                          <option key={time}>
                            {time}
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
                {/* Venue Select */}
                <div className="sm:col-span-2">

                </div>
              </div>  
              {/* Buttons */}
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                <button
                  data-autofocus
                  type="submit"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring-1 inset-ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0 dark:bg-white/10 dark:text-white dark:shadow-none dark:inset-ring-white/5 dark:hover:bg-white/20"
                >
                  Add Game
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-black shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>

    </Dialog>
  
  )
}