
import { configureStore } from '@reduxjs/toolkit';
// Якщо ви використовуєте Redux-Persist, вам слід спеціально 
// ігнорувати всі типи дій, які він надсилає
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import { rootReducer } from './root-reducer';

// об'єкт налаштувань, в якому записані, які дані зберігати в Local Storage
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['contacts'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
//  це наш стор де ми передаємо редюсер це наш корневий root 
export const store = configureStore({
  reducer: persistedReducer,
  // список подій які треба ігнорувати
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// дані з локал сторіджа потрапляли відразу в redux під час завантаження
export const persistor = persistStore(store);