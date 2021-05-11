import './App.css';
import { useState, useEffect } from 'react';

const useLocalStorage = (key, defaultValue = '') => {
  const [state, setState] = useState(() => window.localStorage.getItem(key) || defaultValue);

  useEffect(() => {
    console.log('use effect');
    window.localStorage.setItem(key, state);
  }, [state])
  return [state, setState]
}


function App() {


  const getInitialState = () => {
    console.log('get initial state');
    return window.localStorage.getItem('name') || ''
  }

  // const stateArray = useState();
  // const count = stateArray[0];
  // const setCount = stateArray[1];
  const [count, setCount] = useState(0);
  // pass a function to useState to 'lazy initialize' -> this is then only called once
  // const [name, setName] = useState(() => getInitialState());

  const [name, setName] = useLocalStorage('name');

  const [dog, setDog] = useLocalStorage('dog');
  // const [name, setName] = useState(() => window.localStorage.getItem('name') || '');

  // useEffect(() => {
  //   console.log('use effect');
  //   window.localStorage.setItem('name', name);
  // }, [name])



  // const [countries, setCountries] = useState([]);

  const handleChange = e => setName(e.target.value);

  // if you wanna use useEffect like componentDidMount -> you need to add an empty array 
  // as a second parameter (dependency array)
  // useEffect(() => {
  //   console.log('use effect');
  //   fetch('https://restcountries.eu/rest/v2/')
  //     .then(response => response.json())
  //     .then(data => setCountries(data))
  // }, [])


  return (
    <div className="App">
      <header className="App-header">
        {/* {countries.map(country => {
          return (
            <h5 key={country.alpha2Code}>{country.name}</h5>
          )
        })} */}
        {name ? <strong>Hello {name}</strong> : 'Please type your name'}
        <input type="text" onChange={handleChange} value={name} />
        {dog ? <strong>Hello {dog}</strong> : 'Please type your dog'}
        <input type="text" onChange={e => setDog(e.target.value)} value={dog} />
        {count}
        <button onClick={() => setCount(prevState => prevState + 1)}>Press this button 👇</button>
      </header>
    </div>
  );
}

export default App;
