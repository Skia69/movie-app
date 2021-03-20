import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Footer, Navbar } from "./components";
import { HomePage, SearchPage, MoviePage } from "./pages";

function App() {
  return (
    <div className="flex flex-col justify-between min-h-screen text-white bg-gray-900">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/search/:title" component={SearchPage} />
          <Route path="/movie/:id" component={MoviePage} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
