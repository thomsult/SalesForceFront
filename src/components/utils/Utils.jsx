function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function capitalise(string) {
  return string[0].toUpperCase() + string.substring(1);
}
export { capitalise, classNames };
