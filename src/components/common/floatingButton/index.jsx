import React from "react";
import { Fab } from "@mui/material";

const FloatingButton = ({ text, color, variant }) => {
	return (
		<Fab variant={variant} color={color}>
			{text}
		</Fab>
	);
};

export default FloatingButton;
