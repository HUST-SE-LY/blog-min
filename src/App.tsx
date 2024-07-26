import { RouterProvider } from 'react-router-dom';
import router from './router';
import {
  ScrollPositionContext,
  initialState,
  scrollPositionReducer,
} from './store/scrollPositionStore';
import { useReducer } from 'react';

export const App = () => {
  const [state, dispatch] = useReducer(scrollPositionReducer, initialState);
  return (
    <ScrollPositionContext.Provider value={{ state, dispatch }}>
      <RouterProvider router={router}></RouterProvider>
    </ScrollPositionContext.Provider>
  );
};
