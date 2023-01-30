// --------- get localstorage user data !! Change for sessionStorage !! ------------ //

function getUserData() {
  return JSON.parse(sessionStorage.getItem("User"));
}

export default getUserData;
