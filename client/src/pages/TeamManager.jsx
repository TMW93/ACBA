import Nav from '../components/Nav'
import AddTeamForm from '../components/AddTeamForm'
import RemoveTeamForm from '../components/RemoveTeamForm'

import {useState} from 'react'

export default function TeamManager() {
  const [currentForm, setFormState] = useState('addTeam');
  // console.log(currentForm);

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8 dark:bg-gray-900">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-1/2 -z-10 aspect-1155/678 w-144.5 max-w-none -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-288.75 dark:opacity-20"
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl dark:text-white">
          Team Manager
        </h2>
        {/* mode switcher */}
        <div className="mt-16 flex justify-center">
          <fieldset aria-label="Admin">
            <div className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs/5 font-semibold inset-ring inset-ring-gray-200 dark:inset-ring-white/10">
              <label className="group relative rounded-full px-2.5 py-1 has-checked:bg-indigo-600 dark:has-checked:bg-indigo-500">
                <input
                  defaultValue="addTeam"
                  defaultChecked
                  name="switcher"
                  type="radio"
                  className="absolute inset-0 appearance-none rounded-full"
                  onClick={() => setFormState('addTeam')}
                />
                <span className="text-gray-500 group-has-checked:text-white dark:text-gray-400">Add Team</span>
              </label>
              <label className="group relative rounded-full px-2.5 py-1 has-checked:bg-indigo-600 dark:has-checked:bg-indigo-500">
                <input
                  defaultValue="modifyTeam"
                  name="switcher"
                  type="radio"
                  className="absolute inset-0 appearance-none rounded-full"
                  onClick={() => setFormState('modifyTeam')}
                />
                <span className="text-gray-500 group-has-checked:text-white dark:text-gray-400">Modify Team</span>
              </label>
              <label className="group relative rounded-full px-2.5 py-1 has-checked:bg-indigo-600 dark:has-checked:bg-indigo-500">
                <input
                  defaultValue="removeTeam"
                  name="switcher"
                  type="radio"
                  className="absolute inset-0 appearance-none rounded-full"
                  onClick={() => setFormState('removeTeam')}
                />
                <span className="text-gray-500 group-has-checked:text-white dark:text-gray-400">Remove Team</span>
              </label>
              <label className="group relative rounded-full px-2.5 py-1 has-checked:bg-indigo-600 dark:has-checked:bg-indigo-500">
                <input
                  defaultValue="setTable"
                  name="switcher"
                  type="radio"
                  className="absolute inset-0 appearance-none rounded-full"
                  onClick={() => setFormState('setTable')}
                />
                <span className="text-gray-500 group-has-checked:text-white dark:text-gray-400">Set Table</span>
              </label>
            </div>
          </fieldset>
        </div>
        <div className="imx-auto max-w-7xl px-6 lg:px-8">
          {currentForm === 'removeTeam' && (<RemoveTeamForm />)}
          {currentForm === 'addTeam' && (<AddTeamForm />)}
        </div>
      </div>
    </div>
  )
}
