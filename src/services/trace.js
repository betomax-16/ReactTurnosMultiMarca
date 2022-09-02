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

    static async getTurns(idBrand, idBranch, query) {
        try {
            let url = `http://${window.location.hostname}:4000/api/v1/brands/${idBrand}/branches/${idBranch}/turns`;
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

    static async nextTurn(idBrand, idBranch, data) {
        try {
            return await axios.post(`http://${window.location.hostname}:4000/api/v1/brands/${idBrand}/branches/${idBranch}/turns/actions/reception/next`, data, {headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }});
        } catch (error) {
            throw error;
        }
    }

    static async recallTurn(idBrand, idBranch, data) {
        try {
            return await axios.post(`http://${window.location.hostname}:4000/api/v1/brands/${idBrand}/branches/${idBranch}/turns/actions/reception/recall`, data, {headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }});
        } catch (error) {
            throw error;
        }
    }

    static async cancelTurn(idBrand, idBranch, data) {
        try {
            return await axios.post(`http://${window.location.hostname}:4000/api/v1/brands/${idBrand}/branches/${idBranch}/turns/actions/reception/cancel`, data, {headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }});
        } catch (error) {
            throw error;
        }
    }

    static async finishTurn(idBrand, idBranch, data) {
        try {
            return await axios.post(`http://${window.location.hostname}:4000/api/v1/brands/${idBrand}/branches/${idBranch}/turns/actions/reception/finish`, data, {headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }});
        } catch (error) {
            throw error;
        }
    }
}