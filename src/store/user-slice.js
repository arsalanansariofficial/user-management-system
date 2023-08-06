import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    users: [],
    modalState: false,
    isLoading: false
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUsers(state, action) {
            state.users = action.payload;
        },
        setModalState(state, action) {
            state.modalState = action.payload;
        },
        setIsLoading(state, action) {
            state.isLoading = action.payload;
        }
    }
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
