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

export const fetchAddContent = createAsyncThunk(
    '@alldata/fetchAddContent',
    async function (content, { rejectWithValue, dispatch }) {
        const formData = new FormData();
        formData.append('id', content.id)
        formData.append('file', content.img)
        formData.append('tags', content.tags)
        console.log(content.id)
        try {
            const response = await fetch('http://localhost:8000', {
                method: 'POST',
                body: formData,
            });

            /*  if (!response.ok) {
                 throw new Error('Can\'t add content. Server error.');
             } */

            const data = await response.text();
            return JSON.parse(data);
        } catch (error) {
            return rejectWithValue('Ошибка');
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
  /*   reducers: {
        addContent(state, action) {
            state.data = action.payload
        },
    }, */
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllData.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchAllData.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = null
            })
            .addCase(fetchAddContent.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = 'Файл загружен'
                state.error = null

            })
            .addCase(fetchAddContent.rejected, (state, action) => {
                state.error = 'Произошла ошибка';

            })
            
    }
})

export const { addContent } = allDataSlice.actions;
export default allDataSlice.reducer;