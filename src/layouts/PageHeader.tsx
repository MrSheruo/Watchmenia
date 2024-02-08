import { Link } from "react-router-dom";
import { ArrowLeft, Menu, Search, User } from "lucide-react";
import Button from "../components/Button";
import { useState } from "react";
import { useSidebarContext } from "../contexts/sidebarContext";

export default function PageHeader() {
  const [showSearchSection, setShowSearchSection] = useState(false);
  return (
    <div className="z-50 sticky top-0 bg-white flex gap-10 lg:gap-20 justify-between py-2 mb-6 mx-4 shadow-sm">
      <PageHeaderFirstSection hidden={showSearchSection} />
      <form
        className={`  gap-4 flex-grow justify-center ${
          showSearchSection ? "flex" : "hidden md:flex"
        }`}
      >
        {showSearchSection && (
          <Button
            type="button"
            size={"icon"}
            variant={"ghost"}
            className="flex-shrink-0"
            onClick={() => setShowSearchSection(false)}
          >
            <ArrowLeft />
          </Button>
        )}
        <div className="flex flex-grow max-w-[600px]">
          <input
            type="text"
            placeholder="Search for movies"
            className="rounded-l-full border border-secondary-border shadow-inner shadow-secondary py-1 px-4 text-lg w-full focus:border-blue-500 outline-none"
          />
          <Button className="pt-2 px-4 rounded-r-full border border-secondary-border border-l-0 flex-shrink-0">
            <Search />
          </Button>
        </div>
      </form>
      <div
        className={` flex-shrink-0 md:gap-2 ${
          showSearchSection ? "hidden" : "flex"
        }`}
      >
        <Button
          size={"icon"}
          variant={"ghost"}
          className="md:hidden"
          onClick={() => setShowSearchSection(true)}
        >
          <Search />
        </Button>
        <Button size={"icon"} variant={"ghost"}>
          <User />
        </Button>
      </div>
    </div>
  );
}

export function PageHeaderFirstSection({
  hidden = false,
}: {
  hidden?: boolean;
}) {
  const { toggle } = useSidebarContext();

  return (
    <div
      className={`flex gap-4 items-center flex-shrink-0 ${
        hidden ? "hidden" : "flex"
      }`}
    >
      <Button onClick={toggle} size={"icon"} variant={"ghost"}>
        <Menu />
      </Button>
      <Link to="/" className="flex flex-shrink-0 gap-1 items-center font-bold">
        <img src="/logo.png" alt="logo" className="h-6" />
        WatchMenia
      </Link>
    </div>
  );
}
