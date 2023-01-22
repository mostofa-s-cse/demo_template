import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = { p_id: 0, path: "" };

export const userSlice = createSlice({
    name: "program",
    initialState: { info: initialStateValue },
    reducers: {
        program: (state, action) => {
            state.info = action.payload;
        },
    },
});

export const { program } = userSlice.actions;

export default userSlice.reducer;
