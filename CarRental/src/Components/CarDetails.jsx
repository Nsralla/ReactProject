import { useParams } from "react-router-dom"
import './cardetails.scss';
import { useSelector } from "react-redux";
import ImageCarousel from './ImageCarousel.jsx';
export default function CarDetails(){
    const param = useParams();
    const carName = param.carName;

    // get the array of cars
    const cars = useSelector((state)=>state.cars);
    // filter the cars
    const car = cars.find((car)=>{
        return(car.name === carName);
    })


    return(
        <div className="car-detail-div">
            <div  className="header">
                <h2>{carName}</h2>
                <div className="buttons">
                    <button>Delete</button>
                    <button>Edit</button>
                    <button>Rent</button>
                </div>
            </div>

            <ImageCarousel images={car.sideViewImages} />

            <div><h1>Details</h1></div>
            <section className="body">
                <div>{car.details}</div>
            </section>
        </div>
    );
} 