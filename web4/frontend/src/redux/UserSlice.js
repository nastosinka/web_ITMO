import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: "guest",
    },
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload;
        }
    }
})

export const {setUsername} = userSlice.actions;
export default userSlice;
