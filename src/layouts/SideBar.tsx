import {
  AudioLines,
  ChevronDown,
  ChevronUp,
  Film,
  Home,
  Tv,
} from "lucide-react";
import { Children, ElementType, ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import Button, { buttonStyles } from "../components/Button";
import { twMerge } from "tailwind-merge";
import { useSidebarContext } from "../contexts/sidebarContext";
import { PageHeaderFirstSection } from "./PageHeader";

export default function SideBar() {
  const { isLargeOpen, isSmallOpen, close } = useSidebarContext();
  return (
    <>
      <aside
        className={`sticky top-0 overflow-y-auto scrollbar-hidden flex-col ${
          isLargeOpen ? "lg:hidden" : "lg:flex"
        }`}
      >
        <SmallSidebarItem Icon={Home} title={"Home"} url={"/"} />
        <SmallSidebarItem Icon={Film} title={"Movies"} url={"/movies"} />
        <SmallSidebarItem Icon={Tv} title={"Series"} url={"/series"} />
        <SmallSidebarItem
          Icon={AudioLines}
          title={"Documentaries"}
          url={"/documentaries"}
        />
      </aside>
      {isSmallOpen && (
        <div
          onClick={close}
          className="lg:hidden fixed inset-0 z-50 bg-secondary-dark opacity-50"
        />
      )}
      <aside
        className={`w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 pr-2  ${
          isLargeOpen ? "lg:flex" : "lg:hidden"
        } ${isSmallOpen ? "flex z-50 bg-white max-h-screen" : "hidden"}`}
      >
        <div className="lg:hidden py-4 px-2 sticky top-0 bg-white">
          <PageHeaderFirstSection />
        </div>
        <LargeSidebarSection>
          <LargeSidebarItem
            isActive
            Icon={Home}
            title={"Home"}
            url={"/"}
          ></LargeSidebarItem>
          <LargeSidebarItem
            Icon={Film}
            title={"Movies"}
            url={"/movies"}
          ></LargeSidebarItem>
          <LargeSidebarItem
            Icon={AudioLines}
            title={"Documentaries"}
            url={"/documentaries"}
          ></LargeSidebarItem>
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection title={"Choose Quality"}>
          <LargeSidebarItem title={"1080p blueray"}></LargeSidebarItem>
          <LargeSidebarItem title={"Movies"}></LargeSidebarItem>
          <LargeSidebarItem title={"Documentaries"}></LargeSidebarItem>
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection visibleItemCount={2} title={"Genres"}>
          <LargeSidebarItem title={"Action"}></LargeSidebarItem>
          <LargeSidebarItem title={"Comedy"}></LargeSidebarItem>
          <LargeSidebarItem title={"Horror"}></LargeSidebarItem>
          <LargeSidebarItem title={"Drama"}></LargeSidebarItem>
        </LargeSidebarSection>
      </aside>
    </>
  );
}

type SmallSidebarItemProps = {
  Icon: ElementType;
  title: string;
  url: string;
};
function SmallSidebarItem({ Icon, title, url }: SmallSidebarItemProps) {
  return (
    <Link
      to={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        "py-4 px-4 flex flex-col items-center rounded-lg gap-1"
      )}
    >
      <Icon className="w-6 h-6" />
      <div>{title}</div>
    </Link>
  );
}

type LargeSidebarSectionProps = {
  children: ReactNode;
  title?: string;
  visibleItemCount?: number;
};
function LargeSidebarSection({
  children,
  title,
  visibleItemCount = Number.POSITIVE_INFINITY,
}: LargeSidebarSectionProps) {
  const [isExplanded, setIsExpanded] = useState(false);
  const childrenArray = Children.toArray(children).flat();
  const visibleChildren = isExplanded
    ? childrenArray
    : childrenArray.slice(0, visibleItemCount);

  const showExpandButton = childrenArray.length > visibleItemCount;
  const ButtonIcon = isExplanded ? ChevronUp : ChevronDown;
  return (
    <div>
      {title && <div className="ml-4 mb-1 font-semibold text-lg">{title}</div>}
      {visibleChildren}
      {showExpandButton && (
        <Button
          variant="ghost"
          onClick={() => setIsExpanded((e) => !e)}
          className="flex w-full items-center rounded-r-lg p-3 gap-4"
        >
          <ButtonIcon className="w-6 h-6" />
          <div>{isExplanded ? "Show Less" : "Show More"}</div>
        </Button>
      )}
    </div>
  );
}
type LargeSidebarItemProps = {
  isActive?: boolean;
  Icon?: ElementType;
  title: string;
  url?: string;
};
function LargeSidebarItem({
  isActive,
  Icon,
  title,
  url,
}: LargeSidebarItemProps) {
  return url ? (
    <Link
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        `flex w-full items-center rounded-r-lg p-3 gap-4 ${
          isActive ? "font-bold bg-neutral-100 hover:bg-secondary" : undefined
        }`
      )}
      to={url}
    >
      {Icon && <Icon className="w-6 h-6" />}
      <div className="whitespace-nowrap overflow-hidden text-ellipsis">
        {title}
      </div>
    </Link>
  ) : (
    <Button
      variant="ghost"
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        `flex w-full items-center rounded-r-lg p-3 gap-4 ${
          isActive ? "font-bold bg-neutral-100 hover:bg-secondary" : undefined
        }`
      )}
    >
      {Icon && <Icon className="w-6 h-6" />}
      <div className="whitespace-nowrap overflow-hidden text-ellipsis">
        {title}
      </div>
    </Button>
  );
}
