import {createSlice} from '@reduxjs/toolkit'

const radiusSlice = createSlice({
    name: 'radius',
    initialState: {
        radius: 1
    },
    reducers: {
        setRadius: (state, action) => {
            state.radius = action.payload;
        }
    }
})

export const {setRadius} = radiusSlice.actions;
export default radiusSlice;
