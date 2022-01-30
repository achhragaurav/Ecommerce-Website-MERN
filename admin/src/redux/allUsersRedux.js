import {createSlice} from "@reduxjs/toolkit";


const allUsersSlice = createSlice({
    name: "allusers",
    initialState:{
    allusersData:[],
    isFetching: false,
    error: false,
    },
    reducers:{
    //    GET ALL
    getUsersStart:(state) =>{
        state.isFetching = true;
        state.error = false
    },
    getUsersSuccess:(state, action) =>{
        state.isFetching = false;
        state.allusersData = action.payload
    },
    getUsersFailure:(state, action) =>{
        state.isFetching = false;
        state.error = true
    },
    // Delete
    deleteUserStart:(state) =>{
        state.isFetching = true;
        state.error = false
    },
    deleteUserSuccess:(state, action) =>{
        state.isFetching = false;
        console.log(action.payload);
       state.allusersData.splice(
            state.allusersData.findIndex(item=>item._id===action.payload.id),1
        )
    },
    deleteUserFailure:(state, action) =>{
        state.isFetching = false;
        state.error = true
    },
    updateUserStart:(state) =>{
        state.isFetching = true;
        state.error = false
    },
    updateUserSuccess:(state, action) =>{
        state.isFetching = false;
        state.allusersData[state.allusersData.findIndex((item) => item._id === action.payload.id)] = 
        action.payload.allusersData
    },
    updateUserFailure:(state, action) =>{
        state.isFetching = false;
        state.error = true
    },
    addUserStart:(state) =>{
        state.isFetching = true;
        state.error = false
    },
    addUserSuccess:(state, action) =>{
        state.isFetching = false;
        state.allusersData.push(action.payload)
    },
    addUserFailure:(state, action) =>{
        state.isFetching = false;
        state.error = true
    },
    }
})

export const {getUsersStart,getUsersSuccess,getUsersFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    addUserStart,
    addUserSuccess,
    addUserFailure
} = allUsersSlice.actions;
export default allUsersSlice.reducer;
