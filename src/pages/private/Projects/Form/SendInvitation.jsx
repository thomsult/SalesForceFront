import PropTypes from "prop-types";
import React from "react";
import InputForm from "../../../../components/utils/InputForm";

export default function SendInvitation({ handleInvite, search }) {
  const sendInviteEmail = (e) => {
    e.preventDefault();
    if (e.target.email.value) {
      const TemplateUser = {
        userName: e.target.email.value + Math.floor(Math.random() * 100 + 1),
        email: e.target.email.value,
        companyName: null,
        profilePicture: "/templateAccount.png",
      };
      handleInvite(TemplateUser);
    }
  };

  return (
    <div className="p-4   w-full h-full flex flex-col items-center justify-center">
      <form
        onSubmit={sendInviteEmail}
        className="border border-gray-300 p-8 px-20 rounded-lg space-y-[1em] "
      >
        <p className="text-gray-600 font-light">
          <span className="text-black capitalize font-medium">{search}</span>{" "}
          n'a pas encore de compte sur{" "}
          <span className="text-black font-medium">CellsForce</span>
          <br /> voulez vous envoyer une invitation ?
        </p>
        <InputForm
          text="Email"
          name="email"
          label="email"
          type="email"
          required
          errorMessage="Email invalid"
        />
        <button
          type="submit"
          className="w-full  justify-center inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
        >
          <span>Envoyer une Invitation</span>
        </button>
      </form>
    </div>
  );
}

SendInvitation.defaultProps = {
  search: "",
  handleInvite: () => {},
};
SendInvitation.propTypes = {
  search: PropTypes.string,
  handleInvite: PropTypes.func,
};
