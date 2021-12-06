/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Button from "../common/button";
import Alert from "../common/alert";
import {
	getToken,
	getAuthorizationToken,
} from "../../store/authorization/token";
import { getTotalTime } from "../../store/entities/time";
import { getSelectedPlanetNames, resetPlanetSelections } from "../../store/entities/planets";
import { getSelectedVehicleNames, resetVehiclesToInitialStep } from "../../store/entities/vehicles";
import {
	searchPlanet,
	getSearchPlanetResult,
} from "../../store/entities/searchPlanet";
import Loader from "../common/loader";
import { PlanetFoundIcon } from "../common/icons";
import { PlanetNotFoundIcon } from "../common/icons";
import Box from "../common/box";

const FindPlanet = () => {
	const token = useSelector(getAuthorizationToken);
	const totalTime = useSelector(getTotalTime);
	const planet_names = useSelector(getSelectedPlanetNames);
	const vehicle_names = useSelector(getSelectedVehicleNames);
	const searchPlanetResult = useSelector(getSearchPlanetResult);

	const history = useHistory();

	const dispatch = useDispatch();

	useEffect(() => {
		!token.value && dispatch(getToken());
		if (token.value) {
			const payload = {
				token: token.value,
				planet_names,
				vehicle_names,
			};

			dispatch(searchPlanet(payload));
		}
	}, [token.value]);

	if (token.loading || searchPlanetResult.loading || !searchPlanetResult.result.status)
		return <Loader sx={{ marginLeft: "50%", marginTop: "10%" }} />;

  const { status } = searchPlanetResult.result;
  const isSuccess = status === "success" ? true : false;

  const handleStartAgain = () => {
		dispatch(resetPlanetSelections());
		dispatch(resetVehiclesToInitialStep());
		history.push('/');
  }

	const getStartAgainButton = () => {
		return (
			<Button variant="outlined" color={isSuccess ? "success" : "error"} onClick={handleStartAgain}>
				Start again
			</Button>
		);
	};

	const getSuccessDescription = () => {
		return (
			<React.Fragment>
				Congratulations on Finding Falcone. King Shan is mighty pleased.
				<Box fontSize="12rem">
					<PlanetFoundIcon fontSize="inherit" />
				</Box>
				Found <strong>{searchPlanetResult.result.planet_name}</strong> planet in{" "}
				<strong>{totalTime}</strong> hours.
				<br />
				<br />
				{getStartAgainButton()}
			</React.Fragment>
		);
	};

	const getErrorDescription = () => {
		return (
			<React.Fragment>
				Planet not found! Please try again.
				<Box fontSize="12rem">
					<PlanetNotFoundIcon fontSize="inherit" />
				</Box>
				{getStartAgainButton()}
			</React.Fragment>
		);
	};

	const getFindPlanetContent = () => {
		return (
			<Alert
				color={isSuccess ? "success" : "error"}
				variant="outlined"
				icon={false}
				sx={{
					display: "flex",
					justifyContent: "center",
					textAlign: "center",
					border: "none",
				}}
				title={<strong>{isSuccess ? "Success" : "Sorry"}</strong>}
				description={
					isSuccess ? getSuccessDescription() : getErrorDescription()
				}></Alert>
		);
	};

	return <React.Fragment>{getFindPlanetContent()}</React.Fragment>;
};

export default FindPlanet;
