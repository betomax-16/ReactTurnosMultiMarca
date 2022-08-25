import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useAd } from "../../../../hooks/hookAd";
import { useBrand } from "../../../../hooks/hookBrand";
import { DivContainer, MessageTitle } from "./styles";
import { FilesDragAndDrop } from "./dragAndDrop/dragAndDrop";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export function Ad() {
    const brandSorage = JSON.parse(localStorage.getItem('brand'));
    const [brand, getBrands, brands] = useBrand();
    const params = useParams();
    const [
        ads,
        getImages,
        onUpload,
        onDeleteAd,
        onUpdateAd,
        handleChangeBrand,
        idBrand, setIdBrand
    ] = useAd();

    useEffect(() => {
        if (!params.idBrand) {
            getBrands();
        }
        else {
            setIdBrand(params.idBrand);
        }
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (brand) {
            getImages(brand._id);
        }
    }, [brand]);// eslint-disable-line react-hooks/exhaustive-deps

    return (<>
        {!brandSorage ? <Navigate to="/notFound" replace /> : <>
        <DivContainer>
            <h1>Anuncios</h1>
            {!params.idBrand && <>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Marcas</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={idBrand}
                        label="Marca"
                        onChange={handleChangeBrand}
                    >
                        {brands.map((b, index) => <MenuItem key={index} value={b.id}>{b.name}</MenuItem>)}
                    </Select>
                </FormControl>
            </>}
            <FilesDragAndDrop idBrand={idBrand} onUpdateAd={onUpdateAd} onDeleteAd={onDeleteAd} onUpload={onUpload} count={12} formats={['.jpeg', '.jpg', '.png']} ads={ads}>
                <MessageTitle>Arrastra tus archivos</MessageTitle>
            </FilesDragAndDrop>
        </DivContainer>
        </>}
    </>);
}