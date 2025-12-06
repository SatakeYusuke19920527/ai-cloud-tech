import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import drillSlice from '../features/drillSlice';

export const store = configureStore({
  reducer: {
    drill: drillSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
