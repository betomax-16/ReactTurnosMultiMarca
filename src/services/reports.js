import axios from 'axios';

export class ReportService {
    static async get(path, idBrand, query) {
        try {
            return await axios.get(`http://${window.location.hostname}:4001/api/v1/reports/${path}/${idBrand}?${query}`, {headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }});
        } catch (error) {
            throw error;
        }
    }
}