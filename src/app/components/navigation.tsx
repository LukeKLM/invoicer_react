"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Cookies from 'js-cookie';
import { redirect } from 'next/navigation'

export const Navigation = () =>{
    const pathname = usePathname();

    function isActive(path: string, startsWith: boolean = false) {

        return pathname === path || (startsWith && pathname.startsWith(path)) ? 'text-blue-500' : '';
    }

    const logout = () => {
        Cookies.remove("access_token");
        redirect("/login")
    }

  return (
    <nav className={`${"flex items-center justify-between p-4 bg-slate-400 text-white "}`}>
      <Link href="/" className={`${isActive("/")} hover:text-blue-500`}>
        Home
      </Link>
      <Link href="/register" className={`${isActive("/register")} hover:text-blue-500`}>
        Register
      </Link>
      <Link href="/login" className={`${isActive("/login")} hover:text-blue-500`}>
        Login
      </Link>
      <Link href="/invoices" className={`${isActive("/invoices", true)} hover:text-blue-500`}>
        Invoices
      </Link>
      <Link href="/invoice-items" className={`${isActive("/invoices-items", true)} hover:text-blue-500`}>
        Invoices Items
      </Link>
      <Link href="/customers" className={`${isActive("/customers", true)} hover:text-blue-500`}>
        Customers
      </Link>
      <Link href="/suppliers" className={`${isActive("/suppliers", true)} hover:text-blue-500`}>
        Suppliers
      </Link>
      <span
      className='cursor-pointer hover:text-blue-500'
        onClick={logout}
        >
          Log out
      </span>
    </nav>
  );
}