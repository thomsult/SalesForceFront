import React, { useState } from "react";
import LoginForm from "./Login/LoginForm";
import ForgetPasswordForm from "./ErrorAndForget/ForgetPasswordForm";

export default function LoginPage() {
  const [loginForm, SetLoginForm] = useState(true);
  return (
    <div className="flex-auto md:w-[50vw] md:max-w-[650px] flex flex-col justify-center py-5 mx-4 pl-6 sm:pl-4 lg:flex lg:px-10 xl:px-24">
      <div>
        <div className=" pb-4 ">
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
            {`${loginForm ? "Connexion" : "Mot de passe oublié"}`}
          </h2>
        </div>
        {loginForm ? (
          <LoginForm forget={() => SetLoginForm((e) => !e)} />
        ) : (
          <ForgetPasswordForm />
        )}
      </div>
    </div>
  );
}
