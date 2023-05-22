import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Navbar from './Navbar';
import Login from './Login';
import About from './About';
import { Helmet } from 'react-helmet';
import Callback from './Callback';

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
				<Route path = "/login" element = {<Login/>}/>
				<Route path = "/about" element = {<About/>}/>
				<Route path = "/callback" element = {<Callback/>}/>
			</Routes>
			</div>
		</div>
		</Router>
	);
}

export default App;
