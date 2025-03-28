import Link from "next/link";
import { FiPlus } from "react-icons/fi";

export default function CreatePollButton() {
  return (
    <Link href="/create">
      <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-md transition-all duration-200 flex items-center">
        <FiPlus className="mr-2" />
        Create Poll
      </button>
    </Link>
  );
}
