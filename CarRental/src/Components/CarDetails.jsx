import { useParams } from "react-router-dom"
import './cardetails.scss';
import { useSelector } from "react-redux";
import ImageCarousel from './ImageCarousel.jsx';
import RentButton from "./Button.jsx";
import { useRef, useState } from "react";
import CarRent from "../designs/carRent.jsx";
export default function CarDetails(){
    const param = useParams();
    const carName = param.carName;

    // get the array of cars
    const cars = useSelector((state)=>state.cars);
    // filter the cars
    const car = cars.find((car)=>{
        return(car.name === carName);
    })


    // handle opening, closing the rent dialog
    const [isOpen, setIsOpen] = useState(false);
    const dialogRef = useRef(null);

    const openDialog = ()=>{
        setIsOpen(true);
        dialogRef.current.showModal();
    };

    const closeDialog = () =>{
        setIsOpen(false);
        dialogRef.current.close();
    }



    return(
        <div className="car-detail-div">

            <div  className="header">
                <h2>{carName}</h2>
                <div className="buttons">
                    <button>Delete</button>
                    <button>Edit</button>
                    <RentButton handleClick={openDialog} />
                </div>
            </div>


            <dialog style={{backgroundColor:'#f39f5a'} } ref={dialogRef}>
                <CarRent closeDialog={closeDialog} price={car.price} carName={carName}/>
            </dialog>



            <ImageCarousel images={car.sideViewImages} />

            <div><h1>Details</h1></div>
            <section className="body">
                <div>{car.details}</div>
            </section>
        </div>
    );
} 