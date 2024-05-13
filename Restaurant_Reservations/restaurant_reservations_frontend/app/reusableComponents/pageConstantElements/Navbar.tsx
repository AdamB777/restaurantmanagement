"use client"
import { signOut } from "@/app/utils/redux/slices/accountSlice";
import { useAppDispatch, useAppSelector } from "@/app/utils/redux/store";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


function Navbar() {
  // const account = useAppSelector((state) => state.account??{});
  // const { user } = account;
  // const dispatch = useAppDispatch();
  // const router = useRouter();

  // const logout = () => {
  //   dispatch(signOut());
  //   router.push("/");
  // };

  return (
    <>
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <a href="#" className="text-xl font-semibold">
            Logo
          </a>
          <div className="hidden md:flex space-x-4">
            {/* <a href="#" className="hover:bg-gray-700 px-3 py-2 rounded">
              Strona główna
            </a>
            <a href="#" className="hover:bg-gray-700 px-3 py-2 rounded">
              O nas
            </a>
            <a href="#" className="hover:bg-gray-700 px-3 py-2 rounded">
              Usługi
            </a> */}
            {/* <a href="#" className="hover:bg-gray-700 px-3 py-2 rounded">
              Kontakt
            </a> */}
            {/* {user?(
              <Button variant="outline"  onClick={logout}>wyloguj</Button>

            ):null} */}
          </div>
          <button className="md:hidden text-2xl">&#9776;</button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
