import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Divider from "../components/Divider";
import Drawer from '../components/Drawer'
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

const divInfo = [
  {
    day: 'Sunday',
    divisions: 'Pool A/B, 8A/8B, 10B, Unisex 7',
    gamesPlayed: 12,
    bench: 'Bench Free',
    gameTime: '20 min halves/ 24 sec clock',
    fee: '$1550 (inc GST)'
  },
  {
    day: 'Monday',
    divisions: '5, Social C PCYC/Concord',
    gamesPlayed: 12,
    bench: 'Bench Free',
    gameTime: '20 min halves/ 24 sec clock',
    fee: '$1550 (inc GST)'
  },
  {
    day: 'Tuesday',
    divisions: 'Social A/B',
    gamesPlayed: 12,
    bench: 'Bench Free',
    gameTime: '20 min halves/ 24 sec clock',
    fee: '$1550 (inc GST)'
  },
  {
    day: 'Wednesday',
    divisions: '2, 3',
    gamesPlayed: 12,
    bench: 'Bench Free',
    gameTime: '20 min halves/ 24 sec clock',
    fee: '$1550 (inc GST)'
  },
  {
    day: 'Thursday',
    divisions: 'Social B/C, Beginners, Unisex 7',
    gamesPlayed: 12,
    bench: 'Bench Free',
    gameTime: '20 min halves/ 24 sec clock',
    fee: '$1550 (inc GST)'
  }
];

const TeamRegistration = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-white py-24 sm:py-32 dark:bg-gray-900">
      <Nav />
      <div>
        <Drawer/> 
        <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-10">   
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <h1 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
              Team Registration/Information
            </h1>
            <div className="mt-10 grid max-w-xl grid-cols-1 gap-8 text-base/7 text-gray-700 lg:max-w-none lg:grid-cols-2 dark:text-gray-300">
              {/* Rego Info */}
              <div>
                <p className="text-3xl">
                  To Register a team
                </p>
                <p className="mt-4 text-left">
                  Please send an email to email@email.com.au with the following details
                </p>
                <p className="mt-2">
                  Team Name:
                </p>
                <p className="mt-2">
                  Division:
                </p>
                <p className="mt-2">
                  Captain's Name and Number:
                </p>
                <p className="mt-2">
                  Team Roster:
                </p>
                <p className="mt-4 text-left">
                  Individual Rego: FREE (this is costed into Team Fees)
                </p>
                <p className="mt-4 text-left">
                  Insurance: Costed into Team Fee and  covers 10 players on your roster and fillins
                </p>
                <p className="mt-4 text-left">
                  Payment: $1550 (includes GST) upfront  per team  to be accepted in the competition
                </p>
                <p className="mt-8 text-left">
                  Once this is sent , Acba Administrator will contact you with the details.
                </p>
                <p className="mt-6 text-left">
                  Please note all divisions are $1550 ( inclusive GST) per team for all Divisions. This Guarantees 12 games plus playoff . If rounds are reduce due to late entry , a refund of the balance will be transferred back to you.
                </p>
                <p className="mt-6 text-left">
                  Full upfront fee is payable in order to get a spot at the nominated Division.
                </p>
                <p className="mt-6 text-left">
                  Any issues please contact on through our <a href="/contact-us">Contact Page</a>
                </p>
                {/* Div Rego Info Table */}
                <p className="text-3xl text-left mt-8">
                  2025 Summer Season - NOW OPEN
                </p>
                <div className="sm:flex sm:items-center">
                  <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="relative min-w-full divide-y divide-gray-300 dark:divide-white/15">
                          <thead>
                            <tr className="text-center">
                              <th scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0 dark:text-white">
                                Divisions/Days
                              </th>
                              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                Games Played (Inc Playoffs)
                              </th>
                              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                Bench
                              </th>
                              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                Game Times/Addit
                              </th>
                              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                Total Team Fees
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 dark:divide-white/10">
                            {divInfo.map((div, index) => (
                              <tr key={index}>
                                <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0 dark:text-white">
                                  {div.day}
                                </td>
                                <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0 dark:text-white">
                                  {div.gamesPlayed}
                                </td>
                                <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0 dark:text-white">
                                  {div.bench}
                                </td>
                                <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0 dark:text-white">
                                  {div.gameTime}
                                </td>
                                <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0 dark:text-white">
                                  {div.fee}
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