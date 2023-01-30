import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";

import InputForm from "../../../components/utils/InputForm";

export default function RegisterPageStepOne({ onChange, value, errorParent }) {
  const [data, setdata] = useState(value);
  const [password, setpassword] = useState({ initial: value.password || "" });
  const [passwordInvalid, setpasswordInvalid] = useState("");
  const handleChange = (label, cvalue) => setdata({ ...data, [label]: cvalue });
  const handleChangePassword = (label, cvalue) => {
    setpassword({ ...password, [label]: cvalue });
  };

  useEffect(() => {
    if (password.initial === password.confirm && password.initial.length >= 6) {
      setdata({ ...data, password: password.initial });
      setpasswordInvalid(false);
    } else if (
      password.initial === password.confirm &&
      password.initial.length < 6
    ) {
      setdata({ ...data, password: value.password || "" });
      setpasswordInvalid("Le mot de passe doit contenir au moins 6 caractères");
    } else {
      setdata({ ...data, password: value.password || "" });
      setpasswordInvalid("Veuillez entrer le même mot de passe");
    }
  }, [password]);

  useEffect(() => {
    onChange(data);
  }, [data]);

  return (
    <div className="h-full">
      <InputForm
        isInvalid={errorParent.error?.userName || ""}
        errorMessage="Nom d’utilisateur déjà utilisé"
        text="Nom d’utilisateur"
        label="userName"
        type="text"
        required
        onChange={(e) => {
          errorParent.SetError(null);
          handleChange("userName", e);
        }}
        value={data.userName}
      />
      <div className="">
        <InputForm
          text="Mot de passe"
          label="password"
          type="password"
          required
          onChange={(e) => handleChangePassword("initial", e)}
          value={data.password}
        />
        <InputForm
          text="Confirmer mon mot de passe"
          label="confirmPassword"
          type="password"
          required
          onChange={(e) => handleChangePassword("confirm", e)}
          value={data.password}
        />
        {passwordInvalid && (
          <p className="">
            <small className="text-red-500">{passwordInvalid}</small>
          </p>
        )}
      </div>
    </div>
  );
}
RegisterPageStepOne.defaultProps = {
  value: { password: "" },
  errorParent: null,
};

RegisterPageStepOne.propTypes = {
  errorParent: PropTypes.any || null,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.shape({
    password: PropTypes.string,
  }),
};
