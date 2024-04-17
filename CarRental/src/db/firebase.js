// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { addDoc, collection, deleteDoc, getDoc, getDocs, getFirestore, updateDoc } from "firebase/firestore";
import { setCars, setRentedCars } from "../Store/index";
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
        const query = await getDocs(collection(db,"cars"));
        const cars = query.docs.map(doc => ({
            id:doc.id, ...doc.data()
        }));
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
export const getRentedCars = ()=>async(dispatch)=>{
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
        dispatch((car));
    }catch(error){
        console.error("error adding rented car", error);
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