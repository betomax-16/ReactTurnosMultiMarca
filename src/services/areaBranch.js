import axios from 'axios';

export class AreaBranchService {

    static async getAll(idBrand, idBranch) {
        try {
            const secretToken = localStorage.getItem('secret-token');
            const token = localStorage.getItem('token');
            const currentToken = secretToken ? secretToken : token;
            return await axios.get(`http://${window.location.hostname}:4000/api/v1/brands/${idBrand}/branches/${idBranch}/areas`, {headers:{
                'Authorization': `Bearer ${currentToken}`
            }});
        } catch (error) {
            throw error;
        }
    }

    static async create(idBrand, idBranch, idArea) {
        try {
            return await axios.post(`http://${window.location.hostname}:4000/api/v1/brands/${idBrand}/branches/${idBranch}/areas/${idArea}`, {}, {headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }});
        } catch (error) {
            throw error;
        }
    }

    static async delete(idBrand, idBranch, idArea) {
        try {
            return await axios.delete(`http://${window.location.hostname}:4000/api/v1/brands/${idBrand}/branches/${idBranch}/areas/${idArea}`, {headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }});
        } catch (error) {
            throw error;
        }
    }
}