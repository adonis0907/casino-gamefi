import { sendRequest } from "@services/api";

export const getUsersList = () => {
    return sendRequest({
        url: '/admin/users',
        method: 'GET',
    });
}

export const setUserStatus = (uuid, status) => {
    return sendRequest({
        url: `/admin/users/${uuid}/setStatus/${status}`,
        method: 'GET'
    });
}