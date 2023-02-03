import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchAllData = createAsyncThunk(
    '@alldata/fetchAllData',
    async function (_, { rejectWithValue }) {
        try {
            const response = await fetch('http://localhost:8000')
            if (!response.ok) {
                throw new Error('Server Error!')
            }
            const data = await response.text();
            return JSON.parse(data);
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }

)

export const fetchImgForId = createAsyncThunk(
    '@imgforid',
    async function (id, { rejectWithValue, dispatch }) {
        try {
            const response = await fetch(`http://localhost:8000/${id}`)
            const data = response.text();
            dispatch(JSON.parse(filterImgForId(data)));
        } catch (error) {
            return rejectWithValue(error)
        }

    }
)

/* const setError = (state, action) => {
    state.status = 'rejected';
    state.error = action.payload;
} */

export const allDataSlice = createSlice({
    name: '@alldata',
    initialState: {
        data: [],
        status: null,
        error: null,
    },
    reducers: {
        filterImgForId: (state, action) => {
            state.data = action.payload;
            state.status = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllData.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchAllData.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = null
            })


    }
})

export const { filterImgForId } = allDataSlice.actions;
export default allDataSlice.reducer;