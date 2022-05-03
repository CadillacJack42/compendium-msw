import { Route, Switch } from 'react-router-dom';
import DetailView from './views/DetailView';
import ListView from './views/ListView';
export default function App() {
  return (
    <>
      <h2>Welcome To Cadillac Jacks Rick and Morty Compendium</h2>
      <Switch>
        <Route path="/CharacterDetail">
          <DetailView />
        </Route>
        <Route path="/">
          <ListView />
        </Route>
      </Switch>
    </>
  );
}
