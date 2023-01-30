import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import ErrorMessage from "./public/Components/ErrorMessage";
import HomeMessage from "./public/Components/HomeMessage";
import LoginPage from "./public/LoginPage";
import RegisterPage from "./public/RegisterPage";
import Invitation from "./public/Invitation";

import ErrorPage from "./public/ErrorPage";

export default function PublicRoutes() {
  const [error, SetError] = useState(null);

  return (
    <main className="min-h-full flex bg-[#1F2937]  ">
      <div className="flex justify-center w-full">
        <div className=" md:w-screen md:flex md:flex-coll h-screen max-w-7xl">
          {error ? <ErrorMessage error={error} /> : <HomeMessage />}
          <section className=" bg-white shadow-2xl w-screen md:w-fit  h-screen rounded md:h-fit md:m-auto md:py-10 flex	mx-auto">
            <Routes>
              <Route exact path="/" element={<Navigate to="/login" />} />
              <Route exact path="/register" element={<RegisterPage />} />
              <Route exact path="/login" element={<LoginPage />} />
              <Route path="/invitation/:invitation" element={<Invitation />} />

              <Route
                path="/"
                element={<ErrorPage public callBack={SetError} />}
              />
            </Routes>
          </section>
        </div>
      </div>
    </main>
  );
}
