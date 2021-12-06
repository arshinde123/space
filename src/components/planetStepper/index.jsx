import React from "react";
import { connect } from "react-redux";
import { toast } from "../../utils";
import Loader from "../common/loader";
import VerticalStepper from "../common/verticalStepper";
import FloatingButton from "../common/floatingButton";
import StepContent from "./stepContent";
import StepOptionalLabel from "./stepOptionalLabel";
import {
	loadPlanets,
	getAvailablePlanets,
	selectPlanet,
	resetPlanetSelection,
	resetPlanetSelections,
} from "../../store/entities/planets";
import {
	loadVehicles,
	getAvailableVehicles,
	selectVehicle,
	resetVehiclesToInitialStep,
	disableUnsupportedVehicles,
	resetVehicle,
	resetVehicles,
} from "../../store/entities/vehicles";
import { saveTotalTime } from "../../store/entities/time";

class PlanetStepper extends React.Component {
	state = {
		stepData: {},
		activeStep: 1,
		totalTime: 0,
	};

	componentDidMount() {
		this.props.loadPlanets();
		this.props.loadVehicles();
	}

	handleNextStep = () => {
		let { activeStep, stepData } = this.state;
		if (
			stepData[activeStep] &&
			stepData[activeStep].selectedPlanet &&
			stepData[activeStep].selectedVehicle
		) {
			this.setState({ activeStep: activeStep + 1 });
			this.props.resetVehicles();
		} else {
			toast("Planet and vehicle both are required fields", {
				severity: "error",
			});
		}
	};

	handleTimeCalculation = () => {
		let { activeStep, stepData, totalTime } = this.state;
		if (
			stepData[activeStep] &&
			stepData[activeStep].selectedPlanet &&
			stepData[activeStep].selectedVehicle
		) {
			stepData[activeStep].time =
				stepData[activeStep].selectedPlanet.distance /
				stepData[activeStep].selectedVehicle.speed;
			this.setState({ totalTime, stepData });
			this.handleTotalTime();
		}
	};

	handleTotalTime = () => {
		let { stepData, totalTime } = this.state;
		totalTime = 0;
		for (let key in stepData) {
			totalTime += stepData[key].time || 0;
		}
		this.setState({ totalTime });
		this.props.saveTotalTime(totalTime);
	};

	handleResetStepData = () => {
		this.setState({ stepData: {}, activeStep: 1, totalTime: 0 });
		this.props.resetPlanetSelections();
		this.props.resetVehiclesToInitialStep();
		toast("Destinations reset", { severity: "info" });
	};

	handlePlanetChange = (event, selectedPlanet, reason, step) => {
		const stepData = this.state.stepData;
		if (reason === "selectOption") {
			if (!stepData[step]) stepData[step] = {};
			let previousId =
				stepData[step].selectedPlanet && stepData[step].selectedPlanet.id;
			stepData[step].selectedPlanet = selectedPlanet;
			stepData[step].selectedVehicle = undefined;
			stepData[step].time = 0;
			this.setState({ stepData });
			this.handleTotalTime();
			// this.handleTimeCalculation();
			this.props.selectPlanet(selectedPlanet.id, previousId);
			this.props.disableUnsupportedVehicles(selectedPlanet);
		} else if (reason === "clear") {
			if (stepData[step] && stepData[step].selectedVehicle) {
				this.props.resetVehicle(stepData[step].selectedVehicle.id);
			}
			this.props.resetPlanetSelection(stepData[step].selectedPlanet.id);
			stepData[step].selectedPlanet = undefined;
			stepData[step].selectedVehicle = undefined;
			stepData[step].time = 0;
			this.setState({ stepData });
			this.handleTotalTime();
			this.props.disableUnsupportedVehicles(selectedPlanet);
		}
	};

	handleVehicleChange = (event, step) => {
		const { stepData } = this.state;
		if (!stepData[step] || !stepData[step].selectedPlanet) {
			return toast("Please select planet first", { severity: "error" });
		}
		if (event.target.value) {
			const selectedVehicle = this.props.vehicles.filter(
				vehicle => vehicle.value === event.target.value
			)[0];
			if (!stepData[step]) stepData[step] = {};
			let previousId =
				stepData[step].selectedVehicle && stepData[step].selectedVehicle.id;
			stepData[step].selectedVehicle = selectedVehicle;
			this.setState({ stepData });
			this.handleTimeCalculation();
			this.props.selectVehicle(selectedVehicle.id, previousId);
		}
	};

	getSteps = (label, stepCount) => {
		let steps = [];
		for (let i = 0; i < stepCount; i++) {
			steps.push({
				label: `${label} ${i + 1}`,
				content: this.getStepContent(i + 1),
				optionalLabel: this.getStepOptionalLabel(i + 1),
			});
		}
		return steps;
	};

	getStepContent = step => {
		return (
			<StepContent
				step={step}
				planets={this.props.planets}
				vehicles={this.props.vehicles}
				handlePlanetChange={this.handlePlanetChange}
				handleVehicleChange={this.handleVehicleChange}
			/>
		);
	};

	getStepOptionalLabel = step => {
		const { stepData } = this.state;
		return (
			<StepOptionalLabel
				selectedPlanet={stepData[step] && stepData[step].selectedPlanet}
				selectedVehicle={stepData[step] && stepData[step].selectedVehicle}
			/>
		);
	};

	getVeriticalStepper = () => {
		const { activeStep } = this.state;
		const steps = this.getSteps("Destination", this.props.stepCount);

		return (
			<VerticalStepper
				steps={steps}
				activeStep={activeStep - 1}
				firstButtonText="Next"
				handleFirstButton={this.handleNextStep}
				secondButtonText="Reset"
				secondButtonDisabled={activeStep === 1}
				handleSecondButton={this.handleResetStepData}
				finalButtonText="Find falcone"
				finalButtonRoute="/find-falcone"
			/>
		);
	};

	getFloatingTImeButton = () => {
		const { totalTime } = this.state;
		return (
			<FloatingButton
				text={`Time ${totalTime}`}
				variant="extended"
				color="primary"
			/>
		);
	};

	render() {
		const { planets, vehicles } = this.props;

		if ((planets && !planets.length) || (vehicles && !vehicles.length)) {
			return <Loader sx={{ marginLeft: "50%", marginTop: "10%" }} />;
		}

		return (
			<div style={{ display: "flex", justifyContent: "space-around" }}>
				{this.getVeriticalStepper()}
				{this.getFloatingTImeButton()}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	planets: getAvailablePlanets(state),
	vehicles: getAvailableVehicles(state),
});

const mapDispatchToProps = dispatch => ({
	// planets dispatchers
	loadPlanets: () => dispatch(loadPlanets()),
	selectPlanet: (id, previousId) => dispatch(selectPlanet(id, previousId)),
	resetPlanetSelection: id => dispatch(resetPlanetSelection(id)),
	resetPlanetSelections: () => dispatch(resetPlanetSelections()),

	// vehicles dispatchers
	loadVehicles: () => dispatch(loadVehicles()),
	selectVehicle: (id, previousId) => dispatch(selectVehicle(id, previousId)),
	resetVehiclesToInitialStep: () => dispatch(resetVehiclesToInitialStep()),
	disableUnsupportedVehicles: selectedPlanet =>
		dispatch(disableUnsupportedVehicles(selectedPlanet)),
	resetVehicle: id => dispatch(resetVehicle(id)),
	resetVehicles: () => dispatch(resetVehicles()),

	//time dispatchers
	saveTotalTime: totalTime => dispatch(saveTotalTime(totalTime)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlanetStepper);
