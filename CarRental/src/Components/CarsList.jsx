import './carslist.scss';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
export default function CarsList() {
    const cars = useSelector((state) => state.cars);

    return (
        <div className='list-main-div'>
            {cars.map((car, index) => (
                <Link to={`${car.name}`} className='car-div' key={index}>
                    <img src={car.image} alt="Car" />
                    <h2>{car.name}</h2>
                    <h3>{car.price}$</h3>
                    <p>{car.details}</p>
                </Link>
            ))}
        </div>
    );
}
