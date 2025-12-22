import {ChevronDownIcon} from '@heroicons/react/24/solid'
import {useState, useEffect} from 'react'
import {useQuery, useLazyQuery, useMutation} from '@apollo/client/react'
import { UPDATE_PAYMENT } from '../../utils/mutations'
import { QUERY_ALL_DIVISIONS, QUERY_SINGLE_DIVISION} from '../../utils/queries'

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

export default function UpdatePayment () {
  const [currentDiv, setDivState] = useState();
  const [teams, setTeamState] = useState([]);
  const [loadingTeams, setLoadingTeams] = useState(true);
  const [formState, setFormState] = useState({teamId: ''});
  
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

  const handleTeamChange = async (e) => {
    const {name, value} = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
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
                  <tr key={team._id}>
                    <td  className="px-3 py-4 text-sm text-center whitespace-nowrap text-black-500 dark:text-black-400">
                      {team.name}
                    </td>
                    <td  className={classNames(textColour(team.payment), "px-3 py-4 text-sm text-center whitespace-nowrap dark:text-black-400")}>
                      {team.payment}
                    </td>
                    <td  className="py-4 pr-4 pl-3 text-center text-sm font-medium whitespace-nowrap sm:pr-6">
                      <a
                        href="#"
                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                      >
                        Edit<span className="sr-only">, {team._id}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}