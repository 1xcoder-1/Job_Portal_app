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
      <footer className="py-2 text-center bg-gray-900/50 backdrop-blur-sm border-t border-gray-700/50 mt-10">
        <div className="container mx-auto px-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Hirrd. All rights reserved.
          </p>
        </div>
      </footer>
      <div className="py-6 text-center bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <p className="text-gray-500 text-sm">
            Made with 💗 by 1xcoder
          </p>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;