
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Index from './components/Index';
import Login from './components/Login';
import Home from './components/Home';
import { AuthProvider } from "./components/AuthContext";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<Index/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
      </Routes>
      </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
