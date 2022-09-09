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
            const token = localStorage.getItem('token');
            const secretToken = localStorage.getItem('secret-token');

            let url = `http://${window.location.hostname}:4000/api/v1/brands/${idBrand}/branches/${idBranch}/turns`;
            if (query) {
                url += query;
            }

            return await axios.get(url, {headers:{
                'Authorization': `Bearer ${token ? token : secretToken}`
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

    static async getTestPendingTurn(idBrand, idBranch, query) {
        try {
            let url = `http://${window.location.hostname}:4000/api/v1/brands/${idBrand}/branches/${idBranch}/turns/actions/test/pending`;
            if (query) {
                url += query;
            }

            return await axios.get(url, {headers:{
                'Authorization': `Bearer ${localStorage.getItem('secret-token')}`
            }});
        } catch (error) {
            throw error;
        }
    }

    static async getTestPendingTurnByUser(idBrand, idBranch, idUser, query) {
        try {
            let url = `http://${window.location.hostname}:4000/api/v1/brands/${idBrand}/branches/${idBranch}/turns/actions/test/pending/${idUser}`;
            if (query) {
                url += query;
            }

            return await axios.get(url, {headers:{
                'Authorization': `Bearer ${localStorage.getItem('secret-token')}`
            }});
        } catch (error) {
            throw error;
        }
    }

    static async nextTurnTest(idBrand, idBranch, data) {
        try {
            return await axios.post(`http://${window.location.hostname}:4000/api/v1/brands/${idBrand}/branches/${idBranch}/turns/actions/test/next`, data, {headers:{
                'Authorization': `Bearer ${localStorage.getItem('secret-token')}`
            }});
        } catch (error) {
            throw error;
        }
    }

    static async recallTurnTest(idBrand, idBranch, data) {
        try {
            return await axios.post(`http://${window.location.hostname}:4000/api/v1/brands/${idBrand}/branches/${idBranch}/turns/actions/test/recall`, data, {headers:{
                'Authorization': `Bearer ${localStorage.getItem('secret-token')}`
            }});
        } catch (error) {
            throw error;
        }
    }

    static async cancelTurnTest(idBrand, idBranch, data) {
        try {
            return await axios.post(`http://${window.location.hostname}:4000/api/v1/brands/${idBrand}/branches/${idBranch}/turns/actions/test/cancel`, data, {headers:{
                'Authorization': `Bearer ${localStorage.getItem('secret-token')}`
            }});
        } catch (error) {
            throw error;
        }
    }

    static async finishTurnTest(idBrand, idBranch, data) {
        try {
            return await axios.post(`http://${window.location.hostname}:4000/api/v1/brands/${idBrand}/branches/${idBranch}/turns/actions/test/finish`, data, {headers:{
                'Authorization': `Bearer ${localStorage.getItem('secret-token')}`
            }});
        } catch (error) {
            throw error;
        }
    }

    static async freeTurnTest(idBrand, idBranch, data) {
        try {
            return await axios.post(`http://${window.location.hostname}:4000/api/v1/brands/${idBrand}/branches/${idBranch}/turns/actions/test/free`, data, {headers:{
                'Authorization': `Bearer ${localStorage.getItem('secret-token')}`
            }});
        } catch (error) {
            throw error;
        }
    }

    static async getTrace(idBrand, idBranch, turn) {
        try {
            let url = `http://${window.location.hostname}:4000/api/v1/brands/${idBrand}/branches/${idBranch}/turns/${turn}/traces`;
            return await axios.get(url, {headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }});
        } catch (error) {
            throw error;
        }
    }
}