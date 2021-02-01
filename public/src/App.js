// vendor imports
import { Route } from 'react-router-dom';
// components
import HomePage from './components/pages/HomePage';
// constants
import ROUTES from './data/routes';
// styles
import './assets/styles/global.css';
import './assets/styles/theme.css';

const App = () => {
  return (
    <>
      <Route exact path={ROUTES.ROOT} component={HomePage} />
    </>
  );
};

export default App;
