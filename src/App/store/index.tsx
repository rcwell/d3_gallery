import React from 'react';
import { UiActions } from "App/actions";
import { uiReducer } from 'App/reducers';
import { logger } from 'App/middlewares';
import applyMiddleware from './applyMiddleware';

interface RootState {
	scrollPosition: number;
	navigationLinks: Array<Link>;
	setScrollPosition: (position: number) => void;
}
interface Link {
	displayName: string,
	link: string
}

const rootState: RootState = {
	scrollPosition: 0,
	navigationLinks: [],
	setScrollPosition: (_: number) => { },
}


const stateCtx = React.createContext<RootState>(rootState);

const { Provider } = stateCtx;

const StateProvider = ({ children }: any) => {
	const [state, baseDispatch] = React.useReducer(uiReducer, {
		scrollPosition: 0
	});

	const dispatch = React.useMemo(() =>
		applyMiddleware(
			baseDispatch,
			logger
		),
		[baseDispatch]);

	const setScrollPosition = (position: number) => {
		dispatch(UiActions.setScrollPosition(position))
	}

	return (
		<Provider value={{
			...state,
			setScrollPosition
		}}>
			{children}
		</Provider>
	);
};

export {
	StateProvider,
	stateCtx
}