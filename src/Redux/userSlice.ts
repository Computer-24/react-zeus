import {createSlice} from "@reduxjs/toolkit";
import {userType} from "../Types";

export const userStorageName = "superhero_user";
export const defaultUser: userType = {
    id: "",
    username: "",
    email: "",
    isOnline: false,
    img: "",
    creationTime: "",
    lastSeen: "",
    bio: "",
}
const initialState = {
    currentUser: defaultUser,
}


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            const user = action.payload

            localStorage.setItem(userStorageName, JSON.stringify(user))
            state.currentUser = user
        },
        setUsers: (state, action) => {
        },
    }
})

export const {setUser, setUsers} = userSlice.actions
export default userSlice.reducer
