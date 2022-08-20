import axios from 'axios';

export class SuperAdminService {
    static async get(idUser) {
        try {
            return await axios.get(`http://${window.location.hostname}:4000/api/v1/users/${idUser}`, {headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }});
        } catch (error) {
            throw error;
        }
    }

    static async getAll(query) {
        try {
            let url = `http://${window.location.hostname}:4000/api/v1/users`;
            if (query) {
                url += query;
            }
            return await axios.get(url, {headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }});
        } catch (error) {
            throw error;
        }
    }

    static async create(data) {
        try {
            return await axios.post(`http://${window.location.hostname}:4000/api/v1/users`, data, {headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }});
        } catch (error) {
            throw error;
        }
    }

    static async update(idUser, data) {
        try {
            return await axios.put(`http://${window.location.hostname}:4000/api/v1/users/${idUser}`, data, {headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }});
        } catch (error) {
            throw error;
        }
    }

    static async delete(idUser) {
        try {
            return await axios.delete(`http://${window.location.hostname}:4000/api/v1/users/${idUser}`, {headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }});
        } catch (error) {
            throw error;
        }
    }
}