import { Route, Routes } from "react-router-dom";
import PageHeader from "./layouts/PageHeader";
import Home from "./pages/Home";
import SideBar from "./layouts/SideBar";
import { SidebarProvider } from "./contexts/sidebarContext";
import GetMoviesByCategory from "./contexts/getMoviesByCategory";
import Movie from "./pages/Movie";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

export default function App() {
  return (
    <>
      <div className="bg-blue-400 flex items-center justify-center h-12 font-semibold text-white rounded-b-md">
        Made with ❤
        <a
          href="https://ahmed-yasser-portfolio.vercel.app/"
          className="underline hover:no-underline ml-[1ch] hover:text-secondary-hover"
        >
          Ahmed Yasser
        </a>
        {/* Icons for social media */}
        <div className="flex gap-4 ml-4">
          <a
            href="https://www.facebook.com/profile.php?id=100088503545195"
            target="_blank"
          >
            <FaFacebook className="w-6 h-6  hover:text-secondary-hover" />
          </a>
          <a
            href="https://www.linkedin.com/in/ahmed-yasser-77135621b/"
            target="_blank"
          >
            <FaLinkedin className="w-6 h-6  hover:text-secondary-hover" />
          </a>
          <a href="https://github.com/MrSheruo" target="_blank">
            <FaGithub className="w-6 h-6  hover:text-secondary-hover" />
          </a>
        </div>
      </div>
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
