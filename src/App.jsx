import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AddContact from "./pages/AddContact";
import ContactDetails from "./pages/ContactDetails";

function App() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddContact />} />
        <Route path="/edit/:id" element={<AddContact />} />
        <Route path="/contact/:id" element={<ContactDetails />} />
      </Routes>
    </div>
  );
}

export default App;
