    // Importing necessary libraries and components
    import { useState, useRef, useEffect, useCallback } from "react";
    import { useParams } from "react-router-dom";
    import { useDispatch, useSelector } from "react-redux";
    import ImageCarousel from "./ImageCarousel.jsx";
    import RentButton from "./Button.jsx";
    import DeleteButton from "./DeleteButton.jsx";
    import CarRent from "../designs/carRent.jsx";
    import "./cardetails.scss";
    import { editCarPrice } from "../Store/index.js";
    import { editCarDetails } from "../Store/index.js";
    import { motion } from "framer-motion";
    import {
    EditCarPriceFromFirebase,
    editCarDetailsFirebase,
    } from "../db/firebase.js";
    import { fetchCars } from "../db/firebase.js";

    export default function CarDetails() {
    const { carName } = useParams();
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [editId, setEditId] = useState(null);
    const dialogRef = useRef(null);

    useEffect(() => {
        const handleFetchingCars = async () => {
        dispatch(fetchCars());
        };
        handleFetchingCars();
    }, [dispatch]);

    const cars = useSelector((state) => state.cars);
    const car = cars.find((car) => car.name === carName);

    const [carDetails, setCarDetails] = useState("");
    const [carPrice, setCarPrice] = useState("");
    // Update carDetails and carPrice when car changes
    useEffect(() => {
        if (car) {
        setCarDetails(car.details);
        setCarPrice(car.price);
        }
    }, [car]);

    const openDialog = useCallback(() => {
        setIsOpen(true);
        dialogRef.current.showModal();
    }, []);

    const closeDialog = useCallback(() => {
        setIsOpen(false);
        dialogRef.current.close();
    }, []);

    const handleDetailsChange = useCallback((event) => {
        setCarDetails(event.target.value);
    }, []);

    const handleIdChange = useCallback(() => {
        setEditId((prevId) => (prevId === 1 ? 0 : 1));
    }, []);

    const handleNewPrice = useCallback((event) => {
        setCarPrice(event.target.value);
    }, []);

    const saveCarDetails = useCallback(() => {
        if (car) {
        dispatch(editCarDetails({ id: car.id, details: carDetails }));
        dispatch(editCarDetailsFirebase(car.id, carDetails));
        setEditId(null);
        }
    }, [dispatch, car, carDetails]);

    const handleSubmitNewPrice = useCallback(async () => {
        if (car) {
        dispatch(editCarPrice({ id: car.id, price: carPrice }));
        dispatch(EditCarPriceFromFirebase(car.id, carPrice));
        setEditId(null);
        }
    }, [car, dispatch, carPrice]);

    if (!car) {
        return <div>Loading car details, please wait...</div>; // Or any other appropriate fallback UI
    }

    return (
        <motion.div
        className="car-detail-div"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        >
        <motion.div
            className="header2"
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 style={{ color: "#f57c51" }}>{carName}</h2>
            <div className="buttons">
            <DeleteButton carName={carName} id={car?.id} />
            <button onClick={handleIdChange}>Edit</button>
            <RentButton handleClick={openDialog} />
            </div>
        </motion.div>

        <dialog
            style={{ backgroundColor: "#f39f5a", borderRadius: "12px" }}
            ref={dialogRef}
        >
            <CarRent
            closeDialog={closeDialog}
            price={car.price}
            carName={carName}
            />
        </dialog>

        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
        >
            {car.sideViewImages.length !== 0 && (
            <ImageCarousel images={car.sideViewImages} />
            )}
            {car.sideViewImages.length === 0 && (
            <div
                style={{
                width: "100%",
                borderRadius: "10px",
                backgroundColor: "#f57c51",
                marginBottom: "35px",
                }}
            >
                <img
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "30px",
                }}
                src={car.image}
                alt="car image"
                ></img>
                <h2>Other images are unavailable for this car</h2>
            </div>
            )}
        </motion.section>

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
        >
            {editId === 0 ? (
            <input
                type="text"
                placeholder={car.price}
                onBlur={() => handleSubmitNewPrice()}
                onChange={(event) => handleNewPrice(event)}
            />
            ) : (
            <h2 style={{ textAlign: "left" }}>
                <span className="coast">Coast Per day</span> :${car.price}
            </h2>
            )}
        </motion.div>

        <section className="body">
            {editId === 1 ? (
            <motion.textarea
                value={carDetails}
                onChange={handleDetailsChange}
                onBlur={saveCarDetails}
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
            />
            ) : (
            <motion.div
                style={{ lineHeight: "1.5", textShadow: "2px 2px 2px #000" }}
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                {car.details}
            </motion.div>
            )}
        </section>
        </motion.div>
    );
    }
