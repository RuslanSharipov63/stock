import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const _BASEURL = 'http://localhost:8000/';

export const fetchRows = createAsyncThunk(
    '@rows/fetchRows',
    async function (param, { rejectWithValue }) {
        try {
            const response = await fetch(`${_BASEURL}rows/${param}`)
            const data = await response.text();
            return JSON.parse(data)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)


const rowsSlice = createSlice({
    name: '@rows',
    initialState: {
        rows: []
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRows.fulfilled, (state, action) => {
                state.size = action.payload
            })
            .addCase(fetchRows.rejected, (state, action) => {
                state.size = action.payload
            })
    }
})

export default rowsSlice.reducer;