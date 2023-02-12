import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/* запрос всех фотографий для главной страницы */
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

/* запрос для отдельной фотографии */
export const fetchImgForId = createAsyncThunk(
    '@imgforid/fetchImgForId',
    async function (id, { rejectWithValue }) {
        try {
            const response = await fetch(`http://localhost:8000/itempage/${id}`)
            const data = await response.text();
            return JSON.parse(data);
        } catch (error) {
            return rejectWithValue(error)
        }

    }
)

/* запрос для автора, который будет выводиться на странице с отдельным фото */

export const fetchAuthorid = createAsyncThunk(
    '@authorforid',
    async function (id, { rejectWithValue }) {
        try {
            const response = await fetch(`http://localhost:8000/author/${id}`)
            const data = await response.text();
            return JSON.parse(data);
        } catch (error) {
            return rejectWithValue(error)
        }

    }
)

/* const setError = (state, action) => {
    state.status = 'rejected';
    state.error = action.payload;
} */

const allDataSlice = createSlice({
    name: '@alldata',
    initialState: {
        data: [],
        status: null,
        error: null,
        author: [],
        imgOne: []
    },
    redusers: {
        searchMain: (state, action) => {
            return state.data.filter(item => item.tags.toLowerCase().includes(action.payload.toLowerCase()));
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllData.pending, (state) => {
                state.status = 'Загрузка...'
            })
            .addCase(fetchAllData.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = null
                state.error = null
            })
            .addCase(fetchImgForId.pending, (state) => {
                state.status = 'Загрузка';
                state.error = null
            })
            .addCase(fetchImgForId.fulfilled, (state, action) => {
                state.imgOne = action.payload;
                state.status = null;
                state.error = null;
            })
            .addCase(fetchImgForId.rejected, (state) => {
                state.status = null;
                state.error = 'Ошибка сервера'
            })
            .addCase(fetchAuthorid.pending, (state) => {
                state.status = 'Загрузка';
                state.error = null
            })
            .addCase(fetchAuthorid.fulfilled, (state, action) => {
                state.author = action.payload;
                state.status = null;
                state.error = null
            })
            .addCase(fetchAuthorid.rejected, (state, action) => {
                state.status = null;
                state.error = null;
            })
    }
})

export const { searchMain } = allDataSlice.actions;
export default allDataSlice.reducer;