import axios from 'axios';

export class LoginService {
    static async loginSuperAdmin(data) {
        try {
            return await axios.post(`http://${window.location.hostname}:4000/api/v1/login`, data);
        } catch (error) {
            throw error;
        }
    }

    static async loginBrand(idBrand, data) {
        try {
            return await axios.post(`http://${window.location.hostname}:4000/api/v1/brands/${idBrand}/login`, data);
        } catch (error) {
            throw error;
        }
    }
}