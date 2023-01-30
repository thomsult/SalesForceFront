/* message notif display delay */
const displayTimeMessage = (displayState, callbackDisplay) => {
  if (displayState === false) {
    callbackDisplay(true);
    setTimeout(() => {
      callbackDisplay(false);
    }, 5000);
  }
  return clearTimeout();
};

export default displayTimeMessage;
