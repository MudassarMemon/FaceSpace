import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearSearchResults, fetchSearchResults } from "../../store/search";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./NavSearch.css";

function NavSearch() {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const history = useHistory();
  const searchResults = useSelector((state) => Object.values(state.search));

  const handleChange = (e) => {
    const query = e.target.value;
    setSearchText(query);

    if (query.trim() !== "") {
      dispatch(fetchSearchResults(query));
    } else {
      dispatch(clearSearchResults());
    }
  };

  const handleClick = (id) => {
    return (e) => {
      e.preventDefault();
      history.push(`/users/${id}`);
      dispatch(clearSearchResults());
      setSearchText("");
    };
  };

  return (
    <div>
      <FontAwesomeIcon id="magnify-icon" icon={faMagnifyingGlass} />
      <input
        id="userSearch"
        placeholder="Search Officebook"
        type="text"
        value={searchText}
        onChange={handleChange}
      />

      <div className="search-dropdown">
        <ul>
          {searchResults
            ? searchResults.map((result) => (
                <li onClick={handleClick(result.id)} key={result.id}>
                  <div>
                    <img id="userIcon" alt="" src={result?.avatarUrl}></img>
                    <p>
                      {result.firstName} {result.lastName}
                    </p>
                  </div>
                </li>
              ))
            : ""}
        </ul>
      </div>
    </div>
  );
}

export default NavSearch;
