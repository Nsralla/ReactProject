import { useParams } from "react-router-dom"
export default function CarDetails(){
    const param = useParams();
    const carId = param.carId;
    return(
        <>
            Car details
        </>
    );
} 