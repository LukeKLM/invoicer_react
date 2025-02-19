import Link from 'next/link'
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { MenuIcon } from 'lucide-react'


export function MainMenu() {
  const links = [
    {
      title: "Home",
      url: "/",
    },
    {
      title: "Invoices",
      url: "/invoices",
    },
    {
      title: "Invoice Items",
      url: "/invoice-items",
    },
    {
      title: "Customers",
      url: "/customers",
    },
    {
      title: "Suppliers",
      url: "/suppliers",
    }
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <div className="hidden items-center gap-6 text-sm font-medium md:flex">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.url}
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              prefetch={false}
            >
              {link.title}
            </Link>
          ))}
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full md:hidden">
              <MenuIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="md:hidden">
            <SheetTitle>Menu</SheetTitle>
            <div className="grid gap-4 p-4">
              {links.map((link, index) => (
                <Link
                  key={index}
                  href={link.url}
                  className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  prefetch={false}
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}