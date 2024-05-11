import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Outlet, NavLink } from 'react-router-dom';
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Provider, useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import axios, { AxiosResponse } from 'axios';
import createSagaMiddleware from 'redux-saga';
import { fork, all } from 'redux-saga/effects';
import { call, put, takeLatest, delay } from 'redux-saga/effects';
import ProximaNova from './proximanova_regular.ttf';

// Это универсальная заготовка для Vite.js React RTK Saga Router

/**
 * TYPESCRIPT
 */

/**
 * If you want to get the Dispatch type from your store, you can extract it after creating the store.
 * It is recommended to give the type a different name like AppDispatch to prevent confusion,
 * as the type name Dispatch is usually overused. You may also find it to be more convenient
 * to export a hook like useAppDispatch shown below, then using it wherever you'd call useDispatch.
 * https://redux-toolkit.js.org/usage/usage-with-typescript
 */

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
const useAppDispatch: () => AppDispatch = useDispatch;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// declares an interface named UserState
// any object that implements the UserState interface
// must have list property that holds object and isLoading that holds boolean.
interface UserState {
  list: User[];
  isLoading: boolean;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Geo {
  lat: string;
  lng: string;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface PreloaderProps {
  className?: string | undefined;
}

interface ButtonProps {
  title: string;
}

/**
 * Components
 */

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="news" element={<About />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}

function Nav(): JSX.Element {
  return (
    <StyledNavContainer>
      <Logo>Логотип</Logo>
      <StyledNavigation>
        <Cell>
          <StyledNavLink to="/">Главная</StyledNavLink>
        </Cell>
        <Cell>
          <StyledNavLink to="/news">Новости</StyledNavLink>
        </Cell>
        <Cell>
          <StyledNavLink to="/dashboard">Контакты</StyledNavLink>
        </Cell>
      </StyledNavigation>
    </StyledNavContainer>
  );
}

function Layout(): JSX.Element {
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Nav />
        <Outlet />
      </Wrapper>
    </>
  );
}

function Dashboard(): JSX.Element {
  return (
    <Content>
      <StyledButton title="Получить" />
    </Content>
  );
}

function StyledButton({ title }: ButtonProps) {
  return <FlexButton>{title}</FlexButton>;
}

function About(): JSX.Element {
  return (
    <Content>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
    </Content>
  );
}

function Home(): JSX.Element {
  const dispatch = useAppDispatch();
  const list = useAppSelector(selectUsers);
  const isLoading = useAppSelector(isLoadingUsers);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (isLoading)
    return (
      <ContentWhileLoad>
        <StyledPreloader />
      </ContentWhileLoad>
    );

  return (
    <Content>
      {list && (
        <>
          {list.map((i) => (
            <div key={i.id}>
              {i.name} {i.email} {i.website}
            </div>
          ))}
        </>
      )}
    </Content>
  );
}

const Preloader = ({ className }: PreloaderProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
      <path d="M12 23a9.63 9.63 0 0 1-8-9.5 9.51 9.51 0 0 1 6.79-9.1A1.66 1.66 0 0 0 12 2.81a1.67 1.67 0 0 0-1.94-1.64A11 11 0 0 0 12 23Z" />
    </svg>
  );
};

// Этот компонент рендерится когда неправильный путь в адресной строке
function NoMatch(): JSX.Element {
  return (
    <Content>
      <h2>Ничего не найдено!</h2>
      <p>
        <NavLink to="/">Вернуться на главную страницу</NavLink>
      </p>
    </Content>
  );
}

/**
 * REDUX
 */

/**
 * The standard approach is to declare an interface or type for your state,
 * create an initial state value that uses that type, and pass the initial state value to createSlice.
 * https://redux-toolkit.js.org/usage/usage-with-typescript
 */
const initialState: UserState = {
  list: [],
  isLoading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    fetchUser: (state) => ({
      ...state,
      isLoading: true,
    }),
    fetchUserSuccess: (state, action: PayloadAction<User[]>) => {
      return {
        ...state,
        list: action.payload,
        isLoading: false,
      };
    },
    fetchUserError: (state) => ({
      ...state,
      isLoading: false,
    }),
  },
});

const { fetchUser, fetchUserSuccess, fetchUserError } = userSlice.actions;
const user = userSlice.reducer;

// By keeping these functions outside the component,
// you can reuse them in any other component that needs to access
// the same data from the Redux store. This promotes code DRYness
// These selectors typically reside in a separate file dedicated to Redux store selectors.
// This keeps your component files focused on UI logic and data consumption.

/**
 * When the selector does only depend on the state,
 * simply ensure that it is declared outside of the component
 * so that the same selector instance is used for each render
 * https://react-redux.js.org/api/hooks
 */

