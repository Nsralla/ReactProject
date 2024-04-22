import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeCar } from "../Store";
import { useCallback, useEffect, useRef, useState } from "react";
import { deleteCarFromFirestore } from "../db/firebase";
// import "./deletebutton.scss";

export default function DeleteButton({ carName, id }) {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // get the useNavigate hook
    const dialogRef = useRef(null); // Moved up for better structure
    const [error, setError] = useState(null);

    const handleDelete = () => {
        dialogRef.current.showModal(); // Directly show the dialog
    };

    
    const confirmDelete = useCallback( () => {
    try {
        dispatch(deleteCarFromFirestore(id));
        navigate("/allcars");
        dispatch(removeCar(carName));
        dialogRef.current.close();
    } catch (error) {
        setError(error);
        console.error("Failed to delete car:", error);
    }
}, [carName, id, dispatch, navigate]);

    

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
                {error && <h3>Error  deleting car: {error}</h3>}
            </dialog>
        </>
    );
}
