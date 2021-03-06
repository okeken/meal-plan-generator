import React from 'react';
import { useState, forwardRef, useEffect } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import {
  SimpleGrid,
  Grid,
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

  //Set Meal Generator Option
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
      setIsErrorRecipe(false);
      setView(true);
      setRecipeView(false);
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

  useEffect(() => {
    if (!recipeUrl) {
      return;
    }

    (async () => {
      setView(false);
      setRecipeView(true);
      setIsLoadingRecipe(true);
      setIsErrorRecipe(false);
      try {
        setRecipeView(true);
        let res = await Axios(recipeUrl);
        setRecipe(res.data);
      } catch (e) {
        setIsErrorRecipe(true);
      }

      setIsLoadingRecipe(false);
    })();
  }, [recipeUrl]);

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
              Get personalized meal plans based on your calories requirement,
              plan duration, and your diet type all in one place.
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
        {count >= 1 && !isErrorRecipe && recipeView && (
          <div className='back-result'>
            <hr className='back-hr' />
            <button
              className='back-btn'
              onClick={() => {
                setRecipeView(!recipeView);
                setView(!view);
              }}
            >
              <span>Back</span>
            </button>
          </div>
        )}
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
                          {items.url && (
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
                                    value={items.sourceUrl}
                                    isLoading={isLoadingRecipe}
                                    bg='white'
                                    size='md'
                                    height='48px'
                                    width='200px'
                                    className='get-recipe-btn'
                                    variantColor='green'
                                    variant='outline'
                                    onClick={(e) => {
                                      let newUrl = e.target.value;

                                      setRecipeUrl(
                                        `${process.env.REACT_APP_PARTNER_URL_RECIPE}?url=${newUrl}&apiKey=${process.env.REACT_APP_FOOD_KEY}`
                                      );
                                    }}
                                  >
                                    Get Recipe
                                  </Button>
                                </Flex>
                              </div>
                            </>
                          )}
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
        {isLoadingRecipe && (
          <>
            <div className='recipe-loading-stat'>
              <SkeletonTheme
                color='rgba(182, 180, 180, 0.219)'
                highlightColor='rgba(245, 245, 245, 0.3)'
              >
                <h1 className='loading-title'>
                  {' '}
                  <Skeleton />
                </h1>
                <Skeleton className='image-loading-recipe' />
                <Skeleton className='recipe-cooking' />
                <p>
                  <Skeleton count={3} height={30} className='loading-desc' />
                </p>
              </SkeletonTheme>
            </div>
          </>
        )}
        {!isErrorRecipe && recipeView && !isLoadingRecipe && (
          <>
            <div className='recipe-div'>
              <div id='recipe-title'>{recipe.title}</div>
              <div className='recipe-meal-div'>
                <img
                  className='recipe-meal-img'
                  src={recipe.image}
                  alt='recipe meal'
                />
                <div className='other-meal-info recipe-meal-info'>
                  <FontAwesomeIcon icon={faClock} className='other-meal-icon' />
                  <p className='ready-para'>{recipe.readyInMinutes} mins</p>
                  <FontAwesomeIcon
                    icon={faUtensils}
                    className='other-meal-icon utensils'
                  />
                  <p> {recipe.servings} servings</p>
                </div>
                <div
                  className='recipe-summary'
                  dangerouslySetInnerHTML={{ __html: recipe.summary }}
                ></div>
              </div>
              <h3>Ingredients</h3>
              <div className='recipe-ing'>
                {recipe.extendedIngredients === undefined ? (
                  ''
                ) : (
                  <SimpleGrid
                    minChildWidth='7rem'
                    columns={5}
                    spacingX='40px'
                    spacingY='20px'
                  >
                    {recipe.extendedIngredients.map((item) => (
                      <div>
                        <img
                          className='recipe-ingredients-img'
                          src={`${process.env.REACT_APP_PARTNER_URL_RECIPE_IMAGE}/${item.image}`}
                          alt=''
                        />
                        <p>{item.name}</p>
                      </div>
                    ))}
                  </SimpleGrid>
                )}
              </div>

              <div>
                <h2> Equipments</h2>
                {recipe.analyzedInstructions && (
                  <>
                    <SimpleGrid
                      minChildWidth='7rem'
                      columns={5}
                      spacingX='40px'
                      spacingY='20px'
                    >
                      {recipe.analyzedInstructions[0].steps.map((i) => (
                        <>
                          {i.equipment.map((eq) => (
                            <div>
                              <img
                                className='equipment-img'
                                src={`${process.env.REACT_APP_PARTNER_URL_RECIPE_IMAGE_EQUIPMENT}/${eq.image}`}
                                alt=''
                              />
                              <p>{eq.name}</p>
                            </div>
                          ))}
                        </>
                      ))}
                    </SimpleGrid>
                  </>
                )}
                <h2>Instructions </h2>

                <div>
                  <div className='recipe-steps'>
                    {recipe.analyzedInstructions && (
                      <>
                        {recipe.analyzedInstructions[0].steps.map((items) => (
                          <>
                            <h4 className='step-number'>{items.number}</h4>

                            <p>{items.step}</p>
                          </>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {count >= 1 && !isErrorRecipe && recipeView && (
          <div className='back-result bottom-back-result'>
            <hr className='back-hr' />
            <button
              className='back-btn'
              onClick={() => {
                setRecipeView(!recipeView);
                setView(!view);
              }}
            >
              <span>Back</span>
            </button>
          </div>
        )}
        {isErrorRecipe && <>Error Fetching Recipe</>}
      </ThemeProvider>
    </>
  );
}

export default Home;
