import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import CarsList from "./Components/CarsList";
import './App.scss';
function App() {
  return (
    <div className="app">
      <Header />
      <div className="content">
        <Sidebar />
        <section>
          <CarsList/>
        </section>
      </div>
    </div>
  );
}

export default App
