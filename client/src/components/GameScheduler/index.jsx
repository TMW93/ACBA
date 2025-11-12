import createDates from "../../../utils/createDates"
import { useState } from "react"
import SchedulerForm from "../SchedulerForm"

export default function GameScheduler () {
  const week = createDates();
  const [showForm, setShowForm] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    cardDate: '',
    cardDay: '',
  });

  const handleCardClick = (day, date) => {
    if(day === 'Sunday' || day === 'Monday' || day === 'Tuesday' || day === 'Wednesday' || day === 'Thursday') {
      setShowForm(true);
    } else {
      setShowForm(false);
    }
    setSelectedCard({
      ...selectedCard,
      cardDate: date,
      cardDay: day,
    });
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedCard({
      ...selectedCard,
      cardDate: '',
      cardDay: '',
    });
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {week.map((day) => (
        <div 
          key={day.date}
          className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-xs focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-600 hover:border-gray-400 dark:border-white/10 dark:bg-gray-800/50 dark:shadow-none dark:focus-within:outline-indigo-500 dark:hover:border-white/25"
          onClick={() => handleCardClick(day.dayNameLong, day.date)}
          >
          <div className="flex shrink-0">
            <p className="w-16 font-medium rounded-1-md items-center justify-center text-sm">
              {day.dayNameShort}
            </p>
          </div>
          <div>
            <div>
              <span aria-hidden="true" className="absolute inset-0"/>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{day.date}</p>
              <p className="truncate text-sm text-gray-500 dark:text-gray-400">{day.dayNameLong}</p>
            </div>
          </div>
        </div>
      ))}
      {showForm && (
        <SchedulerForm day={selectedCard.cardDay} date={selectedCard.cardDate} onClose={handleFormClose} dialogOpen={showForm}/>
      )}
    </div>
  )
};