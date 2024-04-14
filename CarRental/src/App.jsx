import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import MainContent from "./Components/MainContent";
import './App.scss';
function App() {
  return (
    <div className="app">
      <Header />
      <div className="content">
        <Sidebar />
        <MainContent/>
      </div>
    </div>
  );
}

export default App
