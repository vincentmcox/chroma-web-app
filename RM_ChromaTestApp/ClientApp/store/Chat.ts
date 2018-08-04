import { Action, Reducer } from 'redux';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface ChatState {
    messageCount: number;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

interface GetNewMessagesAction { type: 'GET_MESSAGES' }
interface SendMessageAction { type: 'SEND_MESSAGE' }

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = GetNewMessagesAction | SendMessageAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    increment: () => <GetNewMessagesAction>{type: 'GET_MESSAGES' },
    decrement: () => <SendMessageAction>{type: 'SEND_MESSAGE' }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const reducer: Reducer<ChatState> = (state: ChatState, action: KnownAction) => {
    switch (action.type) {
        case 'GET_MESSAGES':
            return {messageCount: state.messageCount + 1 };
        case 'SEND_MESSAGE':
            return {messageCount: state.messageCount - 1 };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    // For unrecognized actions (or in cases where actions have no effect), must return the existing state
    //  (or default initial state if none was supplied)
    return state || {messageCount: 0 };
};
