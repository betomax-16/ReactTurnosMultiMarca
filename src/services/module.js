import axios from 'axios';

export class ModuleService {
    static async get(idBrand, idBranch, idModule) {
        try {
            const token = localStorage.getItem('token');
            const secretToken = localStorage.getItem('secret-token');

            return await axios.get(`http://${window.location.hostname}:4000/api/v1/brands/${idBrand}/branches/${idBranch}/modules/${idModule}`, {headers:{
                'Authorization': `Bearer ${token ? token : secretToken}`
            }});
        } catch (error) {
            throw error;
        }
    }

    static async getAll(idBrand, idBranch, query) {
        try {
            let url = `http://${window.location.hostname}:4000/api/v1/brands/${idBrand}/branches/${idBranch}/modules`;
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

    static async create(idBrand, idBranch, data) {
        try {
            return await axios.post(`http://${window.location.hostname}:4000/api/v1/brands/${idBrand}/branches/${idBranch}/modules`, data, {headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }});
        } catch (error) {
            throw error;
        }
    }

    static async update(idBrand, idBranch, idModule, data) {
        try {
            return await axios.put(`http://${window.location.hostname}:4000/api/v1/brands/${idBrand}/branches/${idBranch}/modules/${idModule}`, data, {headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }});
        } catch (error) {
            throw error;
        }
    }

    static async delete(idBrand, idBranch, idModule) {
        try {
            return await axios.delete(`http://${window.location.hostname}:4000/api/v1/brands/${idBrand}/branches/${idBranch}/modules/${idModule}`, {headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }});
        } catch (error) {
            throw error;
        }
    }
}