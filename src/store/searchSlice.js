import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"


const _BASEURL = 'http://localhost:8000/';

export const fetchSearch = createAsyncThunk(
    '@search/fetchSearch',
    async function (search, { rejectWithValue }) {
        try {
            const response = await fetch(`${_BASEURL}searchpage/${search}`);
            const data = await response.text();
            return JSON.parse(data)
        } catch (error) {
            return rejectWithValue('Ошибка запроса на сервер')
        }
    }
)

const searchSlice = createSlice({
    name: '@search',
    initialState: {
        data: [],
        status: null,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSearch.pending, (state) => {
                state.status = 'Загрузка...';
                state.error = null;
            })
            .addCase(fetchSearch.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = null;
                state.error = null
            })
            .addCase(fetchSearch.rejected, (state, action) => {
                state.status = null;
                state.error = action.payload
            })
    }
})

export default searchSlice.reducer;