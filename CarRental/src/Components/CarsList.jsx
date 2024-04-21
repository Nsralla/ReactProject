import './carslist.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchCars } from '../db/firebase';
import {motion} from 'framer-motion';
// Helper function to truncate text
function truncateText(text, maxLength) {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}

export default function CarsList() {
    const dispatch = useDispatch();
    // instead of getting the cars from redux
    // get the cars from fire store
    // and put them in the redux store
    // then get the cars from redux
    useEffect(()=>{
        const handleFetchingCars = async()=>{
            dispatch(fetchCars());
        }
        handleFetchingCars();
    },[dispatch]);

    const cars = useSelector((state) => state.cars);


     // Animation variants for Framer Motion
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,  // Delay between each child's animation
            },
        },
    };

    const itemVariants = {
        hidden: { x: -100, opacity: 0 },
        visible: { x: 0, opacity: 1 },
        hover:{
            scale:1.1
        }
    };


    

    return (
        <div className='list-main-div'>
            {cars.map((car, index) => (
                <Link to={`${car.name}`} className='car-div' key={index}>
                    <img src={car.image} alt="Car" />
                    <h2>{car.name}</h2>
                    <h3>{car.price}$</h3>
                    <p>{truncateText(car.details, 200)}</p>
                </Link>
            ))}
        </div>
    );
}
