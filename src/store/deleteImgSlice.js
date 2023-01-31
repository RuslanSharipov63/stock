import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchDeleteImg = createAsyncThunk(
    '@delete/fetchDeleteImg',
    async function (id, { rejectWithValue, dispatch }) {
        try {
            const response = fetch(`http://localhost:8000/delete/${id}`)
            const data = await response.text();
            return JSON.parse(data)
        } catch (error) {
            console.log(error)
            return rejectWithValue('Ошибка. Попробуйте еще раз')
        }
    })

const deleteImgSlice = createSlice({
    name: '@delete',
    initialState: [],
    loading: null,
    error: null,
    reducers: {
        deleteImg: (state, action) => {
            state = state.filter(item => item.id != action.payload.id)
        }
    }
})