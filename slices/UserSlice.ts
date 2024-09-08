import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface userType {
    id?:string,
    username?:string,
    phone?:string
}

interface UserState {
    users: userType[],
    isLoading: Boolean,
    error: string
    // Add other state properties if needed
  }

export const fetchAllUsers = createAsyncThunk('users/getAllUsers', async (thunkApi) => {
    const response = await fetch('https://bezt-assignment-backend.onrender.com/user/get-all-users');
    const json = await response.json()
    return json;
})

export const addUser = createAsyncThunk('users/addUser', 
    async (userData: userType, thunkApi) => {

    const {username, phone} = userData;
   
    const response = await fetch('https://bezt-assignment-backend.onrender.com/user/create-user', {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            username,
            phone
        })
    });

    const json = await response.json()
    return json;
})
 
export const editUser = createAsyncThunk('users/editUser', 
    async (userData: userType, thunkApi) => {

    const { phone, id} = userData;
   
    const response = await fetch(`https://bezt-assignment-backend.onrender.com/user/update-user/${id}`, {
        method:"PATCH",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            phone
        })
    });

    const json = await response.json()
    return json;
})

export const deleteUser = createAsyncThunk('users/deleteUser', 
    async (id: string | undefined , thunkApi) => {

    console.log(id)
    const response = await fetch(`https://bezt-assignment-backend.onrender.com/user/delete-user/${id}`, {
        method:"DELETE",
        headers:{
            "Content-Type":"application/json"
        }
    });

    const json = await response.json()
    return json;
})

const initialState: UserState = {
    users: [],
    isLoading: true,
    error: ''
}



const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchAllUsers.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
            if(action.payload.error){
                state.isLoading = false;
                state.error = action.payload.message;
            }
            else{
                state.users = action.payload.users;
                state.error = '';
                state.isLoading = false;

            }
        })
        builder.addCase(addUser.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(addUser.fulfilled, (state, action) => {
            if(action.payload.error){
                state.isLoading = false;
                state.error = action.payload.message;
            }
            else{
                state.users.push(action.payload.user);
                state.isLoading = false;
                state.error = '';

            }
            
        })
        builder.addCase(editUser.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(editUser.fulfilled, (state, action) => {
            if(action.payload.error){
                state.isLoading = false;
                state.error = action.payload.message;
            }
            else{
                const updatedUsers:userType[] = state.users.map((user)=> {
                    if(user.id === action.payload.user.id){
                        return action.payload.user
                    }
                    return user
                });


                state.users = updatedUsers;
                state.isLoading = false;
                state.error = ''

            }
            
        })
        builder.addCase(deleteUser.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            if(action.payload.error){
                state.isLoading = false;
                state.error = action.payload.message;
            }
            else{
                const updatedUsers:userType[] = state.users.filter((user)=> user.id !== action.payload.user.id)
                state.users = updatedUsers;
                state.isLoading = false;
                state.error = ''

            }
            
        })
    }
})

export default userSlice.reducer