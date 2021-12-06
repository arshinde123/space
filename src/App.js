import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import AppBar from "./components/common/appBar";
import Footer from "./components/common/footer";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SelectDestinations from "./pages/selectDestinations";
import FindFalcone from "./pages/findFalcone";
import Toaster from './components/common/toaster'

const store = configureStore();

function App() {
	return (
		<Provider store={store}>
			<Router>
				<Toaster />
				<AppBar position="static" brandName="Finding Falcone" />
				<Container>
					<Box sx={{ my: 2 }}>
						<Switch>
							<Route path="/find-falcone">
								<FindFalcone />
							</Route>
							<Route path="/">
								<SelectDestinations />
							</Route>
						</Switch>
					</Box>
				</Container>
				<Footer text="Coding problem - Finding Falcone" />
			</Router>
		</Provider>
	);
}

export default App;
