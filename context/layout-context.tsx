import { ReactNode, createContext, useContext, useReducer } from "react";

interface LayoutState {
  showBottomBar: boolean;
}

type LayoutAction = { type: "SHOW_BOTTOM_BAR" } | { type: "HIDE_BOTTOM_BAR" };

const initialState: LayoutState = {
  showBottomBar: false,
};

const LayoutContext = createContext<
  | {
      state: LayoutState;
      dispatch: React.Dispatch<LayoutAction>;
    }
  | undefined
>(undefined);

const layoutReducer = (
  state: LayoutState,
  action: LayoutAction
): LayoutState => {
  switch (action.type) {
    case "SHOW_BOTTOM_BAR":
      return { ...state, showBottomBar: true };
    case "HIDE_BOTTOM_BAR":
      return { ...state, showBottomBar: false };
    default:
      return state;
  }
};

export const LayoutProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(layoutReducer, initialState);

  return (
    <LayoutContext.Provider value={{ state, dispatch }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
};
