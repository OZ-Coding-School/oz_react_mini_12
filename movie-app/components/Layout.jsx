import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

export default function Layout() {
    return (
        <div className="bg-darker min-h-screen text-dark2">
            <NavBar />
            <main>
                <Outlet />
            </main>
        </div>
    );
}