import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk(
    '@user/fetchUser',
    async function (id, { rejectWithValue }) {
        try {
            const response = await fetch(`http://localhost:8000/account/${id}`);
            const user = await response.text()
            return  JSON.parse(user)
         
        } catch (error) {
            console.log(error)
            return rejectWithValue('Ошибка')
        }

    }
)

 const userSlice = createSlice({
    name: '@user',
    initialState: {
        user: [],
        loading: null,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = null
                state.error = null
            })
            .addCase(fetchUser.pending, (state) => {
                state.loading = 'Идет загрузка'
                state.error = null
            })
            .addCase(fetchUser.rejected, (state) => {
                state.error = 'Ошибка загрузки'
                state.loading = null
            })
    }
})


export default userSlice.reducer;