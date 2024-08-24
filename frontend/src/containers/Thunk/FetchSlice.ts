import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import axiosAPI from "../../axios/AxiosAPI.ts";

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

export const getNews = createAsyncThunk<News[], { state: RootState }>('news/getNews', async () => {
    try{
        const response = await axiosAPI.get<News[]>(`/news`);
        return response.data.map(item => ({
            id: item.id,
            title: item.title,
            image: item.image,
            date: item.date,
        }));
    }catch (error) {
        console.error('Error:', error);
    }
});

export const NewsSlice = createSlice({
    name:'news',
    initialState,
    reducers:{
        setError: (state, action: PayloadAction<boolean>) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getNews.pending, (state: NewsState) => {
            state.error = false;
        }).addCase(getNews.fulfilled, (state: NewsState, action: PayloadAction<News[]>) => {
            state.loading = false;
            state.allNews = action.payload;
            console.log(state.allNews)
        }).addCase(getNews.rejected, (state: NewsState) => {
            state.loading = false;
            state.error = true;
        });
    },
})

export const NewsReducer = NewsSlice.reducer;
export const  {setError}  = NewsSlice.actions;