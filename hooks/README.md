### https://reactjs.org/docs/hooks-intro.html

# Basic Hooks

## First build out a basic version with name and counter

```js
// App.js
import './App.css';
import { useState } from 'react';

const App = () => {

  const [count, setCount] = useState(0)

  const [name, setName] = useState('');

  const handleChange = e => setName(e.target.value);

  return (
    <div className="App">
      <header className="App-header">
        {name ? <strong>Hello {name}</strong> : 'Please type your name'}
        <input type="text" onChange={handleChange} />
        {count}
        <button onClick={() => setCount(c => c + 1)}>Increment</button>
      </header>
    </div>
  );
}

export default App;
```

### Then use useEffect to get the contacts via fetch
```js
// App.js
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    console.log('useEffect')
    fetch('/api/contacts')
      .then(response => response.json())
      .then(data => console.log(data));
  })
```

### Now add a console.log() in the useEffect and see in the console that this method gets called all the time - whenever the component updates - this means also when we just click the button that increments the counter

### Then add an empty array to the useEffect callback (this will run useEffect only once) and then also add some element in the array to be watched - then add the name into that dependency array

### Then also explain that if you return a function from that callback then this acts like the componentWillUnmount() lifecycle method

### UseEffect to set the name to local storage

```js
// App.js

  const [name, setName] = useState('');

  useEffect(() => {
    console.log('use effect')
    window.localStorage.setItem('name', name)
  })
```

### Now we also want to use the value from the local storage as the initial value

### And we can also add the value attribute to the input
```js
// App.js
  const [name, setName] = useState(window.localStorage.getItem('name') || '');

  <input type="text" onChange={handleChange} value={name} />
```

### As an initial value we can add a lazy initializer, a function to useState - this function is then not called for every render but just at the beginning

### First let's prove that the initial state is called for every render - we put initial state in a function along with a console.log()

```js
// App.js
  const getInitialState = () => {
    console.log('get initial state')
    return (window.localStorage.getItem('name')) || ''
  }
  const [name, setName] = useState(getInitialState());
```

### Now let's add a functionn to useState - and thereby use a so called Lazy Initializer

```js
// App.js
  const getInitialState = () => {
    console.log('get initial state')
    return (window.localStorage.getItem('name')) || ''
  }
  const [name, setName] = useState(() => getInitialState());
```

### Then we can again refactor to this cleaner version
```js
  // const getInitialState = () => {
  //   console.log('get initial state')
  //   return window.localStorage.getItem('name') || ''
  // }
  const [name, setName] = useState(() => window.localStorage.getItem('name') || '');
```

# Custom Hooks

### Let's refactor this logic into a reusable custom hook

```js

  const [name, setName] = useState(() => window.localStorage.getItem('name') || '');

  useEffect(() => {
    console.log('use effect')
    window.localStorage.setItem('name', name)
  }, [name])
```

### We refactor to this

```js
const useLocalStorage = (key, defaultValue = '') => {
  const [state, setState] = useState(() => window.localStorage.getItem(key) || defaultValue);

  useEffect(() => {
    console.log('use effect')
    window.localStorage.setItem(key, state)
  }, [state])
  return [state, setState]
}
```

### Then we can use this custom hook like this:

```js
const [name, setName] = useLocalStorage('name')
```

# Context - using the useContext hook 

### We create a UserContext  
```js
import React from 'react';

const UserContext = React.createContext(null);

export default UserContext;
```

### We create a context provider in App.js

```js
    // App.js
    import UserContext from './UserContext';
    <UserContext.Provider value={user}>
        <Second />
    </UserContext.Provider>
```

### And then consume this context using the useContext hook

```js
import React from 'react'
import { useContext } from 'react';
import UserContext from '../UserContext'

export default function Third() {
    const user = useContext(UserContext)
    console.log(user)
    return (
        <div>
        </div>
    )
}

```