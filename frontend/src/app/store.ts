import {configureStore} from '@reduxjs/toolkit';
import {NewsReducer} from "../containers/Thunk/FetchSlice.ts";


export const store = configureStore({
    reducer: {
        news: NewsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;