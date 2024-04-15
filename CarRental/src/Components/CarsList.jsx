import './carslist.scss';
import { useSelector } from 'react-redux';

export default function CarsList() {
    const cars = useSelector((state) => state.cars);

    return (
        <div className='list-main-div'>
            {cars.map((car, index) => (
                <div className='car-div' key={index}>
                    <img src={car.image} alt="Car" />
                    <h2>{car.name}</h2>
                    <p>{car.details}</p>
                </div>
            ))}
        </div>
    );
}
