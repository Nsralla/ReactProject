
import CarsList from "./Components/CarsList";
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import MainPage from "./MainPage";
import { History } from "./Components/History";
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
      path:'/allcars/:carId',
      element:<></>
  },]
}]);

function App() {
  return <RouterProvider router={router}></RouterProvider>
}

export default App
