import Auth from '../../utils/auth';

export default function AdminTable({ headers, data, onEdit, onDelete }) {
  if (!data || data.length === 0) return <div></div>;

  const isAdmin = Auth.loggedIn();

  return (
    <section className="px-4 sm:px-6 lg:px-8 mt-5 mb-5">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow-sm outline-1 outline-black/5 sm:rounded-lg dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
              <table className="relative min-w-full divide-y divide-gray-300 dark:divide-white/15">
                <thead className="bg-gray-50 dark:bg-gray-800/75">
                  <tr>
                    {headers.map((header) => (
                      <th
                        key={header.key}
                        scope="col"
                        className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 dark:text-gray-200"
                      >
                        {header.label}
                      </th>
                    ))}
                    {isAdmin && (onEdit || onDelete) && (
                      <th className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 dark:text-gray-200">
                        Actions
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white dark:divide-white/10 dark:bg-gray-800/50">
                  {data.map((row) => (
                    <tr key={row._id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                      {headers.map((header) => (
                        <td
                          key={header.key}
                          className="px-3 py-4 text-center text-sm whitespace-nowrap text-gray-500 dark:text-gray-400"
                        >
                          {row[header.key]}
                        </td>
                      ))}
                      {isAdmin && (onEdit || onDelete) && (
                        <td className="px-3 py-4 text-center text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                          {onEdit && (
                            <button
                              onClick={() => onEdit(row)}
                              className="px-2 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-400"
                            >
                              Edit
                            </button>
                          )}
                          {onDelete && (
                            <button
                              onClick={() => onDelete(row)}
                              className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-400"
                            >
                              Delete
                            </button>
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
