import { Route, Routes } from "react-router-dom";
import PageHeader from "./layouts/PageHeader";
import Home from "./pages/Home";
import SideBar from "./layouts/SideBar";
import { SidebarProvider } from "./contexts/sidebarContext";
import GetMoviesByCategory from "./contexts/getMoviesByCategory";
import Movie from "./pages/Movie";

export default function App() {
  return (
    <>
      <SidebarProvider>
        <div className="max-h-screen flex flex-col">
          <PageHeader />
          <div className="grid grid-cols-[auto,1fr] flex-grow-1 lg:overflow-auto">
            <SideBar />
            <main className="overflow-x-hidden px-8 pb-4 flex-grow-1">
              <Routes>
                <Route
                  path="/"
                  element={
                    <GetMoviesByCategory>
                      <Home />
                    </GetMoviesByCategory>
                  }
                ></Route>
                <Route path="/movie">
                  <Route index element={<div>Movies Page</div>}></Route>
                  <Route path=":movieId" element={<Movie />}></Route>
                </Route>
              </Routes>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}
