import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/* запрос для одних только видео */
export const fetchDataVideos = createAsyncThunk(
    '@dataimages/fetchDataImages',
    async function (_, { rejectWithValue }) {
        try {
            const response = await fetch('http://localhost:8000/videos')
            const data = await response.text()
            return JSON.parse(data);
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


const videosPageSlice = createSlice({
    name: '@videospage',
    initialState: {
        data: [],
        status: null,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDataVideos.pending, (state) => {
                state.status = 'Загрузка';
                state.error = null;
            })
            .addCase(fetchDataVideos.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = null;
                state.error = null;
            })
            .addCase(fetchDataVideos.rejected, (action, state) => {
                state.status = null;
                state.error = action.payload;
            })
    }
})

export default fetchDataVideos.reducer;