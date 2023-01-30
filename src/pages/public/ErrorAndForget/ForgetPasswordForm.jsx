import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import InputForm from "../../../components/utils/InputForm";

export default function ForgetPasswordForm() {
  const [data, setdata] = useState({ email: "" });
  const [DisplayMessage, SetDisplayMessage] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    SetDisplayMessage(true);
    console.warn(data);
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-0">
      <InputForm
        text="Email"
        label="email"
        type="email"
        required
        onChange={(e) => {
          setdata({ ...data, email: e });
        }}
        value={data.email}
      />
      <p
        className={`${
          !DisplayMessage && "opacity-0"
        } mt-8 font-medium text-green-500 pb-4 transition-opacity`}
      >
        Un email vous a été envoyé avec votre nouveau mot de passe.
      </p>
      <p className="mt-8 pb-4 text-sm font-medium text-gray-700">
        Pas de compte?{" "}
        <Link
          to="/register"
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Enregistrement
        </Link>
      </p>
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 mb-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Récupérer mon mot de passe
        </button>
        <button
          className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white"
          type="button"
        >
          <Link to="/" className="font-medium text-indigo-600">
            Retour
          </Link>
        </button>
      </div>
    </form>
  );
}
