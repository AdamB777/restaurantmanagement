function Navbar() {
  return (
    <>
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <a href="#" className="text-xl font-semibold">
            Logo
          </a>
          <div className="hidden md:flex space-x-4">
            <a href="#" className="hover:bg-gray-700 px-3 py-2 rounded">
              Strona główna
            </a>
            <a href="#" className="hover:bg-gray-700 px-3 py-2 rounded">
              O nas
            </a>
            <a href="#" className="hover:bg-gray-700 px-3 py-2 rounded">
              Usługi
            </a>
            <a href="#" className="hover:bg-gray-700 px-3 py-2 rounded">
              Kontakt
            </a>
          </div>
          <button className="md:hidden text-2xl">&#9776;</button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
