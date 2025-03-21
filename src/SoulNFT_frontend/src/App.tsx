import "./App.scss";
import NFTForm from "./NFTForm";
import NFTList from "./NFTList";
import Navigation from "./Navigation";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./use-auth-client";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <h1>Soul Minter</h1>
        <Navigation />
        <div className="content">
          <Routes>
            <Route path="/" element={<NFTList />} />
            <Route path="/newNFT" element={<NFTForm />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
