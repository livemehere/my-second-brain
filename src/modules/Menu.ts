
// Action Types
const CALENDAR = "menu/CALENDAR" as const;
const DONE = "menu/DONE" as const;

// Action Function
export const calendar = ()=>({type:CALENDAR});
export const done = ()=>({type:DONE});

type MenuAction = ReturnType<typeof calendar> | ReturnType<typeof done>;

type MenuState = {
    selected:string;
}

const initialState: MenuState = {
    selected: "calendar"
}

function menu(state:MenuState = initialState, action:MenuAction){
    switch (action.type){
        case CALENDAR:
            return {selected:"calendar"};
        case DONE:
            return {selected: "done"};
        default:
            return state;
    }
}

export default menu;