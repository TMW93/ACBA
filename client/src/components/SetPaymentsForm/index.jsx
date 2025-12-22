import {ChevronDownIcon} from '@heroicons/react/24/solid'
import {useState, useEffect} from 'react'
import {useQuery, useLazyQuery, useMutation} from '@apollo/client/react'
import { UPDATE_PAYMENT } from '../../utils/mutations'
import { QUERY_ALL_DIVISIONS, QUERY_SINGLE_DIVISION} from '../../utils/queries'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, FocusTrap } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
};

function textColour(text) {
  if(text === 'Paid') {
    return 'text-green-500';
  } else if(text === 'Unpaid') {
    return 'text-red-500'
  }
  return 'text-black-500'
};

const payments = [
  {
    id: 1,
    choice: 'Paid'
  },
  {
    id: 2,
    choice: 'Unpaid'
  }
];

export default function UpdatePayment () {
  const [open, setOpen] = useState(false);
  const [currentDiv, setDivState] = useState();
  const [teams, setTeamState] = useState([]);
  const [loadingTeams, setLoadingTeams] = useState(true);
  const [formState, setFormState] = useState({
    teamId: '',
    teamName: '',
    payment: '',
  });
  
  const [selectedDiv, {loadingSingleDiv, errorSingleDiv, dataSingleDiv}] = useLazyQuery(QUERY_SINGLE_DIVISION);
  const {loading, error, data} = useQuery(QUERY_ALL_DIVISIONS);
  const [updatePayment, {updatePaymentError}] = useMutation(UPDATE_PAYMENT);

  useEffect(() => {
    setLoadingTeams(true);
    const avaliableTeams = async () => {
      if(currentDiv) {
      const divInfo = await selectedDiv({variables: {divisionId: currentDiv}});
        // console.log(divInfo.data.division.teams);
        if(divInfo) {
          setTeamState(divInfo.data.division.teams.map(
            team => ({
              teamId: team._id, 
              name: team.name,
              payment: team.payment,
          })));
          };
          // console.log(teams);
          setLoadingTeams(false);
        }
      } 
    avaliableTeams();
  }, [currentDiv]);

  if(loading) {
    return null;
  }
  if(error) {
    return `Error! ${error}`;
  }

  const divsData = data?.allDivisions || [];

  // console.log(teamsData[1].division.day);

  const handleDivChange = async (e) => {
    setDivState(e.target.value);
  };

  const handleClick = async (teamId, teamName, payment) => {
    setFormState({
      ...formState,
      teamId: teamId,
      teamName: teamName,
      payment: payment
    })
    setOpen(true);
    // console.log(paymentFormState);
  };

  const handlePaymentChange = async (e) => {
    const {name, value} = e.target;
    // console.log(e.target.value);
    setFormState({
      ...formState,
      [name]: value,
    });
    console.log(formState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formState);
    try {
      const {mutationResponse} = await updatePayment({
        variables: {
          teamId: formState.teamId,
          payment: formState.payment,
        },
      });

      window.location.reload();
      console.log('Payment Updated.');
    } catch (error) {
      console.error(error);
      alert("There was an error updating the payment.");
    }
  };

  return (
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
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
        {/* Team Table */}
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow-sm outline-1 outline-black/5 sm:rounded-lg dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
            <table className="relative min-w-full divide-y divide-gray-300 dark:divide-white/15">
              {/* Table Headers */}
              <thead className="bg-gray-50 dark:bg-gray-800/75">
                <tr>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-center text-sm font-semibold text-black-900 dark:text-gray-200"
                  >
                    Team
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-center text-sm font-semibold text-black-900 dark:text-gray-200"
                  >
                    Payment
                  </th>
                  <th scope="col" className="py-3.5 pr-4 pl-3 sm:pr-6">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-white/10 dark:bg-gray-800/50">
                {loadingTeams ? <tr key='loading'></tr> : teams.map((team) => (
                  <tr key={team.teamId}>
                    <td  className="px-3 py-4 text-sm text-center whitespace-nowrap text-black-500 dark:text-black-400">
                      {team.name}
                    </td>
                    <td className={classNames(textColour(team.payment), "px-3 py-4 text-sm text-center whitespace-nowrap dark:text-black-400")}>
                      {team.payment}
                    </td>
                    <td className="py-4 pr-4 pl-3 text-center text-sm font-medium whitespace-nowrap sm:pr-6">
                      <p 
                        id={team.teamId}
                        data-name={team.name}
                        className="text-indigo-600 cursor-pointer hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                        onClick={() => handleClick(team.teamId, team.name, team.payment)}
                        >
                          Edit<span className="sr-only">{team.teamId}</span>
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
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
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="border-b border-gray-900/10 pb-12 dark:border-white/10">
                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                          <label htmlFor="paymentType" className="block text-sm/6 font-medium text-gray-900 dark:text-white">
                            Payment for {formState.teamName}
                          </label>
                          <div className="mt-2 grid grid-cols-1">
                            <select
                              id="payment"
                              name="payment"
                              type="payment"
                              defaultValue={'defaultDiv'}
                              className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:*:bg-gray-800 dark:focus:outline-indigo-500"
                              onChange={handlePaymentChange}
                            >
                              <option value='defaultDiv' disabled>Choose an Option...</option>
                              {payments.map((payment) => (
                                <option key={payment.id} value={payment.choice}>{payment.choice}</option>
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
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-black shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:focus-visible:outline-indigo-500"
                    >
                      Update Payment
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  )
}