import axios from 'axios';

export class SupervisorService {
    static async getAllSlaves(idBrand, idBranch, idVigia) {
        try {
            let url = `http://${window.location.hostname}:4000/api/v1/brands/${idBrand}/branches/${idBranch}/slaves/${idVigia}`;
            return await axios.get(url, {headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }});
        } catch (error) {
            throw error;
        }
    }

    static async getAll(idBrand, idBranch, idModule) {
        try {
            let url = `http://${window.location.hostname}:4000/api/v1/brands/${idBrand}/branches/${idBranch}/supervisors/${idModule}`;
            return await axios.get(url, {headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }});
        } catch (error) {
            throw error;
        }
    }

    static async create(idBrand, idBranch, data) {
        try {
            return await axios.post(`http://${window.location.hostname}:4000/api/v1/brands/${idBrand}/branches/${idBranch}/supervisors`, data, {headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }});
        } catch (error) {
            throw error;
        }
    }

    static async delete(idBrand, idBranch, idSupervisor) {
        try {
            return await axios.delete(`http://${window.location.hostname}:4000/api/v1/brands/${idBrand}/branches/${idBranch}/supervisors/${idSupervisor}`, {headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }});
        } catch (error) {
            throw error;
        }
    }
}