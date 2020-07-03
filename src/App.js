import React from 'react';
import { useState, useEffect } from 'react';
//import { useForm } from 'react-hook-form';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Button } from 'react-bulma-components';

import Axios from 'axios';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState();
  const [error, setIsError] = useState(false);
  const [meals, setMeals] = useState('hi there');
  const [myRes, setMyRes] = useState([]);

  //Set Meal Generator Options
  const [timeFrame, setTimeFrame] = useState();
  const [targetCalories, setTargetCalories] = useState(1000);
  const [diet, setDiet] = useState();
  const [exclude, setExclude] = useState();

  // let hidetimeFrame = true;
  const [btnOne, setBtnOne] = useState(true);
  const [hideOptions, setHideOptions] = useState(true);
  const [hideTimeFrame, setHideTimeFrame] = useState(true);
  const [hideTargetCalories, setHideTargetCalories] = useState(true);
  const [hideDiet, setHideDiet] = useState(true);
  const [hideExclude, setHideExclude] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const results = await Axios(url);
        setMeals(results.data.meals[0]);
        // setMyRes([...myRes, results.data.meals[0]);
        // console.log('meals Arrays', myRes);
      } catch (e) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [url]);

  return (
    <>
      {' '}
      <div className='meal-div'>
        <h1>Meal Plan Generator</h1>
        <form
          onSubmit={(e) => {
            setUrl(
              `${process.env.REACT_APP_PARTNER_URL}?timeFrame=${timeFrame}&targetCalories=${targetCalories}&diet=${diet}&exclude=${exclude}&apiKey=${process.env.REACT_APP_FOOD_KEY}`
            );
            e.preventDefault();
          }}
        >
          {console.log(meals)}
          <Button
            color='primary'
            className={`action-btn ${btnOne ? 'show' : 'hide'}`}
          >
            Generate my meal
          </Button>
          <h4
            className={`more-options-headings ${
              btnOne ? 'not-picked' : 'picked'
            }`}
            onClick={() => {
              setHideOptions(!hideOptions);
              setBtnOne(!btnOne);
            }}
          >
            {' '}
            {`${btnOne ? 'More Options ?' : 'More Options'}`}
          </h4>
          <div className={` ${!hideOptions ? 'show' : 'hide'}`}>
            <div className='meal-options-div'>
              <ul>
                <li>
                  <div>
                    <ul className='meal-gen-options time-frame'>
                      {' '}
                      <h3
                        onClick={() => {
                          setHideTimeFrame(!hideTimeFrame);
                          console.log('hellooo');
                        }}
                        className='meal-head-options'
                      >
                        timeFrame
                      </h3>
                      <br />
                      <div className={` ${!hideTimeFrame ? 'show' : 'hide'}`}>
                        <li>
                          <label>
                            day
                            <input
                              className='hide'
                              name='timeFrame'
                              type='radio'
                              value='day'
                              checked={timeFrame === 'day'}
                              onClick={(e) => {
                                setTimeFrame(e.target.value);
                                console.log(e.target.value);
                              }}
                            />
                          </label>
                        </li>
                        <li>
                          <label>
                            week
                            <input
                              className='hide'
                              name='timeFrame'
                              type='radio'
                              value='week'
                              checked={timeFrame === 'week'}
                              onClick={(e) => {
                                setTimeFrame(e.target.value);
                                console.log(e.target.value);
                              }}
                            />
                          </label>
                        </li>
                      </div>
                    </ul>
                  </div>
                </li>
                <li>
                  <h3
                    className='meal-head-options'
                    onClick={() => {
                      setHideTargetCalories(!hideTargetCalories);
                      console.log('hellooo cal');
                    }}
                  >
                    targetCalories
                  </h3>
                  <div className={` ${!hideTargetCalories ? 'show' : 'hide'}`}>
                    <br />
                    <button
                      className='change-calo'
                      onClick={() => setTargetCalories(targetCalories - 1)}
                    >
                      {' '}
                      -{' '}
                    </button>
                    <input type='text' value={targetCalories} />
                    <button
                      className='change-calo'
                      onClick={() => setTargetCalories(targetCalories + 1)}
                    >
                      {' '}
                      +{' '}
                    </button>
                  </div>
                </li>
                <li>
                  <h3
                    className='meal-head-options'
                    onClick={() => {
                      setHideDiet(!hideDiet);
                    }}
                  >
                    {' '}
                    diet
                  </h3>
                  <ul className='meal-gen-options diet'>
                    <div className={` ${!hideDiet ? 'show' : 'hide'}`}>
                      <li>
                        <label>
                          Gluten Free
                          <input
                            className='hide'
                            name='diet'
                            type='radio'
                            value='gluten free'
                            checked={diet === 'gluten free'}
                            onClick={(e) => {
                              setDiet(e.target.value);
                              console.log(e.target.value);
                            }}
                          />
                        </label>
                      </li>
                      <li>
                        <label>
                          Ketogenic
                          <input
                            className='hide'
                            name='diet'
                            type='radio'
                            value='ketogenic'
                            checked={diet === 'ketogenic'}
                            onClick={(e) => {
                              setDiet(e.target.value);

                              console.log(e.target.value);
                            }}
                          />
                        </label>
                      </li>
                      <li>
                        <label>
                          Vegetarian
                          <input
                            className='hide'
                            name='diet'
                            type='radio'
                            value='vegetarian'
                            checked={diet === 'vegetarian'}
                            onClick={(e) => {
                              setDiet(e.target.value);
                              console.log(e.target.value);
                            }}
                          />
                        </label>
                      </li>
                      <li>
                        <label>
                          None
                          <input
                            className='hide'
                            name='diet'
                            type='radio'
                            value=''
                            checked={diet === ''}
                            onClick={(e) => {
                              setDiet(e.target.value);
                              console.log(e.target.value);
                            }}
                          />
                        </label>
                      </li>
                    </div>
                  </ul>
                </li>
                <li>
                  <h3
                    className='meal-head-options'
                    onClick={() => {
                      setHideExclude(!hideExclude);
                      console.log('hellooo cal');
                    }}
                  >
                    {' '}
                    exclude
                  </h3>
                  <div className={` ${!hideExclude ? 'show' : 'hide'}`}>
                    <br />
                    <input
                      type='text'
                      onChange={(e) => setExclude(e.target.value)}
                    />
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <Button
            color='primary'
            className={`action-btn ${btnOne ? 'hide' : 'show'}`}
          >
            Generate my meal
          </Button>
        </form>
      </div>
      <div className='results-div'>
        <h1> Results</h1>
        <div>
          Image <p>Title: {meals.title}</p>
        </div>
        <p>Time:{meals.readyInMinutes}</p>
        <p>Serving: {meals.servings}</p>
      </div>
    </>
  );
}

export default App;
