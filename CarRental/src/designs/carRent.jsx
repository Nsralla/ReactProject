import { useDispatch, useSelector } from 'react-redux';
import './carRent.scss';
import { useCallback, useRef, useState, useEffect } from 'react';
import { addRentedCarToFireBase } from '../db/firebase';
import { getRentedCars } from '../db/firebase';
export default function CarRent({closeDialog, price, carName}){

    // const rentedCars = useSelector((state)=>state.rentedCars);
    // console.log(rentedCars);
    const dispatch = useDispatch();
    const startRef = useRef(null);
    const endRef = useRef(null);
    const totalRef = useRef(null);
    
    // upload rented cars from firebase, then send to redux
    useEffect(() => {
    async function handleUploadRentedCars() {
        dispatch(getRentedCars());
    }
    handleUploadRentedCars();
    }, [dispatch]);
    // get the rented cars from redux
    const rentedCars = useSelector((state) => state.rentedCars);
    console.log("rented cars= ",rentedCars);
    const handleSubmit = useCallback((event)=>{
        event.preventDefault();
    },[]);


const  handleRent = useCallback(()=>{
        const lastCar = rentedCars.length > 0 ? rentedCars[rentedCars.length - 1] : null;
        console.log("last car= ", lastCar);
        let nextId = lastCar ? (Number(lastCar.id) + 1) : 0;
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
        dispatch(addRentedCarToFireBase(rentCarDetails));
        totalRef.current.value = `$${rentCarDetails.totalCost.toFixed(2)}`; 
},[dispatch,carName,price,rentedCars]);


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
                <button style={{borderRadius:"4px"}} onClick={handleRent}  type="submit" id="rent">Rent</button>
                <button style={{borderRadius:"4px"}} onClick={closeDialog}> Close</button>
                </div>
            </form>   
</div>
    </>);
}


