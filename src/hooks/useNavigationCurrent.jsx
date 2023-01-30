import { useLocation } from "react-router-dom";

export default function useNavigationCurrent() {
  const CurrentLoc = useLocation().pathname;
  // const pathname = CurrentLoc.match(/dashboard\/Interface/);
  const pathname = useLocation().pathname.match(/Projects\/(.*)/);
  const projectName = pathname ? pathname[1] : null;

  const CurrentNav = (path) => {
    return path === CurrentLoc;
  };
  return { CurrentNav, projectName };
}
