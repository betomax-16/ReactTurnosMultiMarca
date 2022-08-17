import axios from 'axios';

export class AreaService {
    static async get(idBrand, idArea) {
        try {
            return await axios.get(`http://${window.location.hostname}:4000/api/v1/brands/${idBrand}/areas/${idArea}`, {headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }});
        } catch (error) {
            throw error;
        }
    }

    static async getAll(idBrand) {
        try {
            return await axios.get(`http://${window.location.hostname}:4000/api/v1/brands/${idBrand}/areas`, {headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }});
        } catch (error) {
            throw error;
        }
    }

    static async create(idBrand, data) {
        try {
            return await axios.post(`http://${window.location.hostname}:4000/api/v1/brands/${idBrand}/areas`, data, {headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }});
        } catch (error) {
            throw error;
        }
    }

    static async update(idBrand, idArea, data) {
        try {
            return await axios.put(`http://${window.location.hostname}:4000/api/v1/brands/${idBrand}/areas/${idArea}`, data, {headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }});
        } catch (error) {
            throw error;
        }
    }

    static async delete(idBrand, idArea) {
        try {
            return await axios.delete(`http://${window.location.hostname}:4000/api/v1/brands/${idBrand}/areas/${idArea}`, {headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }});
        } catch (error) {
            throw error;
        }
    }
}