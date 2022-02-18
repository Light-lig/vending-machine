import React from "react";
import Machine from "./views/machine";
import { ShopProvider } from "./store/ShopProvider";

function App() {
  return (
    <ShopProvider>
        <Machine />
    </ShopProvider>
  );
}

export default App;
