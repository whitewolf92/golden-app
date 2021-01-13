import thunkMiddleware from "redux-thunk";
import { createStore, applyMiddleware, Dispatch } from "redux";
import apiAgent from "../api/apiAgent";

import { IAction, InitialState } from "../interfaces";

const initalState: InitialState = {
	data: [],
	isError: false,
	errorMsg: ""
};

function reducer(state = initalState, action: IAction) {
	switch (action.type) {
		case "FETCH_DATA":
			return {
				...state,
				isError: false,
				errorMsg: ""
			};
		case "SET_DATA":
			return {
				...state,
				data: action.data,
				isError: action.isError,
				errorMsg: action.errorMsg
			};
		default:
			return state;
	}
}

// ActionCreator
export const requestData = () => async (dispatch: Dispatch) => {
	dispatch({
		type: "FETCH_DATA"
	});
	try {
		const json = await apiAgent.Golden.getData();
		dispatch({
			type: "SET_DATA",
			data: json.data,
			isError: false,
			errorMsg: ""
		});
	} catch (e) {
		dispatch({
			type: "SET_DATA",
			data: [],
			isError: true,
			errorMsg: e
		});
	}
};

export const store = createStore(reducer, applyMiddleware(thunkMiddleware));
