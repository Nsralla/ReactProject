import { useNavigate } from "react-router-dom";
import "./cardetails.scss";
import { useDispatch } from "react-redux";
import { removeCar } from "../Store";

export default function DeleteButton({ carName }) {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // get the useNavigate hook

    function handleDelete() {
        dispatch(removeCar(carName));
        navigate("/allcars"); // navigate to the home page after dispatch
    }

    return <button onClick={handleDelete}>Delete</button>;
}
