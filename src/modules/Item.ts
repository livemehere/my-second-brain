import {addNewCalendarItemIntoDB, removeCalendarItem, toggleCalendarItem} from "../Services/Firebase";


export interface ItemType {
    id:number;
    title:string;
    startDate:string;
    endDate:string;
    memo:string;
    complete:boolean;
}

export interface NewItemType {
    title:string;
    startDate:string;
    endDate:string;
    memo:string;complete:boolean;
}

const ADD = 'item/ADD' as const;
const REMOVE = 'item/REMOVE' as const;
const UPDATE = 'item/UPDATE' as const;
const LOAD = 'item/LOAD' as const;


export const add = (item:NewItemType)=>{
    return {
        type:ADD,
        payload:item
    }
};
export const remove = (id:number)=>({type:REMOVE,payload:id});
export const update = (id:number)=>({type:UPDATE,payload:id});
export const load = (items:ItemType[])=>({type:LOAD,payload:items});

type ItemAction = ReturnType<typeof add> | ReturnType<typeof remove> | ReturnType<typeof update> | ReturnType<typeof load>;



const initialState:ItemType[] = [];

function createNew(data:NewItemType):ItemType{
    return{
        id:Date.now(),
        title:data.title,
        startDate:data.startDate,
        endDate:data.endDate,
        memo:data.memo,
        complete:data.complete,
    }
}

function item(state:ItemType[]=initialState,action:ItemAction){
    switch (action.type) {
        case ADD:
            const newItem = createNew(action.payload);
            addNewCalendarItemIntoDB(newItem);
            return[...state,newItem];
        case REMOVE:
            removeCalendarItem(action.payload);
            return state.filter(item=> item.id !== action.payload);
        case UPDATE:
            const updateItem = state.map(item=>{
                if(item.id === action.payload){
                    // 타겟 아이디라면
                    toggleCalendarItem(action.payload,item.complete);
                    item.complete = !item.complete;
                }
                return item;
            })
            return [...state];
        case LOAD:
            return action.payload;
        default:
            return state;
    }
}

export default item;