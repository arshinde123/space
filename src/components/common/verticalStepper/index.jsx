import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function VerticalLinearStepper({
	steps,
	activeStep,
	firstButtonText,
	firstButtonDisabled,
	handleFirstButton,
	secondButtonText,
	secondButtonDisabled,
	handleSecondButton,
	finalButtonText,
	finalButtonRoute,
	finalButtonDisabled,
	handleFinalButton,
}) {
	return (
		<Box sx={{ maxWidth: "100%" }}>
			<Stepper activeStep={activeStep} orientation="vertical">
				{steps.map((step, index) => (
					<Step key={step.label}>
						<StepLabel
							optional={
								<Typography variant="caption">{step.optionalLabel}</Typography>
							}>
							{step.label}
						</StepLabel>
						<StepContent>
							<Box sx={{ my: 2 }}>
								<div>{step.content}</div>
							</Box>
							<Box sx={{ mb: 2 }}>
								<div>
									{index === steps.length - 1 ? (
										finalButtonRoute ? (
											<Link to={finalButtonRoute}>
												<Button variant="contained" disabled={finalButtonDisabled} sx={{ mt: 1, mr: 1 }} onClick={handleFinalButton}>
													{finalButtonText}
												</Button>
											</Link>
										) : (
											<Button
												variant="contained"
												disabled={finalButtonDisabled}
												sx={{ mt: 1, mr: 1 }}
												onClick={handleFinalButton}>
												{finalButtonText}
											</Button>
										)
									) : (
										<Button
											variant="contained"
											disabled={firstButtonDisabled}
											onClick={handleFirstButton}
											sx={{ mt: 1, mr: 1 }}>
											{firstButtonText}
										</Button>
									)}
									<Button disabled={secondButtonDisabled} onClick={handleSecondButton} sx={{ mt: 1, mr: 1 }}>
										{secondButtonText} 
									</Button>
								</div>
							</Box>
						</StepContent>
					</Step>
				))}
			</Stepper>
		</Box>
	);
}
