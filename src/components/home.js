import React from 'react';
import { useState, forwardRef, useEffect } from 'react';
import {
  SimpleGrid,
  Box,
  PseudoBox,
  Icon,
  Stack,
  Collapse,
  Flex,
  ThemeProvider,
  Input,
  Button,
  Radio,
  RadioButtonGroup,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/core';

import { PieChart } from 'react-minimal-pie-chart';

import {
  faHome,
  faHeart,
  faUtensils,
  faClock,
} from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Axios from 'axios';

let dailyArr = [];
function Home() {
  const [show, setShow] = useState(false);
  const [isLoadingCo, setIsLoadingCo] = useState(false);
  const [view, setView] = useState(false);
  const [count, setCount] = useState(0);
  const [isError, setIsError] = useState();
  const [data, setData] = useState({ meals: [] });
  const [tstData, setTstData] = useState({ meals: [] });
  const [choosen, setChoosen] = useState(-1);
  const [dailyArray, setDailyArray] = useState([]);

  //Set Meal Generator Options
  const [timeFrame, setTimeFrame] = useState('');
  const [targetCalories, setTargetCalories] = useState(0);
  const [diet, setDiet] = useState('');
  const [exclude, setExclude] = useState('');
  const [imgArr, setImgArr] = useState(['assets/img/meal-pic.jpg']);

  const [url, setUrl] = useState(
    `${process.env.REACT_APP_PARTNER_URL}?timeFrame=${timeFrame}&targetCalories=${targetCalories}&diet=${diet}&exclude=${exclude}&apiKey=${process.env.REACT_APP_FOOD_KEY}`
  );

  const [btnOne, setBtnOne] = useState(true);
  const [dataImg, setDataImg] = useState([]);

  let imgSrc = [];
  const fetchData = async () => {
    setIsLoadingCo(true);
    try {
      const result = await Axios(url);
      setData(result.data);
      setIsError(false);
      setView(true);
      setCount(count + 1);
      let myArrr = result.data.meals.map((i) => i.sourceUrl);
      let promise = new Promise((setDailyArray, reject) => {
        setDailyArray([...myArrr]);
      });

      promise.then((d) =>
        d.forEach((el) => {
          (async () => {
            try {
              const imgRes = await Axios(
                `${process.env.REACT_APP_PARTNER_URL_RECIPE}?url=${el}&apiKey=${process.env.REACT_APP_FOOD_KEY}`
              );
              imgSrc.push(imgRes.data.image);
              setImgArr([...imgSrc]);

              let testArr = [];

              let mypromise = new Promise((resolve, rej) => {
                result.data.meals.forEach((i, idx) => {
                  let nwo = { ...i, url: imgSrc[idx] };
                  testArr.push(nwo);
                  setDataImg([...testArr]);
                });
              });
              mypromise.then((d) => setDataImg([...testArr]));
            } catch (e) {
              console.log(e);
            }
          })();
        })
      );
    } catch (e) {
      setIsError(true);
    }
    setIsLoadingCo(false);
  };

  //Set Recipe Generation
  const [recipe, setRecipe] = useState({});
  const [recipeView, setRecipeView] = useState(false);
  const [isLoadingRecipe, setIsLoadingRecipe] = useState(null);
  const [isErrorRecipe, setIsErrorRecipe] = useState(false);
  const [recipeUrl, setRecipeUrl] = useState('');
  const [dailyDataArr, setDailyDataArr] = useState({});

  const fetchRecipe = async () => {
    try {
      setRecipeView(true);
      let res = await Axios(recipeUrl);
      setRecipe(res.data);
    } catch (e) {
      setIsErrorRecipe(true);
    }

    setIsLoadingRecipe(false);
  };

  const CustomRadio = forwardRef((props, ref) => {
    const { isChecked, isDisabled, value, ...rest } = props;
    return (
      <Button
        className='custom-btn'
        ref={ref}
        variantColor={isChecked ? 'red' : 'gray'}
        aria-checked={isChecked}
        role='radio'
        isDisabled={isDisabled}
        size='sm'
        {...rest}
      />
    );
  });

  let handleChange = (e) => {
    setTargetCalories(e.target.value);
  };
  return (
    <>
      <ThemeProvider>
        {' '}
        <div className='meal-div'>
          <div className='meal-intro'>
            <h1 className='site-title'>Free Meal Planner </h1>
            <p>
              Never run out of ideas of what to eat, automate your diets with
              our personalized meal planner generator. With over 50,000 cuisines
              and meals to choose from, plan your meal in advance for a healthy
              living
            </p>

            <p>
              Get personalized meal plans based your calories requirement, plan
              duration, and your diet type all in one place.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              setUrl(
                `${process.env.REACT_APP_PARTNER_URL}?timeFrame=${timeFrame}&targetCalories=${targetCalories}&diet=${diet}&exclude=${exclude}&apiKey=${process.env.REACT_APP_FOOD_KEY}`
              );
              e.preventDefault();
            }}
          >
            <div className='meal-options'>
              <RadioButtonGroup
                defaultValue='none'
                onChange={(val) => {
                  setDiet(val);
                }}
                isInline
              >
                <CustomRadio value='none'>None</CustomRadio>
                <CustomRadio value='ketogenic'>Ketogenic</CustomRadio>
                <CustomRadio value='gluten-free'>Gluten Free</CustomRadio>
                <CustomRadio value='vegetarian'>Vegetarian</CustomRadio>
                <CustomRadio value='vegan'>Vegan</CustomRadio>
                <CustomRadio value='paleo'>Paleo</CustomRadio>
              </RadioButtonGroup>

              <div className='input-options'>
                <Stack spacing={0}>
                  <NumberInput
                    step={50}
                    defaultValue={1000}
                    min={200}
                    max={10000}
                    isFullWidth={true}
                  >
                    <NumberInputField
                      isFullWidth={true}
                      onChange={handleChange}
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper bg='green.400' />
                      <NumberDecrementStepper bg='green.400' />
                    </NumberInputStepper>
                  </NumberInput>

                  <Collapse startingHeight={0} isOpen={show}>
                    <Select
                      backgroundColor='tomato'
                      borderColor='tomato'
                      placeholder='Meal Plan Duration'
                      className='meal-duration'
                      onChange={(e) => {
                        setTimeFrame(e.target.value);
                      }}
                    >
                      <option value='day'>day</option>
                      <option value='week'>Week</option>
                    </Select>
                    <Input
                      size='sm'
                      placeholder='Exclude'
                      type='text'
                      variant='flushed'
                      onChange={(e) => setExclude(e.target.value)}
                    />
                  </Collapse>
                  <Button size='sm' onClick={() => setShow(!show)} mt='1rem'>
                    Show {show ? 'Less' : 'More'}
                  </Button>
                </Stack>
              </div>

              <Button
                isLoading={isLoadingCo}
                variantColor='green'
                loadingText='Loading'
                className='action-btn'
                onClick={() => {
                  fetchData();
                }}
              >
                {count >= 1 ? 'Generate Another Meal' : 'Generate my meal'}
              </Button>
            </div>
          </form>
        </div>
        <div className='div-results' id='results-id'>
          {!isError && view && (
            <>
              <h2 className='results-day'> Results</h2>
              <div>
                <div className='result-div-day'>
                  <div className='columns '>
                    <div className='nutrients-day m'>
                      <h2 className='nutrients-headings'>Nutrients</h2>
                      <Flex align='center' justify='space-between'>
                        <div className='pie-chart'>
                          <PieChart
                            data={[
                              {
                                title: 'Protein',
                                value: data.nutrients.protein,
                                color: '#E38627',
                              },
                              {
                                title: 'Fat',
                                value: data.nutrients.fat,
                                color: '#C13C37',
                              },
                              {
                                title: 'Carbohydrates',
                                value: data.nutrients.carbohydrates,
                                color: '#6A2135',
                              },
                            ]}
                          />
                          <Flex align='center'>
                            <Flex align='center'>
                              <Icon name='minus' size='32px' color='#E38627' />
                              <span className='nut-name'>Protein</span>
                              &nbsp;&nbsp;
                            </Flex>
                            <Icon name='minus' size='32px' color='#C13C37' />
                            <span className='nut-name'>Fats</span>
                            &nbsp;&nbsp;
                            <Icon name='minus' size='32px' color='#6A2135' />
                            <span className='nut-name'>Carb.</span>
                          </Flex>
                        </div>
                        <Flex justify='space-between' wrap='wrap'>
                          <div className='nutrients-spec'>
                            <p>
                              <img
                                className='calo-img protein'
                                src={'assets/img/protein.svg'}
                                alt='Protein :'
                              />

                              {data.nutrients.protein}
                            </p>
                            <p>
                              <img
                                className='calo-img fat'
                                src={'assets/img/fats.svg'}
                                alt='Fats: '
                              />
                              {data.nutrients.fat}
                            </p>
                            <p>
                              <img
                                className='calo-img carb'
                                src={'assets/img/carb.svg'}
                                alt='Carbohydrates :'
                              />
                              {data.nutrients.carbohydrates}
                            </p>
                          </div>
                        </Flex>
                      </Flex>
                    </div>

                    <div className='meal-div-mapping'>
                      {dataImg.map((items) => (
                        <>
                          <div className='meal-card-div'>
                            <div className='img-div'>
                              <p className='meal-tit'>
                                {items.title.length <= 18
                                  ? items.title
                                  : items.title
                                      .replace(/[{()}]/g, '')
                                      .slice(0, 18) + '...'}
                              </p>

                              <img
                                className='meal-box-img'
                                src={items.url}
                                alt='meals'
                              />

                              <div className='div-flex'>
                                <div>
                                  <div className='other-meal-info'>
                                    <FontAwesomeIcon
                                      icon={faClock}
                                      className='other-meal-icon'
                                    />
                                    <p className='ready-para'>
                                      {items.readyInMinutes} mins
                                    </p>
                                    <FontAwesomeIcon
                                      icon={faUtensils}
                                      className='other-meal-icon utensils'
                                    />
                                    <p> {items.servings} servings</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <Flex align='flex-start'>
                              <Button
                                value={items.id}
                                isLoading={isLoadingRecipe}
                                // loadingText='Loading'
                                bg='white'
                                size='md'
                                height='48px'
                                width='200px'
                                className='get-recipe-btn'
                                variantColor='green'
                                variant='outline'
                                onClick={(e) => {
                                  setRecipeView(false);
                                  let a = dailyArr[0];
                                  setDailyDataArr(dailyArr[0]);
                                  let pos = a.id.findIndex(
                                    (i) => i === items.id
                                  );

                                  if (pos >= 0) {
                                    setIsLoadingRecipe(true);
                                  }
                                  setChoosen(pos);
                                  let newUrl = dailyArr[0].url[pos];
                                  setRecipeUrl(
                                    `${process.env.REACT_APP_PARTNER_URL_RECIPE}?url=${newUrl}&apiKey=${process.env.REACT_APP_FOOD_KEY}`
                                  );
                                  setRecipeView(false);
                                  //  fetchRecipe();
                                }}
                              >
                                Get Recipe
                              </Button>
                            </Flex>
                          </div>
                        </>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          {isError && <>An error Occured!</>}
        </div>
        {!isErrorRecipe && recipeView && (
          <>
            <div>
              <div>
                <div>Food Image</div>
                <div>
                  <Flex align='center' justify='center'>
                    {/* <p>{recipe.preparationMinutes}</p> */}
                    {/* <p>{recipe.cookingMinutes}</p>
                    <p>{recipe.pricePerServing}</p>
                    <p>{recipe.healthscore}</p>
                    <p>{recipe.servings}</p>
                    <p>{recipe.diets.join(',')}</p> */}
                  </Flex>
                </div>
              </div>
              <div>
                Ingredients
                {}
              </div>
              <div>Instructions</div>
            </div>
          </>
        )}
        {isErrorRecipe && <>Error Fetching Recipe</>}
      </ThemeProvider>
    </>
  );
}

export default Home;
