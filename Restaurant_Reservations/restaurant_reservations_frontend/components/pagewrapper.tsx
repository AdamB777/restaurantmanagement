import React, { ReactNode } from 'react';

interface PagewrapperProps {
  children: ReactNode;
}

const Pagewrapper: React.FC<PagewrapperProps> = ({ children }) => {
  return <div className="bg-slate-50 flex-grow text-black p-2 mt-16 pl-[20.4rem]">{children}</div>;
};

export default Pagewrapper;
