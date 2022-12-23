import NavBar from "./components/layouts/navbar";
import Home from "./components/pages/home";
import { Switch, Route } from 'react-router-dom';
import NoteState from "./context/notecontext/notestate";
import Login from "./components/pages/login";
import Signup from "./components/pages/signup";

function App() {
  return (
    <NoteState>
      <NavBar />
      <Switch>
        <Route path="/" exact={true}>
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
      </Switch>
    </NoteState>
  );
}

export default App;
