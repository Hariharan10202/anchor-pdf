import styles from "./sidebar.module.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { SiRender } from "react-icons/si";

const SideNavbar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.top}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className={styles.logo}>Anchor PDF</span>
        </Link>
      </div>
      <hr />
      <div className={styles.center}>
        <ul>
          <p className={styles.title}>MAIN</p>
          <li>
            <DashboardIcon className={styles.icon} />
            <span>Dashboard</span>
          </li>
          <p className={styles.title}>LISTS</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className={styles.icon} />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/templates" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className={styles.icon} />
              <span>Templates</span>
            </li>
          </Link>
          {/* <Link to="/render-template" style={{ textDecoration: "none" }}>
            <li>
              <SiRender className={styles.icon} />
              <span>Render template</span>
            </li>
          </Link> */}
          <p className={styles.title}>USER</p>
          <li>
            <AccountCircleOutlinedIcon className={styles.icon} />
            <span>Profile</span>
          </li>
          <li>
            <ExitToAppIcon className={styles.icon} />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      {/* <div className={styles.bottom}>
        <div
          className={styles.colorOption}
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className={styles.colorOption}
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div> */}
    </div>
  );
};

export default SideNavbar;
