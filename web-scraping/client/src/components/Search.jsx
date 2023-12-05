import { useState } from "react";
import PropTypes from "prop-types";

const Search = ({ onSearch }) => {
  const [keyword, setKeyword] = useState("");

  const handleSearch = (event) => {
    event.preventDefault(); // Prevent form submission from reloading the page
    onSearch(keyword);
  };

  return (
    <>
      <form
        className="d-flex justify-content-center mb-3"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          className="form-control w-50"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search..."
        />
        <button className="btn btn-primary ms-2" type="submit">
          Search
        </button>
      </form>
      <hr />
    </>
  );
};

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Search;
