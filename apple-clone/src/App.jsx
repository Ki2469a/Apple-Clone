import { Route, Routes } from "react-router-dom";
import React from "react";
import "./css/bootstrap.css";
import "./Style.css";


// Pages
import Iphone from "./Components/pages/Iphone/Iphone";

import Ipad from "./Components/Pages/Ipad/Ipad";
import Music from "./Components/Pages/Music/Music";
import Cart from "./Components/Pages/Cart/Cart";
import Support from "./Components/Pages/Support/Support";
import TV from "./Components/Pages/TV/TV";
import Watch from "./Components/Pages/Watch/Watch";

import ProductPage from "./Components/Pages/ProductPage/ProductPage";

import Mac from "./Components/pages/Mac/Mac";
import SharedLayout from "./Components/SharedLayout/SharedLayout";
import Main1 from "./Components/Main1";
import Four04 from "./Components/Pages/Four04/Four04";
import SharedVideo from "./Components/pages/SharedVideo/SharedVideo";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route path="/" element={<SharedVideo />}>
            <Route path="/" element={<Main1 />} />
            <Route path="/TV" element={<TV />} />
            <Route path="/Watch" element={<Watch />} />
          </Route>
          <Route path="/Iphone" element={<Iphone />} />
          <Route path="/Music" element={<Music />} />
          <Route path="/Support" element={<Support />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/mac" element={<Mac />} />
          <Route path="/iPad" element={<Ipad />} />
          <Route path="/iphone/:pid" element={<ProductPage />} />
          <Route path="*" element={<Four04 />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
