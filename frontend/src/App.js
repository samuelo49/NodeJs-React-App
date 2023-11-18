import React, { useContext, useEffect } from "react";
import { Context } from "./context";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";

const App = () => {
  const { state, dispatch } = useContext(Context);

  useEffect(() => {}, []);
  return (
    <>
      <Navbar auth={false} />
      // Define the Routes components which wraps all of the application routes
      <Routes>
        // For each route, we need to define a Route component so the browser can 
        // redirect to the right component.
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
};

export default App;