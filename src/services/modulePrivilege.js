import axios from 'axios';

export class ModulePrivilegeService {
    static async getAll(idBrand, idBranch, idModule) {
        try {
            let url = `http://${window.location.hostname}:4000/api/v1/brands/${idBrand}/branches/${idBranch}/modules/${idModule}/privilege`;
            return await axios.get(url, {headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }});
        } catch (error) {
            throw error;
        }
    }

    static async create(idBrand, idBranch, idModule, data) {
        try {
            return await axios.post(`http://${window.location.hostname}:4000/api/v1/brands/${idBrand}/branches/${idBranch}/modules/${idModule}/privilege`, data, {headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }});
        } catch (error) {
            throw error;
        }
    }

    static async update(idBrand, idBranch, idModule, idPrivilege, data) {
        try {
            return await axios.put(`http://${window.location.hostname}:4000/api/v1/brands/${idBrand}/branches/${idBranch}/modules/${idModule}/privilege/${idPrivilege}`, data, {headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }});
        } catch (error) {
            throw error;
        }
    }

    static async delete(idBrand, idBranch, idModule, idPrivilege) {
        try {
            return await axios.delete(`http://${window.location.hostname}:4000/api/v1/brands/${idBrand}/branches/${idBranch}/modules/${idModule}/privilege/${idPrivilege}`, {headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }});
        } catch (error) {
            throw error;
        }
    }
}