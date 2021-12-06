import React from 'react';

const StepOptionalLabel = ({ step, selectedPlanet, selectedVehicle }) => {
    return (
        <span>
            {selectedPlanet &&
                selectedVehicle &&
                `Planet: ${selectedPlanet.name}, Vehicle: ${selectedVehicle.name}`}
            {selectedPlanet &&
                !selectedVehicle &&
                `Planet: ${selectedPlanet.name}`}
            {!selectedPlanet &&
                selectedVehicle &&
                `Vehicle: ${selectedVehicle.name}`}
        </span>
    );
};

export default StepOptionalLabel;
