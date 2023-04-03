import { createPortal } from "react-dom";

export const Portal = ({ children }: { children: React.ReactElement }) => {
  return createPortal(children, document.body);
};
