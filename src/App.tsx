import { Route, Routes } from "react-router-dom";
import PageHeader from "./layouts/PageHeader";
import Home from "./pages/Home";

import SideBar from "./layouts/SideBar";
import { SidebarProvider } from "./contexts/sidebarContext";

export default function App() {
  return (
    <SidebarProvider>
      <div className="max-h-screen flex flex-col">
        <PageHeader />
        <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
          <SideBar />
          <div className="overflow-x-hidden px-8 pb-4">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/movies">
                <Route index element={<div>Movies Page</div>}></Route>
                <Route path=":name" element={<div>Movie Page</div>}></Route>
              </Route>
            </Routes>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
