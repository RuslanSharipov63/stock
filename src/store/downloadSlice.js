import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchDownload = createAsyncThunk(
    '@download/fetchDownload',
    async function (nameImage, { rejectWithValue }) {
        const formData = new FormData();
        console.log(nameImage)
        formData.append('name', nameImage)
        try {
            const response = await fetch('http://localhost:8000/download', {
                method: 'POST',
                body: formData
            })
            const data = await response.text();
            return JSON.parse(data)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const downloadSlice = createSlice({
    name: '@download',
    initialState: {
        status: [],
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDownload.fulfilled, (state, action) => {
                state.status = action.payload
            })
            .addCase(fetchDownload.rejected, (state, action) => {
                state.status = action.payload;
            })
    }
})

export default downloadSlice.reducer;