import React, { useState } from 'react';

const users = [
  {
    email: "avdheshkumar41237@gmail.com",
    membership: "Active",
    productsOrdered: 5
  },
  {
    email: "johndoe@example.com",
    membership: "Inactive",
    productsOrdered: 10
  },
  {
    email: "janedoe@example.com",
    membership: "Active",
    productsOrdered: 15
  },
  {
    email: "alice@example.com",
    membership: "Inactive",
    productsOrdered: 3
  },
  {
    email: "bob@example.com",
    membership: "Active",
    productsOrdered: 8
  },
  {
    email: "charlie@example.com",
    membership: "Active",
    productsOrdered: 12
  },
  {
    email: "david@example.com",
    membership: "Inactive",
    productsOrdered: 7
  },
  {
    email: "eve@example.com",
    membership: "Active",
    productsOrdered: 6
  }
];

const ManageUsers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(3); // Adjust the number of users per page here

  // Logic for displaying users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-4 py-4">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className="text-lg font-semibold">Manage All Users</h2>
          </div>
        </div>
        <div className="mt-6 flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        <span>S.No</span>
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        Membership
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        No. of Products Ordered
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-4 text-left text-sm font-normal text-gray-700"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentUsers.map((user, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 text-left text-sm font-normal text-gray-700">{index + 1}</td>
                        <td className="px-12 py-3 text-left text-sm font-normal text-gray-700">{user.email}</td>
                        <td className="px-4 py-3 text-left text-sm font-normal text-gray-700">{user.membership}</td>
                        <td className="px-4 py-3 text-left text-sm font-normal text-gray-700">{user.productsOrdered}</td>
                        <td className="px-4 py-3 text-left">
                          <button>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                              <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${currentPage === 1 ? 'cursor-not-allowed' : 'hover:text-gray-700 hover:bg-gray-100'}`}
          >
          &larr; Previous
          </button>
          {[...Array(Math.ceil(users.length / usersPerPage))].map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 ${currentPage === index + 1 ? 'bg-gray-100' : 'hover:text-gray-500'}`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(users.length / usersPerPage)}
            className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${currentPage === Math.ceil(users.length / usersPerPage) ? 'cursor-not-allowed' : 'hover:text-gray-700 hover:bg-gray-100'}`}
          >
            Next &rarr;
          </button>
        </nav>
      </div>
    </>
  );
}

export default ManageUsers;
