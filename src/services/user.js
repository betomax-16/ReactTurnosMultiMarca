import axios from 'axios';

export class UserService {
    static async get(idBrand, idUser) {
        try {
            return await axios.get(`http://${window.location.hostname}:4000/api/v1/brands/${idBrand}/users/${idUser}`, {headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }});
        } catch (error) {
            throw error;
        }
    }

    static async getAll(idBrand, query) {
        try {
            let url = `http://${window.location.hostname}:4000/api/v1/brands/${idBrand}/users`;
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

    static async create(idBrand, data) {
        try {
            return await axios.post(`http://${window.location.hostname}:4000/api/v1/brands/${idBrand}/users`, data, {headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }});
        } catch (error) {
            throw error;
        }
    }

    static async update(idBrand, idUser, data) {
        try {
            return await axios.put(`http://${window.location.hostname}:4000/api/v1/brands/${idBrand}/users/${idUser}`, data, {headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }});
        } catch (error) {
            throw error;
        }
    }

    static async delete(idBrand, idUser) {
        try {
            return await axios.delete(`http://${window.location.hostname}:4000/api/v1/brands/${idBrand}/users/${idUser}`, {headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }});
        } catch (error) {
            throw error;
        }
    }
}