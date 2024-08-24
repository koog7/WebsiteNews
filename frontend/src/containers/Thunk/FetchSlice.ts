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
    loader: boolean;
    error: boolean;
}
const initialState: NewsState = {
    allNews: [],
    oneNews: [],
    allComments: [],
    loader: false,
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

export const postMessage = createAsyncThunk<Comments[], { idNews: string; author: string; text: string; }>(
    'message/postMessage',
    async ({ idNews, author, text}) => {
        try {
            const message ={
                idNews: idNews,
                author: author,
                text: text,
            }
            console.log(message)
            const response = await axiosAPI.post(`/comments` , message);
            return response.data;
        } catch (error) {
            return error.message;
        }
    }
);

export const deleteMessage = createAsyncThunk<void, string>(
    'message/deleteMessage',
    async (id: string) => {
        try {
            const response = await axiosAPI.delete(`/comments/${id}`);
            return response.data.id;
        } catch (error) {
            return error.message;
        }
    }
);

export const deletePost = createAsyncThunk<string, string>(
    'news/deleteMessage',
    async (id: string) => {
        try {
            console.log('before delete')
            await axiosAPI.delete(`/news/${id}`);
            console.log('after delete')
            return id;
        } catch (error) {
            return error.message;
        }
    }
);

export const NewsSlice = createSlice({
    name:'news',
    initialState,
    reducers:{
        deleteComment: (state, action: PayloadAction<string>) => {
            state.allComments = state.allComments.filter(comment => comment.id !== action.payload);
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
        }).addCase(getMessages.rejected, (state: NewsState) => {
            state.loading = false;
            state.error = true;
        }).addCase(postNews.pending, (state: NewsState) => {
            state.error = false;
        }).addCase(postNews.fulfilled, (state: NewsState) => {
            state.loading = false;
        }).addCase(postNews.rejected, (state: NewsState) => {
            state.loading = false;
            state.error = true;
        }).addCase(postMessage.pending, (state: NewsState) => {
            state.error = false;
        }).addCase(postMessage.fulfilled, (state: NewsState, action: PayloadAction<Comments[]>) => {
            state.loading = false;
            state.allComments.push(action.payload);
        }).addCase(postMessage.rejected, (state: NewsState) => {
            state.loading = false;
            state.error = true;
        }).addCase(deleteMessage.pending, (state: NewsState) => {
            state.error = false;
        }).addCase(deleteMessage.fulfilled, (state: NewsState) => {
            state.loading = false;
        }).addCase(deleteMessage.rejected, (state: NewsState) => {
            state.loading = false;
            state.error = true;
        }).addCase(deletePost.pending, (state: NewsState) => {
            state.error = false;
        }).addCase(deletePost.fulfilled, (state: NewsState, action: PayloadAction<string>) => {
            state.loading = false;
            state.allNews = state.allNews.filter(news => news.id !== action.payload);
        }).addCase(deletePost.rejected, (state: NewsState) => {
            state.loading = false;
            state.error = true;
        });
    },
})

export const NewsReducer = NewsSlice.reducer;
export const  {deleteComment}  = NewsSlice.actions;