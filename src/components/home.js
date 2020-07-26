import React from 'react';
import { useState, forwardRef } from 'react';
import {
  SimpleGrid,
  Box,
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

function Home() {
  const [show, setShow] = useState(false);
  const [isLoadingCo, setIsLoadingCo] = useState(false);
  const [view, setView] = useState(false);
  const [count, setCount] = useState(0);
  const [isError, setIsError] = useState();
  const [data, setData] = useState({ meals: [] });
  const [dataNu, setDataNu] = useState('');

  //Set Meal Generator Options
  const [timeFrame, setTimeFrame] = useState('');
  const [targetCalories, setTargetCalories] = useState(0);
  const [diet, setDiet] = useState();
  const [exclude, setExclude] = useState();

  const [url, setUrl] = useState(
    `${process.env.REACT_APP_PARTNER_URL}?timeFrame=${timeFrame}&targetCalories=${targetCalories}&diet=${diet}&exclude=${exclude}&apiKey=${process.env.REACT_APP_FOOD_KEY}`
  );

  const [btnOne, setBtnOne] = useState(true);

  const fetchData = async () => {
    setIsLoadingCo(true);
    try {
      const result = await Axios(url);
      setData(result.data);
      setDataNu(result.data.nutrients);
      setIsError(false);
      setView(true);
      setCount(count + 1);
    } catch (e) {
      setIsError(true);
    }
    setIsLoadingCo(false);
  };

  const CustomRadio = forwardRef((props, ref) => {
    const { isChecked, isDisabled, value, ...rest } = props;
    return (
      <Button
        ref={ref}
        variantColor={isChecked ? 'green' : 'gray'}
        aria-checked={isChecked}
        role='radio'
        isDisabled={isDisabled}
        {...rest}
      />
    );
  });

  //const [state,  setState] = useState(1200);
  let handleChange = (e) => {
    setTargetCalories(e.target.value);
    console.log(targetCalories);
  };
  return (
    <>
      <ThemeProvider>
        {' '}
        <div className='meal-div'>
          <div className='meal-intro'>
          <h1 className='site-title'>Free Meal Planner </h1>
          <p>
            Never run out of ideas of what to eat, automate your diets with our
            personalized meal planner generator. With over 50,000 cuisines and
            meals to choose from, plan your meal in advance for a healthy living
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
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>

                  <Collapse startingHeight={0} isOpen={show}>
                    <Select
                      placeholder='Meal Plan Duration'
                      className='meal-duration'
                      onChange={(e) => {
                        setTimeFrame(e.target.value);
                        console.log(timeFrame);
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
                className={`action-btn ${btnOne ? 'show' : 'hide'}`}
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
          {view && (
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
                                value: dataNu.protein,
                                color: '#E38627',
                              },
                              {
                                title: 'Fat',
                                value: dataNu.fat,
                                color: '#C13C37',
                              },
                              {
                                title: 'Carbohydrates',
                                value: dataNu.carbohydrates,
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
                            {/* <p>{dataNu.calories}</p> */}
                            <p>
                              <img
                                className='calo-img protein'
                                src={'assets/img/protein.svg'}
                                alt='Protein :'
                              />
                              {dataNu.protein}
                            </p>
                            <p>
                              <img
                                className='calo-img fat'
                                src={'assets/img/fats.svg'}
                                alt='Fats: '
                              />
                              {dataNu.fat}
                            </p>
                            <p>
                              <img
                                className='calo-img carb'
                                src={'assets/img/carb.svg'}
                                alt='Carbohydrates :'
                              />
                              {dataNu.carbohydrates}
                            </p>
                          </div>
                        </Flex>
                      </Flex>
                    </div>
                    <div className='meal-div-mapping'>
                      {data.meals.map((items) => (
                        <>
                          <div className='meal-card-div'>
                            <p className='meal-tit'>
                              {items.title.length <= 18
                                ? items.title
                                : items.title
                                    .replace(/[{()}]/g, '')
                                    .slice(0, 18) + '...'}
                            </p>
                            <img
                              className='meal-box-img'
                              src={'assets/img/meal-pic.jpg'}
                              alt='meals'
                            />
                            <Flex align='flex-start'>
                              <Button
                                className='get-recipe-btn'
                                size='md'
                                variantColor='green'
                                variant='outline'
                              >
                                Get Recipe
                              </Button>
                            </Flex>
                            <div className='div-flex'>
                              <div>
                                {/* <div className='other-meal-info'>
                                  <FontAwesomeIcon
                                    icon={faClock}
                                    className='other-meal-icon'
                                  />
                                  <p>{items.readyInMinutes} mins</p>
                                  <FontAwesomeIcon
                                    icon={faUtensils}
                                    className='other-meal-icon'
                                  />
                                  <p> {items.servings} servings</p>
                                </div> */}
                              </div>
                              <div className='flex-btn'></div>
                            </div>
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
      </ThemeProvider>
    </>
  );
}

export default Home;
