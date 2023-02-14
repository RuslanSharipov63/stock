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
            await dispatch(deleteContent(JSON.parse(data)))
            await fetch(`http://localhost:8000/deletefile`)
        } catch (error) {
            console.log(error)
            return rejectWithValue('Ошибка. Попробуйте еще раз')
        }
    })


export const fetchAddContent = createAsyncThunk(
    '@alldata/fetchAddContent',
    async function (content, { rejectWithValue, dispatch }) {
        const formData = new FormData();
        formData.append('id', content.id)
        formData.append('file', content.img)
        formData.append('tags', content.tags)
        try {
            const response = await fetch('http://localhost:8000/add', {
                method: 'POST',
                body: formData,
            });
            const data = await response.text();
            dispatch(addContent(JSON.parse(data)))
            /*  return JSON.parse(data); */
        } catch (error) {
            return rejectWithValue('Ошибка');
        }
    }


)


export const fetchImgAuthorId = createAsyncThunk(
    '@imgauthorid/fetchImgAuthorId',
    async function (id, { rejectWithValue }) {
        try {
            const response = await fetch(`http://localhost:8000/authorimg/${id}`)
            const data = await response.text();
            return JSON.parse(data)
        } catch (error) {
            console.log(error)
            return rejectWithValue(error)
        }

    }
)

const userImgSlice = createSlice({
    name: '@userimg',
    initialState: {
        img: [],
        loading: null,
        error: null
    },
    reducers: {
        addContent: (state, action) => {
            state.img = action.payload;
        },
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
                /*  state.img = action.payload; */
                state.loading = 'Удаление прошло успешно';
                state.error = null;
            })
            .addCase(fetchDeleteImg.rejected, (state) => {
                state.loading = null;
                state.error = 'Произошла ошибка'
            })
            .addCase(fetchAddContent.fulfilled, (state, action) => {
                /* state.img = action.payload; */
                state.status = 'Файл загружен'
                state.error = null

            })
            .addCase(fetchAddContent.rejected, (state) => {
                state.error = 'Произошла ошибка';
                state.error = null;

            })
            .addCase(fetchImgAuthorId.pending, (state) => {
                state.loading = 'Загрузка';
                state.error = null
            })
            .addCase(fetchImgAuthorId.fulfilled, (state, action) => {
                state.img = action.payload;
                state.error = null;
                state.loading = null;
            })
            .addCase(fetchImgAuthorId.rejected, (state, action) => {
                state.loading = null;
                state.error = action.payload
            })

    }
})
export const { deleteContent, addContent } = userImgSlice.actions;
export default userImgSlice.reducer;