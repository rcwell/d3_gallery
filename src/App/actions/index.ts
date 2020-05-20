import { Ui } from "./types";

const UiActions = {
	setScrollPosition: (position: number) => ({
		type: Ui.SET_SCROLL_POS,
		payload: position
	}),
	setNavigationPage: (links: Array<string>) => ({
		type: Ui.SET_NAVIGATION_PAGE,
		payload: links
	}),
}

export { UiActions, Ui };
