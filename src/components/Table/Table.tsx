import React, { useState } from 'react';

interface Props<T> {
  data: T[];
  itemsPerPage?: number;
  renderRow: (item: T, index: number) => React.ReactNode;
  headers: string[];
}

function Table<T>({ data, itemsPerPage = 10, renderRow, headers }: Props<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="w-full">
      <div className='overflow-y-auto'>
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-200">
              {headers.map((header, idx) => (
                <th key={idx} className="px-4 py-2 text-left">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? currentData.map((item, index) => (
              <tr key={index}>
                {renderRow(item, index)}
              </tr>
            ))
            : (
              <tr>
                <td colSpan={headers.length} className="px-4 py-2 text-center text-gray-500">No hay datos disponibles</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className="cursor-pointer px-3 py-1 rounded border border-blue-500 text-blue-500 bg-white hover:text-white hover:bg-blue-500 active:text-white active:bg-blue-500">
          Anterior
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i + 1)}
            className={`cursor-pointer px-3 py-1 border rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'border-blue-500 text-blue-500 bg-white hover:text-white hover:bg-blue-500' } active:text-white active:bg-blue-500`}
          >
            {i + 1}
          </button>
        ))}
        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className="cursor-pointer px-3 py-1 rounded border border-blue-500 text-blue-500 bg-white hover:text-white hover:bg-blue-500 active:text-white active:bg-blue-500">
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default Table;
