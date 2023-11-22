import { BiSolidDashboard, BiSolidGroup } from "react-icons/bi";
import classes from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import cx from "clsx";

const data = [
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  { link: "/", label: "Dashboard", icon: BiSolidDashboard },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  { link: "/users", label: "Users", icon: BiSolidGroup },
];

export const Navbar = () => {
  const links = data.map((item) => (
    <NavLink
      className={({ isActive }) =>
        cx(classes.link, isActive && classes.linkActive)
      }
      to={item.link}
      key={item.link}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} size={20} />
      <span>{item.label}</span>
    </NavLink>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>{links}</div>
    </nav>
  );
};
