// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { addDoc, collection, deleteDoc,doc, getDoc, getDocs, getFirestore, updateDoc } from "firebase/firestore";
import { addRentedCar, setCars, setRentedCars } from "../Store/index";
const firebaseConfig = {
    apiKey: "AIzaSyDwoz06Zni2VzDSqJ3OIW0j0LNvZopXmA4",
    authDomain: "carrental-10bea.firebaseapp.com",
    projectId: "carrental-10bea",
    storageBucket: "carrental-10bea.appspot.com",
    messagingSenderId: "955121347539",
    appId: "1:955121347539:web:e8aa1aef898e78ac9b9d26",
    measurementId: "G-CPTFB34CTZ",
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();
export {app, db, analytics};


// fetch the cars from the fire store
export const fetchCars = () => async (dispatch) =>{
    try{
        console.log("fetching cars from firebase...");
        const query = await getDocs(collection(db,"cars"));
        const cars = query.docs.map(doc => ({
            id:doc.id, ...doc.data()
        }));
        console.log("cars in redux", cars);
        dispatch(setCars(cars))
    }catch(error){
        console.error("Error fetching cars from firestore", error);
    }
};

export const addCarToFirebase = (car) => async(dispatch)=>{
    try{
        const docRef = await addDoc(collection(db,"cars"),car);
        console.log("Document written with ID:",docRef.id);

    }catch(error){
        console.error("Error adding car to firebase", error);
    }
};


//get rented cars
export const getRentedCars = ()=>async (dispatch)=>{
    try{
        const docRef = await getDocs(collection(db,"rentedCars"));
        let rentedCars= docRef.docs.map(doc=>({
            fireId:doc.id, ...doc.data()
        }));
        dispatch(setRentedCars(rentedCars));
        console.log(rentedCars);
    }catch(error){
        console.error("Error fetching rented cars", error);
    }
};

// add a rented car
export const addRentedCarToFireBase = (car)=>async(dispatch)=>{
    try{
        const docRef = await addDoc(collection(db,"rentedCars"),car);
        console.log("Document written with ID:", docRef.id);
        // update rented cars list in redux
        dispatch(addRentedCar(car));
    }catch(error){
        console.error("error adding rented car", error);
    }
}

// Assuming deleteDoc and doc are imported from 'firebase/firestore'
export const deleteCarFromFirestore = (id) => async (dispatch) => {
    try {
        if (!id) throw new Error("Document ID is undefined.");
        await deleteDoc(doc(db, "cars", id));
    } catch (error) {
        console.error("error deleting from Firestore", error);
        throw new Error("Failed to delete from Firestore");  // To handle this in component
    }
};

export const EditCarPriceFromFirebase = (id, price) => async (dispatch) => {
    try {
        if (!id) throw new Error("ID IS NOT DEFINED");
        const docRef = doc(db, "cars", id);
        await updateDoc(docRef, { price });
        console.log("Document updated");
    } catch (error) {
        console.error("Error editing car's details", error);
    }
};


export const editCarDetailsFirebase = (id, details) => async (dispatch) => {
    try{
        console.log(id)
        console.log(details);
        if(!id) throw new Error("ID IS NOT DEFINED");
        const docRef = doc(db,"cars",id);
        await updateDoc(docRef, { details });
        console.log("Document updated");
    }catch(error){
        console.error("Error updating the car details", error);
    }
}

//  useEffect(()=>{
//     async function uploadCarsToFirestore(){
//     // get the collection
//     const carsCollection = collection(db,"cars");
//     // loop through the cars and add each to the firebase
//     for(const car of cars){
//       try{
//         const docRef = await addDoc(carsCollection, car);// addDoc will add the car to the firebase
//           console.log("Document written with ID: ", docRef.id);
//       }catch(error){
//         console.error("Error adding document to firebase", error)
//       }
//     }
//   }
//   uploadCarsToFirestore();
//   },[]); 