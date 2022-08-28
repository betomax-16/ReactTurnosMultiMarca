import axios from 'axios';

export class TraceService {
    static async newTurn(idBrand, idBranch, data) {
        try {
            return await axios.post(`http://${window.location.hostname}:4000/api/v1/brands/${idBrand}/branches/${idBranch}/turns/actions/newTurn`, data, {headers:{
                'Authorization': `Bearer ${localStorage.getItem('secret-token')}`
            }});
        } catch (error) {
            throw error;
        }
    }
}