import Auth from '../../utils/auth';

export default function AdminTable({ headers, data, onEdit, onDelete }) {
  if (!data || data.length === 0) return <p>No data available.</p>;

  const isAdmin = Auth.loggedIn();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            {headers.map((header) => (
              <th
                key={header.key}
                scope="col"
                className="px-3 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-200"
              >
                {header.label}
              </th>
            ))}
            {isAdmin && (onEdit || onDelete) && (
              <th className="px-3 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
          {data.map((row) => (
            <tr key={row._id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
              {headers.map((header) => (
                <td
                  key={header.key}
                  className="px-3 py-2 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300"
                >
                  {row[header.key]}
                </td>
              ))}
              {isAdmin && (onEdit || onDelete) && (
                <td className="px-3 py-2 whitespace-nowrap text-sm flex gap-2">
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
  );
}
