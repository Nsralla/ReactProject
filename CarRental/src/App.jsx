
import CarsList from "./Components/CarsList";
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import MainPage from "./MainPage";

const router = createBrowserRouter([
  {
    path:'/',
    element:<MainPage></MainPage>,
    children:[
      {
        path:'/allcars',
        element:<CarsList></CarsList>,
    },{}]
}]);

function App() {
  return <RouterProvider router={router}></RouterProvider>
}

export default App
