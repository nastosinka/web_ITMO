import {createSlice} from '@reduxjs/toolkit'

const historySlice = createSlice({
    name: 'history',
    initialState: {
        history: [],
        isDataLoaded: false
    },
    reducers: {
        setIsDataLoaded: (state, action) => {
            state.isDataLoaded = action.payload;
        },
        setHistory: (state, action) => {
            state.history = action.payload;
        },
        addToHistory: (state, action) => {
            state.history = [action.payload, ...state.history];
        }
    }
})

export const {setHistory, addToHistory, setIsDataLoaded} = historySlice.actions;
export default historySlice;
