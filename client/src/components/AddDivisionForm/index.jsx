import {ChevronDownIcon} from '@heroicons/react/24/solid'
import {useState} from 'react'
import {useMutation} from '@apollo/client/react'
import {ADD_DIVISION} from '../../../utils/mutations'

const days = [
  {
    id: 0,
    day: 'Sunday'
  },
  {
    id: 1,
    day: 'Monday'
  },
  {
    id: 2,
    day: 'Tuesday'
  },
  {
    id: 3,
    day: 'Wednesday'
  },
  {
    id: 4,
    day: 'Thursday'
  }
];

export default function AddDivisionForm () {
  const [formState, setFormState] = useState({
    divisionDay: '',
    divisionName: '',
  });

  const [addDivision, error] = useMutation(ADD_DIVISION);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
    // console.log(formState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {mutationResponse} = await addDivision({
        variables: {
          divisionName: formState.divisionName,
          divisionDay: formState.divisionDay
        }
      });

      window.location.reload();
      console.log('Division added.');

    } catch (error) {
      console.error(error);
      alert("There was an error adding the division.");
    }
  }

  return (
    <form onSubmit={handleSubmit} method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <h2 className="text-base/7 font-semibold text-gray-900 dark:text-white">Add a Division</h2>
        <div className="sm:col-span-2">
          <label htmlFor="teamnamelabel" className="block text-sm/6 font-semibold text-gray-900 dark:text-white">
            Select The Day For The New Division
          </label>
          <div className="mt-2 grid grid-cols-1">
            <select
              id="divisionDay"
              name="divisionDay"
              type="divisionDay"
              value={formState.divisionDay}
              className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:*:bg-gray-800 dark:focus:outline-indigo-500"
              onChange={handleChange}
            >
              {days.map((day) => (
                <option key={day.id} value={day.day}>
                  {day.day}
                </option>
              ))}
            </select>
            <ChevronDownIcon
              aria-hidden="true"
              className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4 dark:text-gray-400"
            />
          </div>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="divisionlabel" className="block text-sm/6 font-semibold text-gray-900 dark:text-white">
            Division Name
          </label>
          <div className="mt-2.5">
            <input
              id="divisionName"
              type="divisionName"
              name="divisionName"
              placeholder='Enter Division Name'
              className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"           
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="mt-10">
        <button
          type="submit"
          className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-black shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
        >
          Add Division
        </button>
      </div>
    </form>
  );
};