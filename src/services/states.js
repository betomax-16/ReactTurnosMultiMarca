import axios from 'axios';

export class StateService {
    static async getAll() {
        try {
            return await axios.get(`http://${window.location.hostname}:4000/api/v1/turnstate`, {headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }});
        } catch (error) {
            throw error;
        }
    }
}