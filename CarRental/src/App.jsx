
import CarsList from "./Components/CarsList";
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import MainPage from "./MainPage";
import { History } from "./Components/History";
import CarDetails from "./Components/CarDetails";
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
  return <RouterProvider router={router}></RouterProvider>
}

export default App
