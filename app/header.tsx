import Link from "next/link";
const Header = () => {
  return (
    <nav>
      <ul className="flex justify-start gap-x-8 p-4">
        <li>
          <Link href="/" className="underline">
            Home
          </Link>
        </li>
        <li>
          <Link href="about" className="underline">
            About
          </Link>
        </li>
        <li>
          <Link href="jobs/list" className="underline">
            Jobs List
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
