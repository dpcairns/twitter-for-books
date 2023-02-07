import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import BookOfTweets from './BookOfTweets';
import HomePage from './HomePage';
import './loading-io.css';

export default function App() {
  return (
    <Router>
      <div className='route-wrapper'>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/book/:id/:title">
            <BookOfTweets />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

