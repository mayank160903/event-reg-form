import DisplayData from "./DisplayData";
import Footer from "./Footer";
import Form from "./Form";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="">
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/details" element={<DisplayData /> } />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
