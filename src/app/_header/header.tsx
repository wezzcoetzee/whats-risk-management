import Link from "next/link";
import { ThemeToggle } from "./component/theme";

export function Header() {
  return (
    <div className="fixed top-0 left-0 w-full z-10 p-4 ">
      <div className="w-100 flex justify-between">
        <Link href="/">
          <h1 className="text-2xl font-bold">position.</h1>
        </Link>
        <ThemeToggle />
      </div>
    </div>
  );
}
