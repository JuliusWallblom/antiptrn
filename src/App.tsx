import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "@/pages/Home";
import { Legal } from "@/pages/Legal";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:slug" element={<Legal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;