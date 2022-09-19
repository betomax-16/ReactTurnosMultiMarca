import axios from 'axios';

export class TraceHisotryService {

    static async getTurns(idBrand, idBranch, date) {
        try {
            const token = localStorage.getItem('token');
            let url = `http://${window.location.hostname}:4000/api/v1/brands/${idBrand}/branches/${idBranch}/history/${date}`;
            return await axios.get(url, {headers:{
                'Authorization': `Bearer ${token}`
            }});
        } catch (error) {
            throw error;
        }
    }

    static async getTrace(idBrand, idBranch, date, turn) {
        try {
            const token = localStorage.getItem('token');
            let url = `http://${window.location.hostname}:4000/api/v1/brands/${idBrand}/branches/${idBranch}/history/${date}/traces/${turn}`;
            return await axios.get(url, {headers:{
                'Authorization': `Bearer ${token}`
            }});
        } catch (error) {
            throw error;
        }
    }
}