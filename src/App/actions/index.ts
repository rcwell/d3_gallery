import { Ui } from "./types";

const UiActions = {
	setScrollPosition: (position: number) => ({
		type: Ui.SET_SCROLL_POS,
		payload: position
	})
}

export { UiActions, Ui };
