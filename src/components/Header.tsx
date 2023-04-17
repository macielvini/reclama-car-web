import { Link } from "react-router-dom";
import logo from "../assets/LOGO.svg";
import * as TablerIcons from "@tabler/icons-react";

const Header = () => {
  return (
    <div className="fixed left-0 top-0 flex h-14 w-screen items-center justify-between bg-white px-body-padding shadow-md">
      <span>
        <TablerIcons.IconMenu2 />
      </span>
      <Link to={"/"}>
        <img src={logo} alt="imagem do logo" className="" />
      </Link>
      <span>
        <TablerIcons.IconSearch />
      </span>
    </div>
  );
};

export default Header;
