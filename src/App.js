import React from 'react';
import { useState } from 'react';
//import { useForm } from 'react-hook-form';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Button } from 'react-bulma-components';

import Axios from 'axios';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState(false);
  const [isError, setIsError] = useState();
  const [data, setData] = useState({ meals: [] });
  const [dataNu, setDataNu] = useState('');

  //Set Meal Generator Options
  const [timeFrame, setTimeFrame] = useState();
  const [targetCalories, setTargetCalories] = useState(1000);
  const [diet, setDiet] = useState();
  const [exclude, setExclude] = useState();

  const [url, setUrl] = useState(
    `${process.env.REACT_APP_PARTNER_URL}?timeFrame=${timeFrame}&targetCalories=${targetCalories}&diet=${diet}&exclude=${exclude}&apiKey=${process.env.REACT_APP_FOOD_KEY}`
  );

  // let hidetimeFrame = true;
  const [btnOne, setBtnOne] = useState(true);
  const [hideOptions, setHideOptions] = useState(true);
  const [hideTimeFrame, setHideTimeFrame] = useState(true);
  const [hideTargetCalories, setHideTargetCalories] = useState(true);
  const [hideDiet, setHideDiet] = useState(true);
  const [hideExclude, setHideExclude] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const result = await Axios(url);
      setData(result.data);
      setDataNu(result.data.nutrients);
      setIsError(false);
      setView(true);
    } catch (e) {
      setIsError(true);
    }
    setIsLoading(false);
  };

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
          <Button
            color='success'
            className={`action-btn ${btnOne ? 'show' : 'hide'} ${
              isLoading ? 'is-loading' : null
            }`}
            onClick={() => {
              fetchData();
            }}
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
            {`${btnOne ? 'More Options ?' : 'Hide Options'}`}
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
            className={`action-btn ${btnOne ? 'hide' : 'show'} ${
              isLoading ? 'is-loading' : null
            }`}
            onClick={() => {
              setHideOptions(!hideOptions);
              setBtnOne(!btnOne);
              fetchData();
            }}
          >
            Generate my meal
          </Button>
        </form>
      </div>
      <div className='div-results'>
        {view && (
          <>
            <h1> Results</h1>
            <div>
              <div className='result-div-day'>
                <div>
                  {data.meals.map((items) => (
                    <div className='meal-info-div'>
                      <div className='meal-image-title'>
                        <img
                          className='meal-img'
                          src={'assets/img/meal-pic.jpg'}
                          alt='meals'
                        />
                        <p className='meal-title'>{items.title}</p>
                        <p className='meal-fav'>Fav</p>
                      </div>
                      <div className='meal-info'>
                        <p>Ready Time: {items.servings}</p>

                        <p>Servings: {items.readyInMinutes}</p>
                      </div>
                      <Button color='primary' className=''>
                        Get Full Info Plus Recipe
                      </Button>
                    </div>
                  ))}
                </div>
                <div>
                  <h2>Nutrients</h2>
                  <p>Calories: {dataNu.calories}</p>
                  <p>Protein: {dataNu.protein}</p>
                  <p>Fat: {dataNu.fat}</p>
                  <p>Carbohydrates: {dataNu.carbohydrates}</p>
                </div>
              </div>
            </div>
          </>
        )}

        {isError && <>An error Occured!</>}
      </div>
    </>
  );
}

export default App;
