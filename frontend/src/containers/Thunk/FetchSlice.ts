import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface News{
    id: string;
    title: string;
    description: string;
    image?: string | null;
    date: string;
}

interface Comments {
    id: string;
    idNews: string;
    author?: string;
    text: string;
}
interface NewsState {
    allNews: News[];
    allComments: Comments[]
    loading: boolean;
    error: boolean;
}
const initialState: NewsState = {
    allNews: [],
    allComments: [],
    loading: false,
    error: false,
};

export const NewsSlice = createSlice({
    name:'news',
    initialState,
    reducers:{
        setError: (state, action: PayloadAction<boolean>) => {
            state.error = action.payload;
        },
    },
})

export const NewsReducer = NewsSlice.reducer;
export const  {setError}  = NewsSlice.actions;