import BottomMenu from "@/components/bottom-menu";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const GameLayout: React.FC<Props> = ({ children }) => {
  return (
    <div>
      {children}
      <BottomMenu />
    </div>
  );
};

export default GameLayout;
