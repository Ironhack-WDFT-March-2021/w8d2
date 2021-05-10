import './App.css';
import { Route } from 'react-router-dom';
import Projects from './components/Projects';
import ProjectDetails from './components/ProjectDetails';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Route exact path="/projects" component={Projects} />
      <Route exact path="/projects/:id" component={ProjectDetails} />
    </div>
  );
}

export default App;
