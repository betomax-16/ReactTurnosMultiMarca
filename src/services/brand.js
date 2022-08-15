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
            if (data.myFiles.length) {
                const formData = new FormData();
                formData.append('name', data.name);
                formData.append('color', data.color);
                formData.append('myFiles', data.myFiles[0]);
                return await axios.post(`http://${window.location.hostname}:4000/api/v1/brands`, formData, {headers:{
                    'content-type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }});
            }
            else {
                throw new Error('Selecicona un archivo');
            }
        } catch (error) {
            throw error;
        }
    }

    static async update(idBrand, data) {
        try {
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('color', data.color);
            if (data.myFiles.length) { 
                formData.append('myFiles', data.myFiles[0]);
            }
            return await axios.put(`http://${window.location.hostname}:4000/api/v1/brands/${idBrand}`, formData, {headers:{
                'Content-Type': 'multipart/form-data',    
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