import ModeToggleBtn from "@/components/theme/theme-toggle";
import { Link } from "react-router-dom";  
export default function Header() {
  return (
    <>
      <header className="header  h-14 xs:h-12 relative flex items-center	px-4 py-0 justify-between xs:px-2 z-30">
        <div className="text-xl font-bold"><Link to={"/"}>//SpendWise</Link></div>
        <div>
          <ModeToggleBtn />
        </div>
      </header>
    </>
  );
}
