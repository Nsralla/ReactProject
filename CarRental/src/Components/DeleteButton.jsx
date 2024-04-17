import { useNavigate } from "react-router-dom";
// import "./cardetails.scss";
import { useDispatch } from "react-redux";
import { removeCar } from "../Store";
import { useRef } from "react";
// import "./deletebutton.scss";

export default function DeleteButton({ carName }) {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // get the useNavigate hook
    const dialogRef = useRef(null); // Moved up for better structure

    const handleDelete = () => {
        dialogRef.current.showModal(); // Directly show the dialog
    };

    function confirmDelete() {
        dispatch(removeCar(carName));
        dialogRef.current.close(); // Close the dialog
        navigate("/allcars"); // navigate to the all cars page after deletion
    }

    function handleCancel() {
        dialogRef.current.close(); // Close the dialog
    }

    return (
        <>
            <button onClick={handleDelete}>Delete</button>
            <dialog style={{backgroundColor:'orange', borderRadius:'10px'}} className="delete-dialog" ref={dialogRef}>
                <h2>Are you sure you want to delete this Car?</h2>
                <div style={{display:'flex', justifyContent:"center", gap:'10px'}} className="buttons-div">
                    <button style={{color:"#000"}} onClick={confirmDelete}>Confirm</button>
                    <button style={{color:"#000"}} onClick={handleCancel}>Cancel</button>
                </div>
            </dialog>
        </>
    );
}
