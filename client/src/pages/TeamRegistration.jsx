import {useState, useEffect} from 'react';
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Divider from "../components/Divider";
import {XMarkIcon} from '@heroicons/react/20/solid'

const avaliableDivs = [
  {
    division: 'Sunday Social 10',
    timeslot: '11a.m - 2.30p.m',
    prizeMoney: 400,
    status: 'OPEN',
    venue: 'Auburn PCYC/ Cumberland Uni'
  },
  {
    division: 'Sunday Pool A',
    timeslot: '9a.m - 12.30p.m',
    prizeMoney: 500,
    status: 'OPEN',
    venue: 'Auburn PCYC/ Cumberland Uni'
  },
  {
    division: 'Sunday Pool B',
    timeslot: '9a.m - 12.30p.m',
    prizeMoney: 450,
    status: 'OPEN',
    venue: 'Auburn PCYC/ Cumberland Uni'
  },
  {
    division: 'Sunday Division 8A',
    timeslot: '8:15a.m - 9:45a.m',
    prizeMoney: 400,
    status: 'OPEN',
    venue: 'Auburn PCYC'
  },
  {
    division: 'Sunday Division 8B',
    timeslot: '8:15a.m - 9:45a.m',
    prizeMoney: 400,
    status: 'OPEN',
    venue: 'Auburn PCYC'
  },
  {
    division: 'Sunday Unisex 7',
    timeslot: '3:30p.m - 6:30p.m',
    prizeMoney: 400,
    status: 'OPEN',
    venue: 'Cumberland Uni'
  },
  {
    division: 'Monday Division 5',
    timeslot: '7p.m - 9:10p.m',
    prizeMoney: 500,
    status: 'OPEN',
    venue: 'Auburn PCYC/ Cumberland Uni'
  },
  {
    division: 'Monday PCYC Social C',
    timeslot: '7p.m - 9:10p.m',
    prizeMoney: 400,
    status: 'OPEN',
    venue: 'Auburn PCYC/ Cumberland Uni'
  },
  {
    division: 'Monday Concord Social C',
    timeslot: '7p.m - 9:10p.m',
    prizeMoney: 400,
    status: 'OPEN',
    venue: 'Auburn PCYC/ Cumberland Uni'
  },
  {
    division: 'Tuesday Social A',
    timeslot: '7p.m - 9:10p.m',
    prizeMoney: 400,
    status: 'OPEN',
    venue: 'Auburn PCYC/ Cumberland Uni'
  },
  {
    division: 'Tuesday Social B ',
    timeslot: '7p.m - 9:10p.m',
    prizeMoney: 400,
    status: 'OPEN',
    venue: 'Auburn PCYC/ Cumberland Uni'
  },
  {
    division: 'Wednesday Division 2',
    timeslot: '8:15a.m - 9:45a.m',
    prizeMoney: 750,
    status: 'OPEN',
    venue: 'Auburn PCYC'
  },
   {
    division: 'Wednesday Division 3',
    timeslot: '7p.m - 9:10p.m',
    prizeMoney: 400,
    status: 'OPEN',
    venue: 'Auburn PCYC/ Cumberland Uni'
  },
  {
    division: 'Thursday Social B',
    timeslot: '7p.m - 9:10p.m',
    prizeMoney: 400,
    status: 'OPEN',
    venue: 'Auburn PCYC/ Cumberland Uni'
  },
  {
    division: 'Thursday Social C',
    timeslot: '7p.m - 9:10p.m',
    prizeMoney: 400,
    status: 'OPEN',
    venue: 'Auburn PCYC/ Cumberland Uni'
  },
  {
    division: 'Thursday Social Beginners',
    timeslot: '8:15a.m - 9:45a.m',
    prizeMoney: 300,
    status: 'OPEN',
    venue: 'Auburn PCYC/ Cumberland Uni'
  },
  {
    division: 'Thursday Unisex 7',
    timeslot: '7p.m - 9:10p.m',
    prizeMoney: 400,
    status: 'OPEN',
    venue: 'Auburn PCYC/ Cumberland Uni'
  },
];

