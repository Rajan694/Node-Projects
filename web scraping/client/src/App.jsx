import { useState } from "react";
import axios from "axios";
import Search from "./components/Search";
import Results from "./components/Results";

const App = () => {
  const [results, setResults] = useState(null);

  const handleSearch = async (keyword) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/search?q=${keyword}`
      );
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };
  return (
    <>
      <div className="container mt-2">
        <Search onSearch={handleSearch} />
        <Results results={results} />
      </div>
    </>
  );
};

export default App;
