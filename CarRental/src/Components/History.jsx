import { useSelector } from "react-redux";
import { getRentedCars } from "../db/firebase";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
export function History() {
    const dispatch = useDispatch();
    // upload rented cars from firebase, then send to redux
    useEffect(()=>{
        async function handleUploadRentedCars(){
        await dispatch(getRentedCars());
    } 
        handleUploadRentedCars();
    },[dispatch]);

     // get the rented cars from redux
    const rentedCars = useSelector((state) => state.rentedCars);

    return (
        <table className="history-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
                <tr style={{ backgroundColor: '#000', textAlign: 'center' }}>
                    <th style={{ padding: '8px' }}>Car ID</th>
                    <th style={{ padding: '8px' }}>Car Name</th>
                    <th style={{ padding: '8px' }}>Start Date</th>
                    <th style={{ padding: '8px' }}>End Date</th>
                    <th style={{ padding: '8px' }}>Total Cost</th>
                </tr>
            </thead>
            <tbody>
                {rentedCars.map((car)=>{
                    return(<tr key={car.car}>
                    <td key={car.id} style={{ padding: '8px' }}>{car.id}</td>
                    <td key={car.car} style={{ padding: '8px' }}>{car.car}</td>
                    <td key={car.from} style={{ padding: '8px' }}>{car.from}</td>
                    <td key={car.to} style={{ padding: '8px' }}>{car.to}</td>
                    <td key={car.totalCost} style={{ padding: '8px' }}>{car.totalCost}</td>
                </tr>);
                })}
                
            </tbody>
        </table>
    );
}
