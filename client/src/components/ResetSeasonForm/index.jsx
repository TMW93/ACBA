import {useState} from 'react'
import { QUERY_ALL_DIVISIONS } from '../../utils/queries'
import { RESET_SEASON } from '../../utils/mutations'
import { useMutation, useQuery } from '@apollo/client/react';
import {ChevronDownIcon} from '@heroicons/react/24/solid'


export default function ResetSeasonForm () {
  const [formState, setFormState] = useState({divisionId: ''});

  const {loading, error, data} = useQuery(QUERY_ALL_DIVISIONS);
  const [resetSeason, {resetSeasonError}] = useMutation(RESET_SEASON);

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await resetSeason({
          variables: {divisionId: formState.divisionId}
        });

        window.location.reload();
        console.log('Season reset.');
    } catch (error) {
      alert("There was an error archiving the game.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <h2 className="text-base/7 font-semibold text-gray-900 dark:text-white">Reset Season</h2> 
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
              onChange={handleChange}
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
        {/* Submit Button */}
        <div className="mt-10">
        <button
          type="submit"
          className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-black shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
        >
          Reset Season
        </button>
      </div>
      </div>
    </form>
  )
}