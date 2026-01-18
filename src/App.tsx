import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "@/pages/Home";
import { Install } from "@/pages/Install";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/install" element={<Install />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;