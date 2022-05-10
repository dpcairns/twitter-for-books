import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import BookOfTweets from './BookOfTweets';
import HomePage from './HomePage';

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/book/:id">
            <BookOfTweets />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

