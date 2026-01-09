import Nav from '../components/Nav'
import Footer from '../components/Footer'
import AddTeamForm from '../components/AddTeamForm'
import RemoveTeamForm from '../components/RemoveTeamForm'
import AddDivisionForm from '../components/AddDivisionForm'
import RemoveDivisionForm from '../components/RemoveDivisionForm'
import GameScheduler from '../components/GameScheduler'
import RemoveGamesForm from '../components/RemoveGamesForm'
import ArchiveGamesForm from '../components/ArchiveGamesForm'
import ResetSeasonForm from '../components/ResetSeasonForm'
import UpdatePayment from '../components/SetPaymentsForm'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, FocusTrap } from '@headlessui/react'
import { ArchiveBoxIcon, ArrowPathIcon, CalendarIcon, CheckIcon, CurrencyDollarIcon,TrashIcon, UserGroupIcon, UserPlusIcon} from '@heroicons/react/24/outline'

import {useState} from 'react'

const tasks = [
  {
    title: 'Add Team',
    icon: UserPlusIcon,
    background: 'bg-pink-500',
    value: 'addTeam',
  },
  {
    title: 'Remove Team',
    icon: TrashIcon,
    background: 'bg-red-500',
    value: 'removeTeam',
  },
  {
    title: 'Add Division',
    icon: UserGroupIcon,
    background: 'bg-teal-500',
    value: 'addDivision',
  },
  {
    title: 'Remove Division',
    icon: TrashIcon,
    background: 'bg-red-500',
    value: 'removeDivision',
  },
  {
    title: 'Schedule Games',
    icon: CalendarIcon,
    background: 'bg-indigo-500',
    value: 'gameScheduler',
  },
  {
    title: 'Remove Game/s',
    icon: TrashIcon,
    background: 'bg-red-500',
    value: 'removeGame',
    
  },
  {
    title: 'Archive Game/s',
    icon: ArchiveBoxIcon,
    background: 'bg-sky-500',
    value: 'archiveGames',
  },
  {
    title: 'Reset Season',
    icon: ArrowPathIcon,
    background: 'bg-purple-500',
    value: 'seasonReset',
  },
  {
    title: 'Update Payments',
    icon: CurrencyDollarIcon,
    background: 'bg-green-500',
    value: 'updatePayment',
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
};

export default function TeamManager() {
  const [currentForm, setFormState] = useState('');
  const [open, setOpen] = useState(false);
  //console.log(currentForm);
  
  const handleButtonClick = async (e) => {
    setOpen(true);
    setFormState(e.target.id);
    // console.log(e.target.id);
    // console.log('im clicked');
  }

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-white py-24 sm:py-32 dark:bg-gray-900">
      <Nav/>
      {/* Content */}
      <div className="flex-1 mx-auto max-w-2xl -mt-35 px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h1 className="mb-10 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
          Tasks
        </h1>
        {/* Task List */}
        <ul
          role="list"
          className="mt-6 grid grid-cols-1 gap-6 border-y border-gray-200 py-6 sm:grid-cols-2 dark:border-white/10"
        >
          {tasks.map((task, taskIndex) => (
            <li key={taskIndex} className='flow-root'>
              <div className="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:outline-2 focus-within:outline-indigo-600 hover:bg-gray-50 dark:focus-within:outline-indigo-500 dark:hover:bg-white/5">
                <div className={classNames(task.background, 'flex size-16 shrink-0 items-center justify-center rounded-lg')}>
                  <task.icon aria-hidden='true' className='size-6 text-white'/>
                </div>
                <div onClick={handleButtonClick}>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    <p className="focus:outline-hidden">
                      <span aria-hidden='true' className='absolute inset-0' id={task.value}></span>
                      <span>{task.title}</span>
                      <span aria-hidden='true'> &rarr;</span>
                    </p>
                  </h3>             
                </div>
              </div>
            </li>
          ))}
        </ul>
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
                <div className="imx-auto max-w-7xl px-6 lg:px-8">
                  {currentForm === 'addTeam' && (<AddTeamForm />)}
                  {currentForm === 'removeTeam' && (<RemoveTeamForm />)}
                  {currentForm === 'addDivision' && (<AddDivisionForm />)}
                  {currentForm === 'removeDivision' && (<RemoveDivisionForm />)}
                  {currentForm === 'gameScheduler' && (<GameScheduler />)}
                  {currentForm === 'removeGame' && (<RemoveGamesForm />)}
                  {currentForm === 'archiveGames' && (<ArchiveGamesForm />)}
                  {currentForm === 'seasonReset' && (<ResetSeasonForm />)}
                  {currentForm === 'updatePayment' && (<UpdatePayment />)}
                </div>  
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </div>
      <Footer/>
    </div>
  )
}
