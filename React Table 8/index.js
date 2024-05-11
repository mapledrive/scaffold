import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

const data = [
  {
    firstName: 'tanner',
    lastName: 'linsley',
    age: 24,
  },
  {
    firstName: 'tandy',
    lastName: 'miller',
    age: 40,
  },
  {
    firstName: 'joe',
    lastName: 'dirte',
    age: 45,
  },
];

const columns = [
  {
    accessorKey: 'firstName',
    header: 'First Name',
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
  },
  {
    accessorKey: 'age',
    header: 'Age',
  },
];

function App() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table cellSpacing='0' cellPadding='0'>
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// Самый простой пример таблицы
// Установить на CRA и восьмой @tanstack/react-table
