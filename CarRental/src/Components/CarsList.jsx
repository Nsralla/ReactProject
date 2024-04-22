import './carslist.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchCars } from '../db/firebase';
import SkeletonCar from '../designs/SkeletonCar.jsx';// Helper function to truncate text
function truncateText(text, maxLength) {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}

export default function CarsList() {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    // instead of getting the cars from redux
    // get the cars from fire store
    // and put them in the redux store
    // then get the cars from redux
    useEffect(()=>{
        setIsLoading(true);
        const handleFetchingCars = async()=>{
            await new Promise((resolve) => setTimeout(resolve,2000));
            // console.log("stop loading");
            await dispatch(fetchCars());
            setIsLoading(false);

        }
        handleFetchingCars();
    },[dispatch]);

    const cars = useSelector((state) => state.cars);

    return !isLoading ? (
        <div className="list-main-div">
            {cars.map((car, index) => (
            <Link to={`${car.name}`} className="car-div" key={index}>
                <img src={car.image} alt="Car" />
                <h2>{car.name}</h2>
                <h3>{car.price}$</h3>
                <p>{truncateText(car.details, 200)}</p>
            </Link>
            ))}
        </div>
        ) : (
            <div className='skeletons'>
    {Array.from(new Array(5)).map((_, index) => <SkeletonCar key={index} />)}
</div>

    );
}
