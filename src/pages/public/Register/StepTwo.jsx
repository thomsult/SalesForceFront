import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";

import InputForm from "../../../components/utils/InputForm";
import CompanySelect from "../../../components/utils/CompanySelect";

export default function RegisterPageStepTwo({ value, onChange, errorParent }) {
  const [data, setdata] = useState(value);
  useEffect(() => {
    onChange(data);
  }, [data]);
  return (
    <div className="space-y-3 ">
      <InputForm
        isInvalid={errorParent.error?.email || ""}
        errorMessage="Email déjà utilisé"
        text="Email"
        label="email"
        type="email"
        required
        onChange={(e) => {
          setdata({ ...data, email: e });
          errorParent.SetError(null);
        }}
        value={data.email}
      />

      <div className="flex items-center gap-5">
        <InputForm
          text="Prénom"
          label="firstName"
          type="text"
          required
          onChange={(e) => {
            setdata({ ...data, firstName: e });
          }}
          value={data.firstName}
        />
        <InputForm
          text="Nom de Famille"
          label="lastName"
          type="text"
          required
          onChange={(e) => {
            setdata({ ...data, lastName: e });
          }}
          value={data.lastName}
        />
      </div>
      <CompanySelect
        onChange={(e) => {
          setdata({ ...data, companyName: e.name });
        }}
        value={data.companyName}
      />
    </div>
  );
}

RegisterPageStepTwo.defaultProps = {
  errorParent: {},
};

RegisterPageStepTwo.propTypes = {
  errorParent: PropTypes.any || null,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
};
