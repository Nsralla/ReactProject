import './carslist.scss';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// Helper function to truncate text
function truncateText(text, maxLength) {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}

export default function CarsList() {
    const cars = useSelector((state) => state.cars);

    return (
        <div className='list-main-div'>
            {cars.map((car, index) => (
                <Link to={`${car.name}`} className='car-div' key={index}>
                    <img src={car.image} alt="Car" />
                    <h2>{car.name}</h2>
                    <h3>{car.price}$</h3>
                    <p>{truncateText(car.details, 200)}</p> {/* Truncate details to 100 characters */}
                </Link>
            ))}
        </div>
    );
}
