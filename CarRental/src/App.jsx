
import CarsList from "./Components/CarsList";
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import MainPage from "./MainPage";
import { History } from "./Components/History";
import CarDetails from "./Components/CarDetails";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./db/firebase";
import { cars } from "./Constants/cars";
import { useEffect } from "react";

const router = createBrowserRouter([
  {
    path:'/',
    element:<MainPage></MainPage>,
    children:[
      {
        path:'/allcars',
        element:<CarsList></CarsList>,
    },{
      path:'/history',
      element:<History/>
    },
  {
      path:'/allcars/:carName',
      element:<CarDetails></CarDetails>
  },]
}]);

function App() {
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


  return <RouterProvider router={router}></RouterProvider>;
}

export default App
