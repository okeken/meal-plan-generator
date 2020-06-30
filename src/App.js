import React from 'react';
import { useState, useEffect } from 'react';
import Axios from 'axios';

function App() {
  const [url, setUrl] = useState();
  const [isLoading, setIsLoading] = useState();
  const [error, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const results = await Axios(url);
        setUrl(results.datav);
      } catch (e) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [url]);

  return (
    <>
      <h1>Meal Plan Generator</h1>
      {console.log(process.env.REACT_APP_KEY)}
    </>
  );
}

export default App;
