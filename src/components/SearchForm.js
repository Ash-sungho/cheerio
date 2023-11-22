import React, { useState } from "react";

const SearchForm = ({ getData }) => {
  const [keyword, setKeyword] = useState("");

  return (
    <div className="form">
      <input
        placeholder="요청주소입력"
        type="text"
        className="form-text"
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
      />
      <button
        type="button"
        className="form-btn"
        onClick={() => {
          if (keyword) {
            getData(keyword);
          }
        }}
      >
        search
      </button>
    </div>
  );
};

export default SearchForm;
