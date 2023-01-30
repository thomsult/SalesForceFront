import PropTypes from "prop-types";
import React, { useState } from "react";

import { ArrowUturnLeftIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";
import AxiosWithAuth from "../../services/axiosRequest";

import RegisterPageStepOne from "./Register/StepOne";
import RegisterPageStepTwo from "./Register/StepTwo";

function Error(code, SetStep) {
  if (code === "user.Mail") return { email: "Exist" };
  if (code === "user.userName") {
    SetStep(0);
    return { userName: "Exist" };
  }
  return null;
}

export default function RegisterPage({ tokenData = null }) {
  const [step, SetStep] = useState(0);
  const [error, SetError] = useState(null);
  const [form, SetForm] = useState({ userName: "", password: "" });
  const [formValidToStep2, SetFormValidToStep2] = useState(false);
  const [formValidToSubmit, SetFormValidToSubmit] = useState(false);
  const [form2, SetForm2] = useState({
    email: tokenData?.email || "",
    firstName: "",
    lastName: "",
    companyName: "",
    isOnline: 1,
  });
  const [Agree, SetAgree] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = () => {
    console.warn(formValidToStep2, formValidToSubmit, Agree);
    if (formValidToStep2 && formValidToSubmit && Agree) {
      const invite = tokenData || null;
      const postBody = { ...form, ...form2, invite };
      AxiosWithAuth({
        url: `/api/register`,
        data: postBody,
        method: "Post",
      })
        .then(() => navigate("/login"))
        .catch(({ response }) => {
          console.warn(response.status, response.data);
          SetError(Error(response.data, SetStep));
          SetFormValidToSubmit(false);
        });
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center py-5 px-4 sm:px-6 lg:flex  mx-10 ">
      <div className="mx-auto w-full h-full max-w-sm lg:w-96 flex flex-col justify-between ">
        <header className="space-y-5 pb-4">
          <div className="flex ">
            <img
              className="h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h1 className="font-semibold text-5xl text-gray-800 ml-2">
              Cells<span className="text-indigo-500">Force</span>
            </h1>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Enregistrement
          </h2>

          <div className="flex justify-between pt-2">
            {step === 0 ? (
              <span className="text-gray-400 w-full text-right ">Etape 1</span>
            ) : (
              <>
                <button
                  className="text-indigo-500 font-medium flex"
                  onClick={() => SetStep(0)}
                  type="button"
                >
                  <ArrowUturnLeftIcon className="mr-1.5 h-5 " />
                  <span>Retour</span>
                </button>
                <span className="text-gray-400">Etape 2</span>
              </>
            )}
          </div>
        </header>
        {step === 0 ? (
          <RegisterPageStepOne
            errorParent={{ error, SetError }}
            onChange={(e) => {
              SetForm(e);
              if (e.userName && e.password) {
                SetFormValidToStep2(true);
              } else {
                SetFormValidToStep2(false);
              }
            }}
            value={form}
          />
        ) : (
          <RegisterPageStepTwo
            errorParent={{ error, SetError }}
            value={form2}
            onChange={(e) => {
              SetForm2(e);
              if (e.email && e.firstName && e.lastName && e.companyName) {
                SetFormValidToSubmit(true);
              } else {
                SetFormValidToSubmit(false);
              }
            }}
          />
        )}
        {(!formValidToStep2 || !formValidToSubmit) && (
          <p className="text-red-600 pt-[-1em]">
            *{" "}
            <small className="text-gray-500">
              Tous les champs avec des astérisques sont obligatoires
            </small>
          </p>
        )}
        <div className="space-y-2 mt-4">
          <div className="flex items-center pb-2">
            <input
              id="Terms"
              name="Terms"
              type="checkbox"
              value={Agree}
              onChange={() => SetAgree((e) => !e)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="Terms" className="ml-2 block text-sm text-gray-900">
              J’accepte les{" "}
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
                href="/"
              >
                conditions générales d'utilisation
              </button>
            </label>
          </div>
          <p className="text-sm font-medium text-gray-700 pb-4">
            J'ai deja un compte?{" "}
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Connexion
            </Link>
          </p>

          <button
            type="submit"
            onClick={() => {
              if (step === 0 && formValidToStep2) {
                SetStep(1);
              } else {
                handleSubmit();
              }
            }}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {step === 0 ? "Etape Suivante" : "Enregistrement"}
          </button>
        </div>
      </div>
    </div>
  );
}
RegisterPage.defaultProps = {
  tokenData: null,
};

RegisterPage.propTypes = {
  tokenData:
    PropTypes.shape({
      Author: PropTypes.string,
      Project: PropTypes.string,
      IdProject: PropTypes.string,
      email: PropTypes.string,
    }) || null,
};
