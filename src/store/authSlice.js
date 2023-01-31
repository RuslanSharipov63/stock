import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchRegistrationSlice = createAsyncThunk(
    '@registration/fetchRegistrationSlice',
    async function (user, { rejectWithValue }) {
        const formData = new FormData();
        formData.append('name', user.name)
        formData.append('email', user.email)
        formData.append('password', user.password)
        try {
            const response = await fetch('http://localhost:8000/Registration', {
                method: 'POST',
                body: formData,
            });
            const message = await response.text();
            const m = JSON.parse(message)
            return m.message;

        } catch (message) {
            return rejectWithValue(message);
        }

    }
)


export const fetchAuthSlice = createAsyncThunk(
    '@auth/fetchAuthSlice',
    async function (userIsAuth, { rejectWithValue, dispatch }) {
        const formData = new FormData();
        formData.append('email', userIsAuth.email)
        formData.append('password', userIsAuth.password)
        try {
            const response = await fetch('http://localhost:8000/Auth', {
                method: 'POST',
                body: formData,
            })

            const message = await response.text();
            const m = await JSON.parse(message)
            const token = await m.token;
            localStorage.setItem('token', token)
            dispatch(fetchIsToken())

            /* 
                    const responseTwo = await fetch('http://localhost:8000/jwt', {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        })
                        const isMessageToken = await responseTwo.text();
                        const responseToken = await JSON.parse(isMessageToken)
                        console.log(responseToken)
                        return responseToken.message;}*/
        } catch (error) {
            return rejectWithValue('Ошибка соединения');

        }
    }
)

export const fetchIsToken = createAsyncThunk(
    '@isToken/fetchIsToken',
    async function () {
        try {
            const tokenFromLS = await localStorage.getItem('token');
            const response = await fetch('http://localhost:8000/jwt', {
                headers: {
                    'Authorization': `Bearer ${tokenFromLS}`
                }
            })
            const isMessageToken = await response.text();
            const responseToken = await JSON.parse(isMessageToken)
            return responseToken;
        } catch (error) {
            return 'Ошибка авторизации'
        }

    }

)

export const isAuthUsersSlice = createSlice({
    name: '@isAuthUsers',
    initialState: {
        loading: null,
        error: null,
        isTokenId: null,
    },
    reducers: {
        toggleLoading: (state, action) => {
            state.loading = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRegistrationSlice.fulfilled, (state, action) => {
                state.loading = action.payload
            })
            .addCase(fetchRegistrationSlice.rejected, (state, action) => {
                state.error = action.payload
            })
            .addCase(fetchIsToken.pending, (state) => {
                state.loading = 'loading'
                state.error = null
            })
            .addCase(fetchIsToken.fulfilled, (state, action) => {
                state.loading = action.payload.message;
                state.isTokenId = action.payload.id
                state.error = null
            })
            .addCase(fetchIsToken.rejected, (state, action) => {
                state.loading = null;
                state.error = action.payload.message
            })
    }

})

export const { toggleLoading } = isAuthUsersSlice.actions;
export default isAuthUsersSlice.reducer;