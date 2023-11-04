import "./App.css";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LineChart from "./components/LineChart";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chart" element={<LineChart />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
