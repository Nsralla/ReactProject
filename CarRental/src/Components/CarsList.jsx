import './carslist.scss';
import {cars} from '../Constants/cars.js';


export default function CarsList(){
    return(<div className='list-main-div'>
        {cars.map((car)=>{
            return(
                <div className='car-div' key={car.name}>
                    <img src={car.image} alt="car image" />
                    <h2>{car.name}</h2>
                    <p>{car.details}</p>
                </div>
            )
        })}
    </div>);
}