function useCookies() {
  const setCookie = (key, value, option) => {
    const optionToString = Object.entries(option)
      .map((e) => {
        return e.join("=");
      })
      .join(";");

    document.cookie = `${key}=${value || ""}; path=/; ${optionToString}`;
    return true;
  };

  function removeCookie(key) {
    setCookie(key, "", {
      secure: false,
      sameSite: "none",
      expires: "Thu, 01-Jan-1970 00:00:01 GMT",
    });
  }

  const removeAllCookies = () => {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i += 1) {
      removeCookie(cookies[i].split("=")[0]);
    }
  };

  const getCookies = () => {
    const cooks = {};
    // eslint-disable-next-line no-unused-expressions
    document.cookie.split(";").forEach((e) => {
      if (e) {
        const cook = e.split("=");
        cooks[cook[0].trim()] = cook[1].trim();
      }
      return null;
    }) || null;

    return cooks;
  };

  return { cookies: getCookies(), setCookie, removeCookie, removeAllCookies };
}

export default useCookies;
