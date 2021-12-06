import React from "react";
import Autocomplete from "../common/autoComplete";
import RadioGroup from "../common/radioGroup";

const stepContent = ({
	planets,
	vehicles,
	step,
	handlePlanetChange,
	handleVehicleChange,
}) => {
	return (
		<React.Fragment>
			<Autocomplete
				options={planets}
				width={240}
				inputLabel="Search planet"
				onChange={(event, selectedPlanet, reason) =>
					handlePlanetChange(event, selectedPlanet, reason, step)
				}
			/>
			<RadioGroup
				row={true}
				options={vehicles}
				radioGruopLabel="Select Vehicle"
				onChange={event => handleVehicleChange(event, step)}
			/>
		</React.Fragment>
	);
};

export default stepContent;
