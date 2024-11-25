"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Navigation = () =>{
    const pathname = usePathname();

    function isActive(path: string, startsWith: boolean = false) {

        return pathname === path || (startsWith && pathname.startsWith(path)) ? 'text-blue-500' : '';
    }

  return (
    <nav className={`${"flex items-center justify-between p-4 bg-slate-400 text-white "}`}>
      <Link href="/" className={`${isActive("/")}`}>
        Home
      </Link>
      <Link href="/register" className={`${isActive("/register")}`}>
        Register
      </Link>
      <Link href="/login" className={`${isActive("/login")}`}>
        Login
      </Link>
      <Link href="/dashboard/invoices/testing_invoice" className={`${isActive("/dashboard/invoices", true)}`}>
        Invoice
      </Link>
    </nav>
  );
}