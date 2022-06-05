import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./views/Homepage";
import Search from "./views/Search";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="search" element={<Search />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
