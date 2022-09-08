import axios from 'axios';

export class StateService {
    static async getAll() {
        try {
            const token = localStorage.getItem('token');
            const secretToken = localStorage.getItem('secret-token');

            return await axios.get(`http://${window.location.hostname}:4000/api/v1/turnstate`, {headers:{
                'Authorization': `Bearer ${token ? token : secretToken}`
            }});
        } catch (error) {
            throw error;
        }
    }
}