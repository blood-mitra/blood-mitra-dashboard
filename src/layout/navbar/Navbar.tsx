import cx from "clsx";

import { BiSolidDashboard, BiSolidGroup } from "react-icons/bi";

import { NavLink } from "react-router-dom";

import classes from "./Navbar.module.css";

const LINKS = [
  { link: "/", label: "Dashboard", icon: BiSolidDashboard },
  { link: "/users", label: "Users", icon: BiSolidGroup },
];

export const Navbar = () => {
  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        {LINKS.map((item) => (
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
        ))}
      </div>
    </nav>
  );
};
