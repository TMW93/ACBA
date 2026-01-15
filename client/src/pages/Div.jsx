import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useLazyQuery } from '@apollo/client/react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';

import Nav from '../components/Nav';
import Footer from '../components/Footer';
import AdminTable from '../components/AdminTable';
import Auth from '../utils/auth';
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

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState(null); // 'team' | 'game'
  const [currentItem, setCurrentItem] = useState(null);
  const [currentTeam, setCurrentTeam] = useState(null);
  const [currentGame, setCurrentGame] = useState(null);
  const [currentMode, setCurrentMode] = useState(null);
  const [open, setOpen] = useState(false);

  const [teamFormState, setTeamFormState] = useState({});
  const [gameFormState, setGameFormState] = useState({});

  const [teamQuery, { data: teamData }] = useLazyQuery(QUERY_SINGLE_TEAM);
  const [gameQuery, { data: gameData }] = useLazyQuery(QUERY_SINGLE_GAME);

  const { loading, error, data } = useQuery(QUERY_DIVISION_BY_SLUG, {
    variables: { slug },
  });

  useEffect(() => setMounted(true), []);

  const openModal = (item, mode) => {
    setCurrentItem(item);
    setModalMode(mode);
    setFormState({ ...item });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentItem(null);
    setFormState({});
    setModalMode(null);
  };

  // Handle team modal open
  const handleTeamClick = (teamId) => {
    setCurrentTeam(teamId);
    setCurrentMode('team');
    setOpen(true);
    teamQuery({ variables: { teamId } });
  };

  // Handle game modal open
  const handleGameClick = (gameId) => {
    setCurrentGame(gameId);
    setCurrentMode('game');
    setOpen(true);
    gameQuery({ variables: { gameId } });
  };

  // Sync team data when fetched
  useEffect(() => {
    if (teamData?.teamById) {
      setTeamFormState({
        name: teamData.teamById.name,
        wins: teamData.teamById.wins,
        losses: teamData.teamById.losses,
        draws: teamData.teamById.draws,
        totalPoints: teamData.teamById.totalPoints,
      });
    }
  }, [teamData]);

  // Sync game data when fetched
  useEffect(() => {
    if (gameData?.game) {
      setGameFormState({
        date: gameData.game.date,
        winner: gameData.game.winner,
        loser: gameData.game.loser,
        scoreWinner: gameData.game.scoreWinner,
        scoreLoser: gameData.game.scoreLoser,
        teamOne: gameData.game.teamOne,
        teamTwo: gameData.game.teamTwo,
      });
    }
  }, [gameData]);

  if (!mounted || loading) return null;
  if (error) return <p>Error: {error.message}</p>;

  const division = data?.divisionBySlug || {};
  const sortedTeams = division.teams ? quickSortStandings(division.teams) : [];

  // Team Form Component
  const TeamForm = () => (
    <form className="mx-auto mt-8 max-w-lg grid gap-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        Update Team Info
      </h2>
      {['name', 'wins', 'losses', 'draws', 'totalPoints'].map((field) => (
        <div key={field}>
          <label className="block text-sm font-medium text-gray-900 dark:text-white">
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </label>
          <input
            type={field === 'name' ? 'text' : 'number'}
            name={field}
            value={teamFormState[field] || ''}
            onChange={(e) =>
              setTeamFormState({ ...teamFormState, [field]: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 focus:outline-indigo-600"
          />
        </div>
      ))}
      <div className="flex gap-4 mt-4">
        <button
          type="submit"
          className="flex-1 rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500"
        >
          Update
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="flex-1 rounded bg-gray-300 px-4 py-2 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </form>
  );

  // Game Form Component
  const GameForm = () => (
    <form className="mx-auto mt-8 max-w-lg grid gap-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        Update Game Info
      </h2>
      {['date', 'winner', 'loser', 'scoreWinner', 'scoreLoser'].map((field) => (
        <div key={field}>
          <label className="block text-sm font-medium text-gray-900 dark:text-white">
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </label>
          <input
            type={field.includes('score') ? 'number' : 'text'}
            name={field}
            value={gameFormState[field] || ''}
            onChange={(e) =>
              setGameFormState({ ...gameFormState, [field]: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 focus:outline-indigo-600"
          />
        </div>
      ))}
      <div className="flex gap-4 mt-4">
        <button
          type="submit"
          className="flex-1 rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500"
        >
          Update
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="flex-1 rounded bg-gray-300 px-4 py-2 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </form>
  );

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <Nav />
      <main className="flex-1 mx-auto max-w-7xl px-6 lg:px-8 py-16">
        {/* Division Title */}
        <h1 className="text-center text-4xl font-semibold text-gray-900 dark:text-white">
          {division.day} - {division.name}
        </h1>

        {/* Standings Table */}
        {/* <div className="mt-8 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300 dark:divide-white/15">
            <thead className="bg-gray-50 dark:bg-gray-800/75">
              <tr>
                {tableHeaders.map((h) => (
                  <th key={h} className="px-3 py-2 text-center text-sm font-semibold text-gray-900 dark:text-gray-200">
                    {h}
                  </th>
                ))}
                {Auth.loggedIn() && <th className="px-3 py-2 text-center">Edit</th>}
              </tr>
            </thead>
            <tbody>{renderTeamRows()}</tbody>
          </table>
        </div> */}
        <AdminTable
          headers={teamHeaders}
          data={sortedTeams}
          onEdit={(team) => openModal(team, 'team')} // only visible if logged in
          onDelete={(team) => console.log('Delete team:', team)}
          className="mt-8"
        />
        {/* Upcoming Games & Image */}
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white text-center mb-6">
              Upcoming Games
            </h2>
            {division.games?.map((game) => (
              <div key={game._id} className="mb-4 p-4 border rounded-lg shadow-sm dark:border-gray-700">
                <p className="font-bold">{game.date} - {game.time}</p>
                <p className="text-gray-700 dark:text-gray-300">{game.teamOne} VS {game.teamTwo}</p>
                <p className="text-gray-500 dark:text-gray-400">{game.venue}</p>
                {Auth.loggedIn() && (
                  <button
                    className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mt-2"
                    onClick={() => handleGameClick(game._id)}
                  >
                    Edit
                  </button>
                )}
              </div>
            ))}
          </div>
          <div>
            <img src={DuragCat} alt="duragcat" className="w-full rounded-lg" />
          </div>
        </div>

        {/* Past Games */}
        {/* <div className="mt-10 overflow-x-auto">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
            Past Games
          </h2>
          <table className="min-w-full divide-y divide-gray-300 dark:divide-white/15">
            <thead className="bg-gray-50 dark:bg-gray-800/75">
              <tr>
                {archiveHeaders.map((h) => (
                  <th key={h} className="px-3 py-2 text-center text-sm font-semibold text-gray-900 dark:text-gray-200">
                    {h}
                  </th>
                ))}
                {Auth.loggedIn() && <th className="px-3 py-2 text-center">Edit</th>}
              </tr>
            </thead>
            <tbody>{renderGameRows()}</tbody>
          </table>
        </div> */}
        <AdminTable
          headers={gameHeaders}
          data={games}
          onEdit={(game) => openModal(game, 'game')}   // only visible if logged in
          onDelete={(game) => console.log('Delete game:', game)}
          className="mt-10"
        />
      </main>

      {/* Modal */}
      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
        <DialogBackdrop className="fixed inset-0 bg-gray-500/75 dark:bg-gray-900/50" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg shadow-lg">
            {currentMode === 'team' ? <TeamForm /> : null}
            {currentMode === 'game' ? <GameForm /> : null}
          </DialogPanel>
        </div>
      </Dialog>

      <Footer />

      {/* {modalOpen && (
        <Modal onClose={closeModal}>
          {modalMode === 'team' && (
            <TeamForm
              team={currentItem}
              formState={formState}
              setFormState={setFormState}
              onCancel={closeModal}
              onSubmit={(e) => {
                e.preventDefault();
                console.log('Submit team:', formState);
                closeModal();
              }}
            />
          )}
          {modalMode === 'game' && (
            <GameForm
              game={currentItem}
              formState={formState}
              setFormState={setFormState}
              onCancel={closeModal}
              onSubmit={(e) => {
                e.preventDefault();
                console.log('Submit game:', formState);
                closeModal();
              }}
            />
          )}
        </Modal>
      )} */}
    </div>
  );



}
