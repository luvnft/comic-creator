import './App.css';
import Comic from './components/Comic';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App bg-[#f4f5f8] min-h-screen">
      <Navbar />
      <Comic />
    </div>
  );
}

export default App;
