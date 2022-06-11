import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    username: '',
    email: '',
    wallet_address: '',
    role: ''
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredential: (state, { payload: { username, email, wallet_address, role } }) => {
            state.username = username;
            state.email = email;
            state.wallet_address = wallet_address;
            state.role = role;
        },
        destoryCredential: (state) => {
            state.username = initialState.username;
            state.email = initialState.email;
            state.wallet_address = initialState.wallet_address;
            state.role = initialState.role;

            localStorage.removeItem('jwtToken');
        }
    },
});

export const { setCredential, destoryCredential } = authSlice.actions;
export default authSlice.reducer;