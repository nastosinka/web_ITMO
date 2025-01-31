import {configureStore} from "@reduxjs/toolkit";
import radiusSlice from "./RadiusSlice.js";
import historySlice from "./HistorySlice.js";
import userSlice from "./UserSlice.js";

export default configureStore({
    reducer: {
        radiusReducer: radiusSlice.reducer,
        historyReducer: historySlice.reducer,
        userReducer: userSlice.reducer,
    },
});
