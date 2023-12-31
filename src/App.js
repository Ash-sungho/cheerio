import { useState } from "react";
import "./App.css";
import SearchForm from "./components/SearchForm";
import SearchList from "./components/SearchList";

function App() {
  const [data, setData] = useState("");

  const fetchData = async (keyword) => {
    const params = new URLSearchParams();
    params.append("keyword", keyword);
    fetch(`http://localhost:9999/test?${params}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        console.log("res : ", res);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((resJson) => {
        console.log("resJson : ", resJson);
        setData(resJson);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  return (
    <div className="App">
      <SearchForm getData={fetchData} />
      <SearchList />
      {JSON.stringify(data, null, 2)}
    </div>
  );
}

export default App;
