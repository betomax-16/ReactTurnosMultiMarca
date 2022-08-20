import axios from 'axios';

export class RolService {
    static async get(idRol) {
        try {
            return await axios.get(`http://${window.location.hostname}:4000/api/v1/roles/${idRol}`, {headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }});
        } catch (error) {
            throw error;
        }
    }

    static async getAll() {
        try {
            return await axios.get(`http://${window.location.hostname}:4000/api/v1/roles`, {headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }});
        } catch (error) {
            throw error;
        }
    }

    static async create(data) {
        try {
            return await axios.post(`http://${window.location.hostname}:4000/api/v1/roles`, data, {headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }});
        } catch (error) {
            throw error;
        }
    }

    static async delete(idRol) {
        try {
            return await axios.delete(`http://${window.location.hostname}:4000/api/v1/roles/${idRol}`, {headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }});
        } catch (error) {
            throw error;
        }
    }
}