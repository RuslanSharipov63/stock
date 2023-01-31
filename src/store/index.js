import { configureStore } from '@reduxjs/toolkit';
import allDataSlice from './allDataSlice';
import isAuthUsersSlice from './authSlice';
import userSlice from './userSlice';
import userImgSlice from './userImgSlice';

export const store = configureStore({
    reducer: {
        allDataSlice: allDataSlice,
        isAuth: isAuthUsersSlice,
        user: userSlice,
        userimg: userImgSlice,
    }
})