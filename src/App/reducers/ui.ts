import { Ui } from "../actions/types";

export const uiReducer = (state: any, action: any) => {
    const { type, payload } = action;
    switch (type) {
        case Ui.SET_SCROLL_POS:
            return {
                ...state,
                scrollPosition: payload
            };
        default:
            return state;
    }
};
