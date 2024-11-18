import React from "react";
import Link from "next/link";
const Header = () => {
  return (
    <div className="justify-between flex p-4 bg-indigo-500">
      <div className="flex items-center">
        <Link href="/">
          <p className="font-bold">Colist</p>
        </Link>
      </div>

      <Link href="/list/create/todo">Add</Link>
      <Link href="/list/create/user">Sign up</Link>
      <Link href="/list/login">Sign in</Link>
    </div>
  );
};

export default Header;
