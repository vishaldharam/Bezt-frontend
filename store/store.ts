"use client"
import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "../slices/UserSlice";
import ProfileSlice from "../slices/ProfileSlice";

export const store = configureStore({
    reducer:{
        user:UserSlice,
        profile:ProfileSlice
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch