import PropTypes from "prop-types";
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AxiosWithAuth from "../../../services/axiosRequest";
import { AuthContext } from "../../../services/AuthContext";
import InputForm from "../../../components/utils/InputForm";

export default function LoginForm({ forget }) {
  const nav = useNavigate();
  const { connection } = useContext(AuthContext);
  const [data, setdata] = useState({ email: "", password: "" });
  const [error, SetError] = useState(false);

  const handleSubmit = (event) => {
    const { email, password, remember } = event.target;
    const postBody = {
      email: email.value,
      password: password.value,
      remember: remember.checked,
    };
    if (postBody.email.length > 0 && postBody.password.length > 0) {
      AxiosWithAuth({
        url: `/api/login`,
        data: postBody,
        method: "Post",
      })
        .then((res) => {
          connection(res.data.user);
        })
        .catch((err) => {
          SetError(true);
          if (err.response.data.validationErrors) {
            console.warn(err.response.data.validationErrors);
            nav("/dashboard");
          } else {
            console.warn("login ou mot de passe incorrect");
          }
        });
    }

    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 ">
      <InputForm
        isInvalid={error ? "email" : ""}
        errorMessage="Email invalide"
        text="Email"
        label="email"
        type="email"
        required
        onChange={(e) => {
          setdata({ ...data, email: e });
        }}
        value={data.email}
      />

      <InputForm
        isInvalid={error ? "password" : ""}
        errorMessage="Mot de passe invalide"
        text="Mot de passe"
        label="password"
        type="password"
        required
        onChange={(e) => setdata({ ...data, password: e })}
        value={data.password}
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember"
            name="remember"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label
            htmlFor="remember"
            className="ml-2 block text-sm text-gray-900"
          >
            Garder ma session active
          </label>
        </div>

        <div className="text-sm">
          <button
            onClick={(e) => forget(e)}
            type="button"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Mot de passe oublié ?
          </button>
        </div>
      </div>
      <p className="mt-8 text-sm font-medium text-gray-700">
        Pas de Compte?{" "}
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
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Connexion
        </button>
      </div>
    </form>
  );
}

LoginForm.propTypes = {
  forget: PropTypes.func.isRequired,
};
