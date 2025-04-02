import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface NewsArticle {
    title: string;
    link: string;
    description: string;
    image_url: string | null;
    source_id: string;
    pubDate: string;
}

interface NewsState {
    data: NewsArticle[];
    status: string;
    error: string | null;
}

const initialState: NewsState = {
    data: [],
    status: "idle",
    error: null,
};

export const fetchNews = createAsyncThunk("news/fetch", async () => {
    const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY
    const res = await fetch(`https://newsdata.io/api/1/news?apikey=${API_KEY}&q=cryptocurrency`)

    if (!res.ok) {
        throw new Error("Failed to fetch news data")
    }

    const data = await res.json()
    return data.results.slice(0, 5)
})

const newsSlice = createSlice({
    name: "news",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNews.pending, (state) => {
                state.status = "loading"
            })
            .addCase(fetchNews.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.data = action.payload
            })
            .addCase(fetchNews.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message ?? "Something went wrong"
            });
    },
})

export default newsSlice.reducer

