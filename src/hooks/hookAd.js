import { useState } from "react";
import { useDispatch } from 'react-redux';
import { setAlertsList } from '../redux/splices/alertSlice';
import { AdService } from "../services/ad";

export const useAd = () => {
    const [ads, setAds] = useState([]);
    const [idBrand, setIdBrand] = useState('');
    const dispatch = useDispatch();

    const getImages = async (idBrand) => {
        try {
            const res = await AdService.getAll(idBrand);
            if (res.status === 200) {
                setAds(res.data.body.files);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                const errors = [];
                error.response.data.body.errors.forEach(e => {
                    errors.push({message: e.msg, visible: true, severity: 'error'});
                });
                dispatch(setAlertsList(errors))
            }
            else {
                dispatch(setAlertsList([
                    {message: error.message, visible: true, severity: 'error'}
                ]))
            }
        }
    }

    const onUpload = async (idBrand, files) => {
        try {
            const bodyFormData = new FormData();
            for (let index = 0; index < files.length; index++) {
                const file = files[index];
                bodyFormData.append('myFiles', file);
            }
            
            const res = await AdService.create(idBrand, bodyFormData);

            if (res.status === 201) {
                getImages(idBrand);
                // if (props.socket) {
                //     props.socket.emit('updateImages', {});  
                // }
            }
            else {
                dispatch(setAlertsList([
                    {message: 'Ocurrió algún error al subir las imagenes.', visible: true, severity: 'error'}
                ]));
            }
        } catch (error) {
            if (error.response && error.response.data) {
                const errors = [];
                error.response.data.body.errors.forEach(e => {
                    errors.push({message: e.msg, visible: true, severity: 'error'});
                });
                dispatch(setAlertsList(errors))
            }
            else {
                dispatch(setAlertsList([
                    {message: error.message, visible: true, severity: 'error'}
                ]))
            }
        }
    };

    const onDeleteAd = async (idBrand, idImage) => {
        try {
            const res = await AdService.delete(idBrand, idImage);

            if (res.status === 204) {
                getImages(idBrand);
                // if (props.socket) {
                //     props.socket.emit('updateImages', {});  
                // }
            }
            else {
                dispatch(setAlertsList([
                    {message: 'Ocurrió algún error al subir las imagenes.', visible: true, severity: 'error'}
                ]));
            }
        } catch (error) {
            if (error.response && error.response.data) {
                const errors = [];
                error.response.data.body.errors.forEach(e => {
                    errors.push({message: e.msg, visible: true, severity: 'error'});
                });
                dispatch(setAlertsList(errors))
            }
            else {
                dispatch(setAlertsList([
                    {message: error.message, visible: true, severity: 'error'}
                ]))
            }
        }
    }

    const onUpdateAd = async (idBrand, idImage, status) => {
        try {
            const res = await AdService.update(idBrand, idImage, {isActive: status});

            if (res.status === 200) {
                const auxAds = [...ads];
                for (let index = 0; index < auxAds.length; index++) {
                    const ad = {...auxAds[index]};
                    if (ad._id === idImage) {
                        ad.isActive = status;
                        auxAds[index] = ad;
                        break;
                    }
                }

                setAds(auxAds);
                // if (props.socket) {
                //     props.socket.emit('updateImages', {});  
                // }
            }
            else {
                dispatch(setAlertsList([
                    {message: 'Ocurrió algún error al eliminar la imagen.', visible: true, severity: 'error'}
                ]));
            }
        } catch (error) {
            if (error.response && error.response.data) {
                const errors = [];
                error.response.data.body.errors.forEach(e => {
                    errors.push({message: e.msg, visible: true, severity: 'error'});
                });
                dispatch(setAlertsList(errors))
            }
            else {
                dispatch(setAlertsList([
                    {message: error.message, visible: true, severity: 'error'}
                ]))
            }
        }
    }

    const handleChangeBrand = (event) => {
        setIdBrand(event.target.value);
    };

    return [
        ads,
        getImages,
        onUpload,
        onDeleteAd,
        onUpdateAd,
        handleChangeBrand,
        idBrand, setIdBrand
    ];
};