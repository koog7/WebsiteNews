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
    oneNews: News[];
    allComments: Comments[]
    loading: boolean;
    error: boolean;
}
const initialState: NewsState = {
    allNews: [],
    oneNews: [],
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

export const getOneNews = createAsyncThunk<News[], string ,  { state: RootState }>('news/getOneNews', async (id: string) => {
    try{
        const response = await axiosAPI.get<News[]>(`/news/${id}`);
        return response.data.map(item => ({
            id: item.id,
            title: item.title,
            description: item.description,
            image: item.image,
            date: item.date,
        }));
    }catch (error) {
        console.error('Error:', error);
    }
});


export const getMessages = createAsyncThunk<Comments[], string ,  { state: RootState }>('message/getNews', async (id) => {
    try{
        const response = await axiosAPI.get<Comments[]>(`/comments?news_id=${id}`);
        return response.data.map(item => ({
            id: item.id,
            idNews: item.idNews,
            author: item.author,
            text: item.text,
        }));
    }catch (error) {
        console.error('Error:', error);
    }
});


export const postNews = createAsyncThunk<News[], { title: string; description: string; image?: File }>(
    'news/postNews',
    async ({ title, description, image}) => {
        try {
            const formData = new FormData();
            formData.append('title', title)
            formData.append('description', description)

            if(image){
                formData.append('image', image)
            }
            const response = await axiosAPI.post(`/news` , formData);
            return response.data;
        } catch (error) {
            return error.message;
        }
    }
);


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
        }).addCase(getNews.rejected, (state: NewsState) => {
            state.loading = false;
            state.error = true;
        }).addCase(getOneNews.pending, (state: NewsState) => {
            state.error = false;
        }).addCase(getOneNews.fulfilled, (state: NewsState, action: PayloadAction<News[]>) => {
            state.loading = false;
            state.oneNews = action.payload;
        }).addCase(getOneNews.rejected, (state: NewsState) => {
            state.loading = false;
            state.error = true;
        }).addCase(getMessages.pending, (state: NewsState) => {
            state.error = false;
        }).addCase(getMessages.fulfilled, (state: NewsState, action: PayloadAction<Comments[]>) => {
            state.loading = false;
            state.allComments = action.payload;
            console.log(state.allComments)
        }).addCase(getMessages.rejected, (state: NewsState) => {
            state.loading = false;
            state.error = true;
        }).addCase(postNews.pending, (state: NewsState) => {
            state.error = false;
        }).addCase(postNews.fulfilled, (state: NewsState, action: PayloadAction<News[]>) => {
            state.loading = false;
        }).addCase(postNews.rejected, (state: NewsState) => {
            state.loading = false;
            state.error = true;
        });
    },
})

export const NewsReducer = NewsSlice.reducer;
export const  {setError}  = NewsSlice.actions;