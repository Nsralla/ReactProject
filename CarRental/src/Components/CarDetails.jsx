// Importing necessary libraries and components
import { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ImageCarousel from './ImageCarousel.jsx';
import RentButton from './Button.jsx';
import DeleteButton from './DeleteButton.jsx';
import CarRent from '../designs/carRent.jsx';
import './cardetails.scss';
import { editCar } from '../Store/index.js';

export default function CarDetails() {
    const { carName } = useParams();
    const cars = useSelector(state => state.cars);
    console.log(cars);
    const car = cars.find(car => car.name === carName);
    const dispatch = useDispatch();
    console.log(car);
    

    // State and refs for handling the dialog
    const [isOpen, setIsOpen] = useState(false);
    const [editId, setEditId] = useState(null);
    const [carDetails, setCarDetails] = useState(car.details);
    const [carPrice, setCarPrice] = useState(car.price);
    const dialogRef = useRef(null);

    // Functions for dialog management
    const openDialog = () => {
        setIsOpen(true);
        dialogRef.current.showModal();
    };

    const closeDialog = () => {
        setIsOpen(false);
        dialogRef.current.close();
    };

    // Update local state on user input
const handleDetailsChange = (event) => {
    setCarDetails(event.target.value);
};

// Dispatch changes when the user decides to save or submit the changes
const saveCarDetails = () => {
    dispatch(editCar({ ...car, details: carDetails }));
    setEditId(null); // Optionally reset the edit mode
};

    // Toggle editId between 0 and 1
    const handleIdChange = () => {
        setEditId(prevId => (prevId === 1 ? 0 : 1));
    };

function handleNewPrice(event){
    setCarPrice(event.target.value);
}

function handleSubmitNewPrice(){
    dispatch(editCar({...car, price:carPrice}));
    setEditId(null);
}


    return (
        <div className="car-detail-div">
            <div className="header">
                <h2>{carName}</h2>
                <div className="buttons">
                    <DeleteButton  carName={carName} />
                    <button onClick={handleIdChange}>Edit</button>
                    <RentButton handleClick={openDialog} />
                </div>
            </div>

            <dialog style={{ backgroundColor: '#f39f5a' }} ref={dialogRef}>
                <CarRent closeDialog={closeDialog} price={car.price} carName={carName} />
            </dialog>

            <ImageCarousel images={car.sideViewImages} />

            {editId === 0 ? (
                <input  type="text" placeholder={car.price}
                    onBlur={()=>handleSubmitNewPrice()}
                    onChange={(event)=>handleNewPrice(event)} />
            ) : (
                <h2>${car.price} per day</h2>
            )}

            <div><h1>Details</h1></div>

            <section className="body">
                {editId === 1 ? (
                <textarea
                        value={carDetails}
                        onChange={handleDetailsChange}
                        onBlur={saveCarDetails} // or use a save button click event
                    />
                ) : (
                    <div>{car.details}</div>
                )}
            </section>
        </div>
    );
}
