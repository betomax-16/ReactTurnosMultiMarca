import axios from 'axios';

export class BrandService {
    static async get(idBrand) {
        try {
            return await axios.get(`http://${window.location.hostname}:4000/api/v1/brands/${idBrand}`);
        } catch (error) {
            throw error;
        }
    }

    static async getAll() {
        try {
            return await axios.get(`http://${window.location.hostname}:4000/api/v1/brands`);
        } catch (error) {
            throw error;
        }
    }

    static async create(data) {
        try {
            return await axios.post(`http://${window.location.hostname}:4000/api/v1/brands`, data, {headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }});
        } catch (error) {
            throw error;
        }
    }

    static async update(idBrand, data) {
        try {
            return await axios.put(`http://${window.location.hostname}:4000/api/v1/brands/${idBrand}`, data, {headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }});
        } catch (error) {
            throw error;
        }
    }

    static async delete(idBrand) {
        try {
            return await axios.delete(`http://${window.location.hostname}:4000/api/v1/brands/${idBrand}`, {headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }});
        } catch (error) {
            throw error;
        }
    }
}