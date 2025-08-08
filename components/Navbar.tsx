import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-800/50 backdrop-blur-xl bg-black/80">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity duration-200"></div>
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700/50 rounded-xl p-2 shadow-lg">
                <span className="text-lg">📚</span>
              </div>
            </div>
            <div className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              BookmarkHub
            </div>
          </Link>

        
          <header className="flex justify-end items-center p-4 gap-4 h-16">
            <SignedOut>
              <SignInButton />
              <SignUpButton>

                <button className="bg-[#6c47ff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>

        </div>
      </div>
    </nav>
  );
}