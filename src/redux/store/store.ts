import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { reducer } from '../auth/auth';
import { api } from '../api/api';
import {reducer as toastrReducer} from 'react-redux-toastr'
import { setupListeners } from '@reduxjs/toolkit/query';
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};


const reducerSmain = combineReducers({
  auth: reducer,
  toastr: toastrReducer,
  [api.reducerPath]: api.reducer,
});

const persistedReducer  = persistReducer(persistConfig, reducerSmain)


export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(api.middleware),
})

setupListeners(store.dispatch)
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>