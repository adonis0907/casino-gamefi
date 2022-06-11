import { sendRequest } from "@services/api";

export const loginAdmin = ({ username, password }) => {
    return sendRequest({
        url: '/admin/auth/login',
        method: 'POST',
        data: {
            username, password
        }
    });
}