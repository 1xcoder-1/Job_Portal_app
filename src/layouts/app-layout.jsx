import Header from "@/components/header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <div className="grid-background"></div>
      <Header />
      <main className="min-h-screen container mx-auto pt-1">
        <Outlet />
      </main>
      <footer className="py-6 text-center bg-transparent border-t border-gray-700/50 mt-10">
        <div className="container mx-auto px-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Hirrd. All rights reserved.
          </p>
        </div>
      </footer>
      <div className="p-10 text-center bg-gray-800 mt-10">
        Made with 💗 by RoadsideCoder
      </div>
    </div>
  );
};

export default AppLayout;