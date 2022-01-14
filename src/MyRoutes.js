import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navibar from "./components/Navibar";
import AddPage from "./pages/AddPage";
import EditPage from "./pages/EditPage";
import HomePage from "./pages/HomePage";
import "bootstrap/dist/css/bootstrap.min.css";
import MainProvider from "./context/MainProvider";

const MyRoutes = () => {
  return (
    <MainProvider>
      {/* Тут мы подключаем старницы,которые будем использовать */}
      <BrowserRouter>
        <Navibar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddPage />} />
          <Route path="/edit/:id" element={<EditPage />} />
        </Routes>
      </BrowserRouter>
    </MainProvider>
  );
};

export default MyRoutes;
