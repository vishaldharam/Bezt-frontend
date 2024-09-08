import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface userProfileType {
    id?:string,
    userId?:string,
    email?:string,
    gender?:string,
    address?:string,
    pincode?:string,
    city?:string,
    state?:string,
    country?:string
}

interface profiletate {
    profile: userProfileType,
    isProfileLoading: Boolean,
    profileError: string
    // Add other state properties if needed
  }


export const getUserProfile = createAsyncThunk('profile/getUserProfile', 
    async (id: string , thunkApi) => {

   
   
    const response = await fetch(`https://bezt-assignment-backend.onrender.com/profile/get-user-profile/${id}`, {
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    });

    const json = await response.json()
    return json;
})


export const createProfile = createAsyncThunk('profile/createProfile', 
    async (userData: userProfileType, thunkApi) => {

    const {userId, email, gender, address, pincode, city, state, country} = userData;
   
    const response = await fetch('https://bezt-assignment-backend.onrender.com/profile/create-user-profile', {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            userId, email, gender, address, pincode, city, state, country
        })
    });

    const json = await response.json()
    return json;
})
 
export const editUserProfile = createAsyncThunk('profile/editUserProfile', 
    async (userData: userProfileType, thunkApi) => {

        const {userId, gender, address, pincode, city, state, country} = userData;

   
    const response = await fetch(`https://bezt-assignment-backend.onrender.com/profile/update-user-profile/${userId}`, {
        method:"PATCH",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
             gender, address, pincode, city, state, country
        })
    });

    const json = await response.json()
    return json;
})

export const deleteUserProfile = createAsyncThunk('profile/deleteUserProfile', 
    async (id: string | undefined, thunkApi) => {

   
    const response = await fetch(`https://bezt-assignment-backend.onrender.com/profile/delete-user-profile/${id}`, {
        method:"DELETE",
        headers:{
            "Content-Type":"application/json"
        }
    });

    const json = await response.json()
    return json;
})

const initialState: profiletate = {
    profile: {},
    isProfileLoading: true,
    profileError: ''
}



const ProfileSlice = createSlice({
    name:"profile",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(getUserProfile.pending, (state) => {
            state.isProfileLoading = true;
        })
        builder.addCase(getUserProfile.fulfilled, (state, action) => {
            if(action.payload.profileError){
                state.isProfileLoading = false;
                state.profileError = action.payload.message;
            }
            else{
                state.profile = action.payload.profile;
                state.profileError = '';
                state.isProfileLoading = false;

            }
        })
        builder.addCase(createProfile.pending, (state) => {
            state.isProfileLoading = true;
        })
        builder.addCase(createProfile.fulfilled, (state, action) => {
            if(action.payload.profileError){
                state.isProfileLoading = false;
                state.profileError = action.payload.message;
            }
            else{
                state.profile = action.payload.profile;
                state.isProfileLoading = false;
                state.profileError = '';

            }
            
        })
        builder.addCase(editUserProfile.pending, (state) => {
            state.isProfileLoading = true
        })
        builder.addCase(editUserProfile.fulfilled, (state, action) => {
            if(action.payload.profileError){
                state.isProfileLoading = false;
                state.profileError = action.payload.message;
            }
            else{
                state.profile = action.payload.profile;
                state.isProfileLoading = false;
                state.profileError = ''

            }
            
        })
        builder.addCase(deleteUserProfile.pending, (state) => {
            state.isProfileLoading = true
        })
        builder.addCase(deleteUserProfile.fulfilled, (state, action) => {
            if(action.payload.profileError){
                state.isProfileLoading = false;
                state.profileError = action.payload.message;
            }
            else{
                
                state.profile = {};
                state.isProfileLoading = false;
                state.profileError = ''

            }
            
        })
    }
})

export default ProfileSlice.reducer