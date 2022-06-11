import { sendRequest } from "./api";

export const loginUser = ({ wallet_address, email, password }) => {
    return sendRequest({
        url: '/auth/login',
        method: 'POST',
        data: {
            wallet_address, email, password
        }
    });
}

export const registerUser = ({ username, email, password, wallet_address }) => {
    return sendRequest({
        url: '/auth/register',
        method: 'POST',
        data: {
            username, email, password, wallet_address
        }
    });
}