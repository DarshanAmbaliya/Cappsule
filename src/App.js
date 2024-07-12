import React, { useState, useEffect, createRef } from 'react';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import './App.css'
import Box from './Box';


function App() {
  const [medicine, setMedicine] = useState("");
  const [data, setData] = useState();
  let textInput = createRef();

  const getMedicine = () => {
    setMedicine(textInput.current.value)
  }
  useEffect(() => {
    (async () => {
      const res = await axios.get(
        `https://backend.cappsule.co.in/api/v1/new_search?q=${medicine}&pharmacyIds=1,2,3`
      );
      const data = res.data.data;
      setData(data.saltSuggestions);

    })();
  }, [medicine]);
  console.log(data);

  if (!data) {
    return <>Loading...</>;
  }

  return (
    <>
      <section>
        <div className="container">
          <div className="row">
            <div className="searchbar">
              <div className="content">
                <div className="search">
                  <SearchIcon onClick={getMedicine} />
                </div>
                <form action="" onSubmit={(e) => {
                  e.preventDefault();
                  getMedicine();
                }}>
                  <input type="text" ref={textInput} placeholder='Type your medicine name here' />
                </form>
                <div className="btn">
                  <button onClick={getMedicine}>search</button>
                </div>
              </div>
            </div>
            <hr />
            <div className="main-box">
              { medicine ?
                data.map((val) => {
                const { id, available_forms, salt_forms_json, salt } = val;
                return (
                  <Box
                    key={id}
                    id={id}
                    availableForms={available_forms}
                    saltFormsJson={salt_forms_json}
                    salt={salt}
                  />
                );
              }): <h2>" Find medicine with amazing discount "</h2>
              }
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;