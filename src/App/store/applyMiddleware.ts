import React, { Dispatch } from "react";

const applyMiddleware = (dispatch: React.Dispatch<any>, ...middlewares: any) => {
	return compose(middlewares.map((m: any) => m(dispatch)))(dispatch);
}

const compose = (f: any) => {
	if (f.length === 0) return (arg: any) => arg
	if (f.length === 1) return f[0]
	return f.reduce((a: any, b: any) => (...args: any) => a(b(...args)))
}


export const useCombinedReducers = (combinedReducers: any): [any, Dispatch<any>] => {
	const state = Object.keys(combinedReducers).reduce(
		(acc, key) => ({ ...acc, [key]: combinedReducers[key][0] }),
		{},
	);

	const dispatch: Dispatch<any> = (action: any) =>
		Object.keys(combinedReducers)
			.map(key => combinedReducers[key][1])
			.forEach(fn => fn(action));

	return [state, dispatch];
};

export default applyMiddleware;