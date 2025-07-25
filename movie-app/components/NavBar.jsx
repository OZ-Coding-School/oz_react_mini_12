import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <nav className="w-full bg-dark p-4 z-50 shadow-md">
            <div className="flex items-center justify-between gap-4">
                <Link to="/">
                    <h1 className="text-accent text-2xl font-bold tracking-wide">ReelBuzz</h1>
                </Link>

                <input
                    type="text"
                    placeholder="영화 검색"
                    className="flex-1 max-w-md px-3 py-1 rounded bg-darker text-dark2 placeholder-gold border border-primary focus:outline-none focus:ring-2 focus:ring-accent"
                />

                <div className="flex items-center gap-2">
                    <Link to="/login">
                        <button className="bg-accent text-darker px-4 py-1 rounded font-medium hover:bg-[#D9A491] hover:text-darkest transition">
                        로그인
                        </button>
                    </Link>

                    <Link to="/signup">
                        <button className="bg-primary text-darker px-4 py-1 rounded font-medium hover:bg-[#BF7950] hover:text-white transition">
                        회원가입
                        </button>
                    </Link>
                </div>


            </div>
        </nav>
    );
}
