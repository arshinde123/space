import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars({
	autoHideDuration,
	title,
	description,
	variant,
	severity,
	slideTransition,
}) {
	const [open, setOpen] = React.useState(true);

	const handleClick = () => {
		setOpen(true);
	};

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	return (
		<Stack spacing={2} sx={{ width: "100%" }}>
			<Snackbar
				open={open}
				autoHideDuration={autoHideDuration || 3000}
				onClose={handleClose}
				TransitionComponent={props => (
					<Slide {...props} direction={slideTransition || "up"} />
				)}
				key={slideTransition ? slideTransition : ""}>
				<Alert
					onClose={handleClose}
					severity={severity}
					variant={variant}
					sx={{ width: "100%" }}>
					{description}
				</Alert>
			</Snackbar>
		</Stack>
	);
}
