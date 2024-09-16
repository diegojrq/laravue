import api from './api';

const getUsers = () => api.get(`/users`);
const getUser = (user) => api.get(`users/${user}`);
const getUsersPaginate = async (page, itemsPerPage, sortBy, filters = []) => await api.get('users/users-paginate', {
    params: {
        page: page,
        limit: itemsPerPage,
        filters: filters,
        sort: sortBy,
    },
    showLoader: false
});


export {    
    getUsers,
    getUser,
    getUsersPaginate
}
