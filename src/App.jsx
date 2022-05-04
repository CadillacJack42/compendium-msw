import { Redirect } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import DetailView from './views/DetailView';
import ListView from './views/ListView';
export default function App() {
  return (
    <>
      <h2>Welcome To Cadillac Jacks Rick and Morty Compendium</h2>
      <Switch>
        <Route path="/character/:id">
          <DetailView />
        </Route>
        <Route path="/characters/:page">
          <ListView />
        </Route>
        <Route path="/">
          <Redirect to="/characters/1"></Redirect>
        </Route>
      </Switch>
    </>
  );
}
