import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = 'http://localhost:8000';

const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: builder => ({
    getAlbums: builder.query({
      query: () => '/payments',
    }),
  }),
});

const store = configureStore({
  reducer: { [api.reducerPath]: api.reducer },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware),
});

const { useGetAlbumsQuery } = api;

function App() {
  const { data = [], isLoading, isFetching, isError } = useGetAlbumsQuery();
  if (isLoading || isFetching) {
    return <div>loading...</div>;
  }
  if (isError) {
    return <div>An error has occurred!</div>;
  }
  console.log(data);
  return (
    <ul>
      {data.map(doc => (
        <li key={doc.id}>
          {doc.id} - {doc.name} - {doc.partnername} - {doc.registeredat} -{' '}
          {doc.latestdocflowat} - {doc.directions} - {doc.name}
        </li>
      ))}
    </ul>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
