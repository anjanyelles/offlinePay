import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { TbAlpha } from "react-icons/tb";

import { ConfigContext } from "../../../../contexts/ConfigContext";
import * as actionType from "../../../../store/actions";

const NavLogo = () => {
  const configContext = useContext(ConfigContext);
  const { collapseMenu } = configContext.state;
  const { dispatch } = configContext;

  let toggleClass = ["mobile-menu"];
  if (collapseMenu) {
    toggleClass = [...toggleClass, "on"];
  }

  return (
    <React.Fragment>
      <div className="navbar-brand header-logo">
        <Link to="#" className="b-brand">
          <div className="b-bg">
            <TbAlpha className="feather fs-4 text-white"></TbAlpha>
            {/* <i className="feather icon-trending-up" /> */}
            {/* <FontAwesomeIcon icon="fa-brands fa-react" /> */}
            <i class="fa fa-etsy" aria-hidden="true"></i>
          </div>
          <span className="b-title">My Portfolio</span>
        </Link>
        <Link
          to="#"
          className={toggleClass.join(" ")}
          id="mobile-collapse"
          onClick={() => dispatch({ type: actionType.COLLAPSE_MENU })}
        >
          <span />
        </Link>

      </div>     
      <div className="navbar-brand header-logo"><span className="b-title"  style={{textAlign:'center',color:'white'}}>LR {" "}{localStorage.getItem("lenderId")}</span></div> 
           

    </React.Fragment>
  );
};

export default NavLogo;
