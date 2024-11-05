import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import packageJson from "../../package.json";
export default function Layout({ handleTheme, theme }) {
  /* useEffect(() => {
    handleTheme()
  },[theme]) */
  return (
    <>
      <NavBar handleTheme={handleTheme} theme={theme} />
      <Outlet />
      <span
        className="small"
        style={{
          color: "#ddd",
          position: "absolute",
          bottom: "10px",
          left: "10px",
        }}
      >
        Versión: {packageJson.version}
      </span>
    </>
  );
}