const TeamRegistration = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // prevents forced layout before mount

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-white py-24 sm:py-32 dark:bg-gray-900">
      <Nav />
      <div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">   
          <div className="mx-auto -mt-5 max-w-2xl lg:mx-0 lg:max-w-none">
            <h1 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
              Team Registration/Information
            </h1>
            <div className="mt-10 grid max-w-xl grid-cols-1 gap-8 text-base/7 text-gray-700 lg:max-w-none lg:grid-cols-2 dark:text-gray-300">
              <div>
                {/* Rules and Regulations */}
                <p className="text-3xl">
                  Rules and Regulations
                </p>               
                <ul className="mt-4 text-left">
                  <li className="mt-2">
                    All players must play 5 out of their 12 of their games  or 4 out of 10/11 games to qualify for playoff.
                  </li>
                  <li className="mt-2">
                    We do not accept doctor certificate for injuries if players do not show up. All players must be dressed in uniform and sit on the bench to qualify for games if they are injured.
                  </li>
                  <li className="mt-2">
                    Excuses such as players have paid their fee but did not show up will not be accepted as being qualified for a game.
                  </li>
                </ul>
                <p className="mt-6 text-left">
                  Note: Acba has the right to move teams up or down in regards to their skill level in the competition. Where a team is deemed too strong for a division  Acba will refund the balance if we do not have a division that suits the team. Please ensure you understand this rule before you enter the competition.
                </p>
                <p className=" mt-6 text-3xl">
                  Australian Chinese Basketball Assoication Zero Tolerance Policy            
                </p>
                <p className="mt-6 text-left">
                  All participants in the Australian Chinese Basketball Association must accept responsibility for their behaviour.
                </p>    
                <p className="mt-6 text-left">
                  ACBA reserves the right to ask any coach, players or spectator to immediately leave the venue should they;
                </p>
                <ul className="mt-4 text-left">
                  <li className="mt-2 flex items-center">
                    <span className="mr-2"><XMarkIcon className="size-6 stroke-red-500"/> </span>
                    <span>Wilfully question or challenge the rulings of the referees</span>
                   
                  </li>
                  <li className="mt-2 flex items-center">
                    <span className="mr-2"><XMarkIcon className="size-6 stroke-red-500"/> </span>
                    <span>Berate or abuse referees </span>  
                  </li>
                  <li className="mt-2 flex items-center">
                    <span className="mr-2"><XMarkIcon className="size-6 stroke-red-500"/> </span>
                    <span>Berate/taunting players and illiciting fights</span>                  
                  </li>
                  <li className="mt-2 flex items-center">
                    <span className="mr-2"><XMarkIcon className="size-6 stroke-red-500"/> </span>
                    <span>Berate or abuse other spectators</span>                    
                  </li>
                  <li className="mt-2 flex items-center">
                    <span className="mr-2"><XMarkIcon className="size-6 stroke-red-500"/> </span>
                    <span>Displaying unsportsmanlike/anti social behaviours on the court </span>                   
                  </li>
                  <li className="mt-2 flex items-center">
                    <span className="mr-2"><XMarkIcon className="size-6 stroke-red-500"/> </span>
                    <span>Display conduct which is inappropriate in a sporting environment</span>                   
                  </li>
                </ul>
                <p className="mt-6 text-left">
                  No warnings will be given in the event of the above action becoming necessary. 
                </p>
                <p className="mt-6 text-left">
                  Where the above behaviour is deemed unacceptable there will be NO formal hearing and player/spectators will banish from the competition altogether.              
                </p>
                <p className="mt-6 text-left">
                  If you would like further clarification on this issue please speak with the Supervisor at an appropriate time or contact us on email@email.com
                </p>
                <p className="mt-6 text-left">
                  The adoption of this Zero Tolerance policy has become necessary to safeguard the players, officials and spectators alike.
                </p>
                <p className="mt-6 text-left">
                  We ask any person that feels they cannot refrain from the above unacceptable behaviour to not attend or join the competition.
                </p>
              </div>
            </div>
          </div>
        </div>
        <Divider/>
        {/* Division Info */}
        <div className="relative overflow-hidden pt-16 lg:pt-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h1 className="text-4xl text-base font-semibold text-gray-900 dark:text-white">
                    Division Information
                  </h1>
                  <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                    General Information For Each Division
                  </p>
                </div>
              </div>
              <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle">
                    <div className="overflow-hidden shadow-sm outline-1 outline-black/5 sm:rounded-lg dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
                      <table className="relative min-w-full divide-y divide-gray-300 dark:divide-white/15">
                        <thead className="bg-gray-50 dark:bg-gray-800/75">
                          <tr>
                            <th scope="col" className="py-3.5 pr-3 pl-4 text-center text-sm font-semibold text-gray-900 sm:pl-6 dark:text-gray-200">
                              Division
                            </th>
                            <th scope="col" className="py-3.5 pr-3 pl-4 text-center text-sm font-semibold text-gray-900 sm:pl-6 dark:text-gray-200">
                              Timeslot
                            </th>
                            <th scope="col" className="py-3.5 pr-3 pl-4 text-center text-sm font-semibold text-gray-900 sm:pl-6 dark:text-gray-200">
                              Status
                            </th>
                            <th scope="col" className="py-3.5 pr-3 pl-4 text-center text-sm font-semibold text-gray-900 sm:pl-6 dark:text-gray-200">
                              Prize Money
                            </th>
                            <th scope="col" className="py-3.5 pr-3 pl-4 text-center text-sm font-semibold text-gray-900 sm:pl-6 dark:text-gray-200">
                              Venue
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white dark:divide-white/10 dark:bg-gray-800/50">
                          {avaliableDivs.map((div) => (
                            <tr key={div.division}>
                              <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6 dark:text-white">
                                {div.division}
                              </td>
                              <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6 dark:text-white">
                                {div.timeslot}
                              </td>
                              <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6 dark:text-white">
                                {div.status}
                              </td>
                              <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6 dark:text-white">
                                ${div.prizeMoney}
                              </td>
                              <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6 dark:text-white">
                                {div.venue}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Divider/>
      </div>
      <Footer/>
    </div>
  )
};

export default TeamRegistration;