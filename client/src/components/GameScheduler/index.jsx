import createDates from "../../../utils/createDates"
import { useState } from "react"
import { useQuery } from "@apollo/client/react"

export default function GameScheduler () {
  const week = createDates();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {week.map((day) => (
        <div key={day.date} className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-xs focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-600 hover:border-gray-400 dark:border-white/10 dark:bg-gray-800/50 dark:shadow-none dark:focus-within:outline-indigo-500 dark:hover:border-white/25">
          <div className="shrink-0">
            <p className="size-10 rounded-full bg-gray-300 outline -outline-offset-1 outline-black/5 dark:bg-gray-700 dark:outline-white/10">
              {day.dayNameShort}
            </p>
          </div>
          <div>
            <div className="focus:outline-hidden">
              <span aria-hidden="true" className="absolute inset-0" />
              <p className="text-sm font-medium text-gray-900 dark:text-white">{day.date}</p>
              <p className="truncate text-sm text-gray-500 dark:text-gray-400">{day.dayNameLong}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
};