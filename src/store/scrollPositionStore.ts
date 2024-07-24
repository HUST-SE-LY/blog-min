import { createContext } from "react"

interface ScrollPosition {
  position?: number;
  mainPosition?: number;
}

interface ActionType {
  type: 'clear' | 'setPosition',
  payload?: {
    position: number,
    mainPosition: number,
  },
}

export const initialState:ScrollPosition = {
  position: undefined,
  mainPosition: undefined,
}

export const ScrollPositionContext = createContext<{
  state: ScrollPosition,
  dispatch: React.Dispatch<ActionType>
} | undefined>(undefined);

export const scrollPositionReducer = (_state: ScrollPosition, actions: ActionType): ScrollPosition => {
  switch(actions.type) {
    case 'clear':
      return {position: undefined, mainPosition: undefined};
    case 'setPosition':
      return {position: actions.payload?.position, mainPosition: actions.payload?.mainPosition}
  }
}

