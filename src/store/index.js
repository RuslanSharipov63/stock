import { configureStore } from '@reduxjs/toolkit';
import allDataSlice from './allDataSlice';
import isAuthUsersSlice from './authSlice';
import userSlice from './userSlice';
import userImgSlice from './userImgSlice';
import searchSlice from './searchSlice';
import downloadSlice from './downloadSlice';
import imagesPageSlice from './imagesPageSlice';
import videosPageSlice from './videosPageSlice';
import rowsSlice from './rowsSlice';

export const store = configureStore({
    reducer: {
        allDataSlice: allDataSlice,
        isAuth: isAuthUsersSlice,
        user: userSlice,
        userimg: userImgSlice,
        search: searchSlice,
        download: downloadSlice,
        imagesPage: imagesPageSlice,
        videosPage: videosPageSlice,
        rows: rowsSlice,
    }
})