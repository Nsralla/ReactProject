import { useDispatch, useSelector } from 'react-redux';
import './carRent.scss';
import { addRentedCar } from '../Store';
import { useRef, useState } from 'react';
export default function CarRent({closeDialog, price, carName}){

    const rentedCars = useSelector((state)=>state.rentedCars)
    const dispatch = useDispatch();
    const startRef = useRef(null);
    const endRef = useRef(null);
    const totalRef = useRef(null);

    

    function handleSubmit(event){
        event.preventDefault();
    }


function handleRent(){
    // check the last id in the rented cars list, if its null, id = 0, else take it and add 1
      // Assuming rentedCars is an array of objects where each object has an 'id' property
const lastCar = rentedCars.length > 0 ? rentedCars[rentedCars.length - 1] : null;
let nextId = lastCar ? lastCar.id + 1 : 0;

        const startDate = new Date(startRef.current.value);
        const endDate = new Date(endRef.current.value);
        const timeDiff = endDate - startDate;
        const totalDays = timeDiff / (1000 * 60 * 60 * 24);

        const rentCarDetails = {
            id:nextId,
            car: carName,
            from: startRef.current.value,
            to: endRef.current.value,
            totalDays,
            totalCost: price * totalDays,
        };

        dispatch(addRentedCar(rentCarDetails));
        totalRef.current.value = `$${rentCarDetails.totalCost.toFixed(2)}`; // Added toFixed for formatting

}


    return(<>
        <div className="rent-car-container">
            <h2>Rent a Car</h2>
            <form onSubmit={(event)=>{handleSubmit(event)}} id="rent-car-form">
                <div className="form-group">
                    <label htmlFor="from-date">From</label>
                    <input ref={startRef} type="date" id="from-date" name="from_date" placeholder="12 May 2016" />
                </div>
                <div className="form-group">
                    <label htmlFor="to-date">To</label>
                    <input ref={endRef} type="date" id="to-date" name="to_date" placeholder="12 May 2016" />
                </div>
                <div className="form-group total-cost">
                    <label htmlFor="total-cost">Total Cost</label>
                    <input ref={totalRef} readOnly type="text" id="total-cost" name="total_cost" placeholder="$150" />
                </div>
                <div style={{display:'flex', gap:'10px', justifyContent:'center'}} className="form-actions">
                <button onClick={handleRent}  type="submit" id="rent">Rent</button>
                <button onClick={closeDialog}> Close</button>
                </div>
            </form>   
</div>
    </>);
}


