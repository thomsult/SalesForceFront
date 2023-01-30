const useSessionStorage = () => {
  function GetValue(key) {
    if (sessionStorage.getItem(key)) {
      return JSON.parse(sessionStorage.getItem(key));
    }
    return null;
  }

  const SetValue = (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  };

  const Remove = (key) => {
    if (sessionStorage.getItem(key)) {
      sessionStorage.removeItem(key);
      return true;
    }
    return false;
  };
  return [GetValue, SetValue, Remove];
};

export default useSessionStorage;
