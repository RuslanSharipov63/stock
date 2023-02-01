import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUserImg = createAsyncThunk(
    '@userimg/fetchUserImg',
    async function (id, { rejectWithValue }) {
        try {
            const response = await fetch(`http://localhost:8000/userimg/${id}`)
            const data = await response.text();
            return JSON.parse(data)

        } catch (error) {
            console.log(error)
            return rejectWithValue('Не удалось загрузить изображения')
        }


    })

export const fetchDeleteImg = createAsyncThunk(
    '@delete/fetchDeleteImg',
    async function (id, { rejectWithValue, dispatch }) {
        try {
            const response = await fetch(`http://localhost:8000/delete/${id}`)
            const data = await response.text();
            console.log(JSON.parse(data))
            /* return JSON.parse(data) */
            dispatch(deleteContent(JSON.parse(data)))
            await fetch(`http://localhost:8000/deletefile`)
        } catch (error) {
            console.log(error)
            return rejectWithValue('Ошибка. Попробуйте еще раз')
        }
    })

const userImgSlice = createSlice({
    name: '@userimg',
    initialState: {
        img: [],
        loading: null,
        error: null
    },
    reducers: {
        deleteContent: (state, action) => {
            state.img = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserImg.pending, (state) => {
                state.loading = 'Загрузка...';
                state.error = null
            })
            .addCase(fetchUserImg.fulfilled, (state, action) => {
                state.img = action.payload; 
                state.loading = null;
                state.error = null;
            })
            .addCase(fetchUserImg.rejected, (state) => {
                state.loading = null;
                state.error = 'Ошибка загрузки';
            })
            .addCase(fetchDeleteImg.pending, (state) => {
                state.loading = 'Загрузка';
                state.error = null
            })
            .addCase(fetchDeleteImg.fulfilled, (state, action) => {
                state.img = action.payload;
                state.loading = 'Удаление прошло успешно';
                state.error = null;
            })
            .addCase(fetchDeleteImg.rejected, (state) => {
                state.loading = null;
                state.error = 'Произошла ошибка'
            })
    }
})
export const { deleteContent } = userImgSlice.actions;
export default userImgSlice.reducer;