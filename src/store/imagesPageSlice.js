import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/* запрос для одних только картинок */
export const fetchDataImages = createAsyncThunk(
    '@dataimages/fetchDataImages',
    async function (_, { rejectWithValue }) {
        try {
            const response = await fetch('http://localhost:8000/images')
            const data = await response.text()
            return JSON.parse(data);
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


const imagesPageSlice = createSlice({
    name: '@imagespage',
    initialState: {
        data: [],
        status: null,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDataImages.pending, (state) => {
                state.status = 'Загрузка';
                state.error = null;
            })
            .addCase(fetchDataImages.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = null;
                state.error = null;
            })
            .addCase(fetchDataImages.rejected, (action, state) => {
                state.status = null;
                state.error = action.payload;
            })
    }
})

export default imagesPageSlice.reducer;