const selectUsers = (state: RootState) => state.user.list;
const isLoadingUsers = (state: RootState) => state.user.isLoading;

/**
 * SAGA
 */

// Создание миддлвары
const sagaMiddleware = createSagaMiddleware();

// Helper для запроса на сервер
// Optionally throw a custom error or return a default value
const fetchUserApi = async () => {
  try {
    const response: AxiosResponse<User[]> = await axios.get(`https://jsonplaceholder.typicode.com/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

// Сага-рабочий (worker saga)
function* fetchUserSaga() {
  try {
    const response: User[] = yield call(fetchUserApi);
    let res = response.slice(0, 3);
    yield delay(1000);
    yield put(fetchUserSuccess(res));
  } catch (error) {
    yield delay(1000);
    yield put(fetchUserError());
  }
}

// Сага-наблюдатель (watcher saga)
export function* watchUser() {
  yield takeLatest('user/fetchUser', fetchUserSaga);
}

export default function* rootSaga() {
  yield all([fork(watchUser)]);
}

/**
 *  Alternatively, if you choose to not create a rootReducer yourself and instead pass the slice reducers
 *  directly to configureStore(), you need to slightly modify the typing to correctly infer the root reducer:
 *  type RootState = ReturnType<typeof store.getState>
 *  https://redux-toolkit.js.org/usage/usage-with-typescript
 */

// Создание стора
const store = configureStore({
  reducer: { user },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([sagaMiddleware]),
  devTools: true,
});

sagaMiddleware.run(rootSaga);

const theme: Readonly<Record<string, string>> = {
  chineseBlack: '#141414',
  eclipse: '#3A3A3A',
  blue: '#0371E3',
  lightGrey: '#DBDBDB',
  white: '#fff',
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);

/**
 * Styled components
 */

const StyledPreloader = styled(Preloader)`
  height: 50px;
  width: 50px;
  will-change: filter;
  transition: filter 300ms;
  fill: ${(props) => props.theme.blue};
  animation: preloader-spin infinite 0.75s linear;

  @keyframes preloader-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: Helvetica, Arial, sans-serif; 
  }

  *{
    box-sizing: border-box;
  }

  a {
    color:white;
  }
`;

/**
 * Outer wrapper
 */

const Wrapper = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;

  // padding: 40px 50px;

  @media (max-width: 800px) {
    // padding: 10px;
  }
`;

/**
 * Navigation
 */

const StyledNavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 45px;
  font-size: 25px;
  background-color: ${(props) => props.theme.eclipse};
  padding: 0 50px;
  overflow: hidden;
  @media (max-width: 800px) {
    height: 35px;
    padding: 0px 20px;
  }
`;

const StyledNavigation = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0px;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  list-style: none;
  overflow: hidden;
  user-select: none;
  height: 45px;
  @media (max-width: 800px) {
    padding: 0px;
    height: 35px;
  }
`;

const Cell = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
  padding: 0px 20px 0px 0px;
  @media (max-width: 800px) {  
    height: 35px;
    padding: 0px 15px 0px 0px;
  }
}
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
  width: 200px;
  font-size: 20px;
  padding: 0;
  overflow: hidden;
  @media (max-width: 800px) {
    height: 35px;
    width: 150px;
  }
`;

const StyledNavLink = styled(NavLink)`
  color: ${(props) => props.theme.lightGrey};
  text-decoration: none;
  font-size: 14px;
  height: 45px;
  line-height: 45px;
  opacity: 0.8;
  transition: color 0.3s ease-out, opacity 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);

  &:hover {
    opacity: 1;
  }

  // How to style an active NavLink
  // check for existence of the active class
  &[class*='active'] {
    color: ${(props) => props.theme.blue};
    opacity: 1;
  }

  @media (max-width: 800px) {
    font-size: 13px;
    height: 35px;
    line-height: 35px;
    outline: none;
  }
`;

/**
 * Button
 */

const FlexButton = styled.button`
  display: block;
  outline: none;
  cursor: pointer;
  border-radius: 3px;
  padding: 0 16px;
  border-radius: 4px;
  color: ${(props) => props.theme.white};
  background-color: ${(props) => props.theme.blue};
  font-size: 14px;
  height: 36px;
  text-decoration: none;
  text-transform: uppercase;
  min-width: 64px;
  border: none;
  text-align: center;
  &:hover {
    background-color: ${(props) => props.theme.blue};
  }
`;

/**
 * Wrapper for pages
 */

const Content = styled.div`
  height: calc(100vh - 45px);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  @media (max-width: 800px) {
    height: calc(100vh - 35px);
    padding: 20px;
  }
`;

const ContentWhileLoad = styled.div`
  height: calc(100vh - 45px);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 800px) {
    height: calc(100vh - 35px);
  }
`;
