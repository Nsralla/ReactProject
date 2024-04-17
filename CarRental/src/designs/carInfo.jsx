import "./carinfo.scss";
import { useDispatch, useSelector } from 'react-redux';
import { addCar } from "../Store/index.js";
import { useCallback, useRef, useState } from "react";
import { addCarToFirebase } from "../db/firebase.js";

export default function NewCar({ closeDialog }) {
    const dispatch = useDispatch();
    const nameRef = useRef();
    const priceRef = useRef();
    const detailsRef = useRef();
    const [image, setImage] = useState(null);  // Use state to handle image as a Blob URL

    const handleImageChange = useCallback((event) => {
        if (event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));  // Create and set Blob URL
        }
    },[]);

    // instead of adding to redux, add it to data base
    const handleSubmit = useCallback(async (event) => {
        event.preventDefault();

        const newCar = {
            name: nameRef.current.value,
            model: '2022',
            price: priceRef.current.value,
            details: detailsRef.current.value,
            image: image,  // Use Blob URL,
            sideViewImages:[],
        };

        try{
            await dispatch(addCarToFirebase(newCar));
        }catch(error){
            console.error("error calling function to add car to db", error);
        }
        dispatch(addCar(newCar));
        closeDialog();
    },[dispatch,closeDialog, image]);

    return (
        <>
            <div className="add-car-container">
                <h2>Add New Car</h2>
                <form onSubmit={handleSubmit} id="add-car-form">
                    <div className="form-group">
                        <label htmlFor="car-name">Name</label>
                        <input ref={nameRef} type="text" id="car-name" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cost-per-day">Cost Per Day</label>
                        <input ref={priceRef} type="text" id="cost-per-day" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="upload-image">Upload Image</label>
                        <input type="file" onChange={handleImageChange} accept="image/*" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="details">Details</label>
                        <textarea ref={detailsRef} id="details" rows="5"></textarea>
                    </div>
                    <div className="form-actions">
                        <button className="button-27" type="button" onClick={closeDialog}>Cancel</button>
                        <button className="button-27" type="submit">Add</button>
                    </div>
                </form>
            </div>
        </>
    );
}
