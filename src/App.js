import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Navbar from './Navbar';
import Game from './Game';
import About from './About';
import { Helmet } from 'react-helmet';

function App() {
	return (
		<Router>
		<Helmet>
			<title>Song Guesser</title>
		</Helmet>
		<div className="App">
			<Navbar/>
			<div className="content">
			<Routes>
				<Route path = "/" element = {<Home/>}/>
				<Route path = "/game" element = {<Game/>}/>
				<Route path = "/about" element = {<About/>}/>
			</Routes>
			</div>
		</div>
		</Router>
	);
}

export default App;
