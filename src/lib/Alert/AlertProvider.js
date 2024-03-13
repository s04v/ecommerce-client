import { Alert, Snackbar } from "@mui/material";
import { createContext, useState } from "react";

const initialState = {
	type: "",
	text: "",
};

const AlertContext = createContext({
	...initialState,
	Alert: {
		success: () => {},
		warning: () => {},
		error: () => {},
	}
});

export const AlertProvider = ({ children }) => {
	const [text, setText] = useState("");
	const [type, setType] = useState("");
	const [open, setOpen] = useState(false);

	const success = (text) => {
		setText(text);
		setType('success');
		setOpen(true);
	};

  const warning = (text) => {
		setText(text);
		setType('warning');
		setOpen(true);
	};

  const error = (text) => {
		setText(text);
		setType('error');
		setOpen(true);
	};

	return (
		<AlertContext.Provider
			value={{
				Alert: {
					success,
					warning,
					error,
				}
			}}
		>
			{children}
			<Snackbar
				open={open}
				autoHideDuration={6000}
				onClose={() => setOpen(false)}
			>
				<Alert
					onClose={() => setOpen(false)}
					variant="filled"
					severity={type}
					sx={{ width: "100%" }}
				>
					{text}
				</Alert>
			</Snackbar>
		</AlertContext.Provider>
	);
};

export default AlertContext;