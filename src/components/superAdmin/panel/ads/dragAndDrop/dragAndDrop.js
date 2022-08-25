import { useRef, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { setAlertsList } from '../../../../../redux/splices/alertSlice';
import PropTypes from 'prop-types';
import { CardAd } from "./cardAd/cardAd";
import { DivContainer, DivGrid } from "./styles";

export function FilesDragAndDrop({idBrand, onUpdateAd, onDeleteAd, onUpload, children, count, formats, ads}) {
    const drop = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const ref = drop.current;
        return () => {
            if (ref) {
                ref.removeEventListener('dragover', handleDragOver);
                ref.removeEventListener('drop', (e) => {handleDrop(e, idBrand)});
            }
        };
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (idBrand !== '') {
            const ref = drop.current;
            ref.addEventListener('dragover', handleDragOver);
            ref.addEventListener('drop', (e) => {handleDrop(e, idBrand)});
        }
    }, [idBrand]);// eslint-disable-line react-hooks/exhaustive-deps

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };
    
    const handleDrop = (e, idBrand) => {
        e.preventDefault();
        e.stopPropagation();
        // this is required to convert FileList object to array
        const files = [...e.dataTransfer.files];

        // check if the provided count prop is less than uploaded count of files
        if (count && count < files.length) {
            dispatch(setAlertsList([
                {message: `Solo se pueden subir ${count} archivo${count !== 1 ? 's' : ''} a la vez`, visible: true, severity: 'warning'}
            ]));
            return;
        }

        // check if some uploaded file is not in one of the allowed formats
        if (formats && files.some((file) => !formats.some((format) => file.name.toLowerCase().endsWith(format.toLowerCase())))) {
            dispatch(setAlertsList([
                {message: `Solo se aceptan los siguientes formatos de archivo: ${formats.join(', ')}`, visible: true, severity: 'warning'}
            ]));
            return;
        }

        if (files && files.length) {
            onUpload(idBrand, files);
        }
    };

    return (
        <DivContainer ref={drop}>
            <DivGrid>
                {ads && ads.map((item, index) => <CardAd key={index} idBrand={idBrand} data={item} onDeleteAd={onDeleteAd} onUpdateAd={onUpdateAd}/>)}
            </DivGrid>
            {children && (!ads || !ads.length) ? children : <></>}
        </DivContainer>
    );
}
  
FilesDragAndDrop.propTypes = {
    onUpload: PropTypes.func.isRequired,
};