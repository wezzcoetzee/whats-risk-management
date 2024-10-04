import Link from "next/link";
import { ThemeToggle } from "./component/theme";

export function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-10 p-4 ">
      <div className="w-100 flex justify-between items-center">
        <Link href="/">
          <h1 className="text-xl sm:text-2xl font-bold text-logo">
            whatsriskmanagement.
          </h1>
        </Link>
        <div className="flex justify-end gap-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
