import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useLazyQuery } from '@apollo/client/react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';

import Nav from '../components/Nav';
import Footer from '../components/Footer';
import AdminTable from '../components/AdminTable';
import quickSortStandings from '../utils/quickSortStandings';
import {
  QUERY_DIVISION_BY_SLUG,
  QUERY_SINGLE_TEAM,
  QUERY_SINGLE_GAME,
} from '../utils/queries';

import DuragCat from '/placeholders/duragCat.jpg?url';

const teamHeaders = [
  { label: 'Team Name', key: 'name' },
  { label: 'Wins', key: 'wins' },
  { label: 'Losses', key: 'losses' },
  { label: 'Draws', key: 'draws' },
  { label: 'Total Points', key: 'totalPoints' },
];

const gameHeaders = [
  { label: 'Date', key: 'date' },
  { label: 'Winner', key: 'winner' },
  { label: 'Winner Score', key: 'scoreWinner' },
  { label: 'Loser', key: 'loser' },
  { label: 'Loser Score', key: 'scoreLoser' },
];

export default function Div() {
  const { slug } = useParams();
  const [mounted, setMounted] = useState(false);

  const [open, setOpen] = useState(false);
  const [currentMode, setCurrentMode] = useState(null); // 'team' | 'game'
  const [currentId, setCurrentId] = useState(null);

  const [teamFormState, setTeamFormState] = useState({});
  const [gameFormState, setGameFormState] = useState({});

  const [teamQuery, { data: teamData }] = useLazyQuery(QUERY_SINGLE_TEAM);
  const [gameQuery, { data: gameData }] = useLazyQuery(QUERY_SINGLE_GAME);

  const { loading, error, data } = useQuery(QUERY_DIVISION_BY_SLUG, {
    variables: { slug },
  });

  useEffect(() => setMounted(true), []);

  /* ---------- Modal Handlers ---------- */

  const openTeamModal = (teamId) => {
    setCurrentMode('team');
    setCurrentId(teamId);
    setOpen(true);
    teamQuery({ variables: { teamId } });
  };

  const openGameModal = (gameId) => {
    setCurrentMode('game');
    setCurrentId(gameId);
    setOpen(true);
    gameQuery({ variables: { gameId } });
  };

  const closeModal = () => {
    setOpen(false);
    setCurrentMode(null);
    setCurrentId(null);
    setTeamFormState({});
    setGameFormState({});
  };

  /* ---------- Sync Lazy Query Data ---------- */

  useEffect(() => {
    if (teamData?.teamById) {
      setTeamFormState({ ...teamData.teamById });
    }
  }, [teamData]);

  useEffect(() => {
    if (gameData?.game) {
      setGameFormState({ ...gameData.game });
    }
  }, [gameData]);

  if (!mounted || loading) return null;
  if (error) return <p>Error: {error.message}</p>;

  const division = data?.divisionBySlug || {};
  const sortedTeams = division.teams
    ? quickSortStandings(division.teams)
    : [];
  const games = division.playedGames || [];

  /* ---------- Forms ---------- */

  const TeamForm = () => (
    <form className="grid gap-4">
      <h2 className="text-xl font-semibold">Update Team</h2>
      {['name', 'wins', 'losses', 'draws', 'totalPoints'].map((field) => (
        <input
          key={field}
          type={field === 'name' ? 'text' : 'number'}
          value={teamFormState[field] || ''}
          onChange={(e) =>
            setTeamFormState({
              ...teamFormState,
              [field]: e.target.value,
            })
          }
          className="rounded border px-3 py-2"
          placeholder={field}
        />
      ))}
      <button className="bg-indigo-600 text-white rounded py-2">
        Update
      </button>
    </form>
  );

  const GameForm = () => (
    <form className="grid gap-4">
      <h2 className="text-xl font-semibold">Update Game</h2>
      {['date', 'winner', 'loser', 'scoreWinner', 'scoreLoser'].map((field) => (
        <input
          key={field}
          type={field.includes('score') ? 'number' : 'text'}
          value={gameFormState[field] || ''}
          onChange={(e) =>
            setGameFormState({
              ...gameFormState,
              [field]: e.target.value,
            })
          }
          className="rounded border px-3 py-2"
          placeholder={field}
        />
      ))}
      <button className="bg-indigo-600 text-white rounded py-2">
        Update
      </button>
    </form>
  );
  
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />

      <main className="flex-1 w-full mx-auto mt-10 px-6 py-16">
        <h1 className="text-center text-4xl font-semibold mb-5">
          {division.day} - {division.name}
        </h1>

        {/* Standings */}
        <h2 className="mt-10 mb-5 w-full text-center text-3xl font-semibold tracking-tight text-balance text-gray-950 dark:text-white">Standings</h2>
        <div className="w-full">
          <AdminTable
            headers={teamHeaders}
            data={sortedTeams}
            onEdit={(team) => openTeamModal(team._id)}
          />
        </div>

        {/* Games & Images */}
        <div className="mt-10 grid w-full grid-cols-1 gap-8 text-base/7 text-gray-700 lg:grid-cols-2 lg:w-full dark:text-gray-300">
          {/* Games */}
          <div>
            <h2 className="mt-2 mb-5 text-center text-3xl font-semibold tracking-tight text-balance text-gray-950 dark:text-white">Upcoming Games</h2>
            <div className="flex flex-col items-center">
              {division.games.map((game) => (
                <div
                  key={game._id}
                  className="mb-10 w-full max-w-sm rounded overflow-hidden shadow-lg"
                >
                  <div className="px-6 py-4 text-center">
                    <div className="font-bold text-xl">{game.date}</div>
                    <div className="font-bold text-xl">{game.time}</div>
                    <div className="font-bold text-xl mb-2">{game.venue}</div>
                    <p className="text-base">
                      <span>{game.teamOne}</span> VS <span>{game.teamTwo}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Images */}
          <div>
            <img
              alt="duragcat"
              src={DuragCat}
              className="w-full rounded-lg bg-gray-200"
            />
          </div>
        </div>

        {/* Played Games */}
        <h2 className="mt-10 mb-5 w-full text-center text-3xl font-semibold tracking-tight text-balance text-gray-950 dark:text-white">Past Games</h2>
        <div className="w-full">
          <AdminTable
            headers={gameHeaders}
            data={games}
            onEdit={(game) => openGameModal(game._id)}
          />
        </div>
      </main>

      <Dialog open={open} onClose={closeModal} className="relative z-10">
        <DialogBackdrop className="fixed inset-0 bg-black/50" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="bg-white p-6 rounded w-full max-w-lg">
            {currentMode === 'team' && <TeamForm />}
            {currentMode === 'game' && <GameForm />}
          </DialogPanel>
        </div>
      </Dialog>

      <Footer />
    </div>
  );

}
