import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link, useParams, useHistory } from "react-router-dom";
import "./Navigation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "../../context/Modal";
import { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import NavBarDropdown from "./NavBarDropdown";
import NavSearch from "./NavSearch";

function Navigation() {
  const sessionUser = useSelector((state) => state.session.user);
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {}, [history.location.pathname]);

  function logout() {
    history.push("/");
    return dispatch(sessionActions.logout());
  }
  return (
    <div className="navBarContainer">
      <div className="leftNavBarContainer">
        <nav>
          <NavLink to="/">
            <img
              id="fbLogo"
              alt="fbLogo"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png"
            ></img>
          </NavLink>
          <NavSearch />
          {/* <div>
            <FontAwesomeIcon id="magnify-icon" icon={faMagnifyingGlass} />
            <input id="userSearch" placeholder="Search Facespace" type="text" />
          </div> */}
        </nav>
      </div>

      <div className="centerNavBarContainer">
        <Link id={id} className="centerNavBarContent" to="/">
          {history.location.pathname.length > 1 ? (
            <>
              <FontAwesomeIcon
                id="inactive-homepage-icon"
                className="fa-solid fa-house fa-2xl"
                icon={faHouse}
              />
            </>
          ) : (
            <FontAwesomeIcon
              id="homepage-icon"
              icon={faHouse}
              style={{ color: "#1b74e4" }}
            />
          )}
        </Link>
        {history.location.pathname.length > 1 ? null : (
          <div id="underline"></div>
        )}
      </div>

      <div className="rightNavBarContainer">
        <nav>
          <img
            id="userLogo"
            alt="userLogo"
            src={sessionUser && sessionUser.avatarUrl}
            onClick={() => {
              setShowModal((prev) => !prev);
            }}
          />
          {showModal && (
            <Modal
              position={[48, 10, null, null]}
              background={false}
              onClose={() => setShowModal(false)}
            >
              <NavBarDropdown
                sessionUser={sessionUser}
                logout={logout}
                onClose={() => setShowModal(false)}
              />
            </Modal>
          )}
        </nav>
      </div>
    </div>
  );
}

export default Navigation;
