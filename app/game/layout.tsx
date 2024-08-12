import BottomMenu from "@/components/bottom-menu";
import Navbar from "@/components/navbar";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const GameLayout: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
      <BottomMenu />
    </div>
  );
};

export default GameLayout;
