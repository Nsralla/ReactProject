import React, { useCallback, useRef, useState } from "react";
import { useDispatch } from 'react-redux';
import { addCarToFirebase } from "../db/firebase.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

import "./carinfo.scss";

export default function NewCar({ closeDialog }) {

    const dispatch = useDispatch();
    const nameRef = useRef();
    const priceRef = useRef();
    const detailsRef = useRef();
    const fileInputRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleImageUpload = async (file) => {
        const storage = getStorage();
        const ref = storageRef(storage, `carImages/${file.name}`);
        await uploadBytes(ref, file);
        return getDownloadURL(ref);
    };

    const handleSubmit = useCallback(async (event) => {
        event.preventDefault();
        setIsLoading(true);

        const file = fileInputRef.current.files[0];
        if (!file) {
            alert("Please select an image to upload.");
            setIsLoading(false);
            return;
        }

        try {
            const imageUrl = await handleImageUpload(file);
            const newCar = {
                name: nameRef.current.value,
                model: '2022',
                price: Number(priceRef.current.value),
                details: detailsRef.current.value,
                image: imageUrl,
                sideViewImages: [],
            };
            await dispatch(addCarToFirebase(newCar));
            closeDialog();
        } catch (error) {
            setError(error);
            console.error("Error calling function to add car to DB", error);
            alert("Failed to add new car. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }, [dispatch, closeDialog]);

    return (
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
                    <input ref={fileInputRef} type="file" id="upload-image" accept="image/*" onChange={() => {}} required />
                </div>
                <div className="form-group">
                    <label htmlFor="details">Details</label>
                    <textarea ref={detailsRef} id="details" rows="5"></textarea>
                </div>
                <div className="form-actions">
                    <button className="button-27" type="button" onClick={closeDialog}>Cancel</button>
                    <button className="button-27" type="submit" disabled={isLoading}>Add</button>
                </div>
                {isLoading && <h3>Adding {nameRef.current?.value}...</h3>}
                {error && <h2>Error adding a new car {error}</h2>}
            </form>
        </div>
    );
}
