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


const userImgSlice = createSlice({
    name: '@userimg',
    initialState: {
        img: [],
        loading: null,
        error: null
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
    }
})

export default userImgSlice.reducer;