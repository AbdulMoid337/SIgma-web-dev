"use client"
import { useSession, signIn, signOut } from "next-auth/react"

import { useEffect } from "react";
import { useDarkMode } from "usehooks-ts";
import { FaSun, FaMoon } from "react-icons/fa";

export default function Component() {
  const { data: session } = useSession()
  const { isDarkMode, toggle } = useDarkMode();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 relative">
        <div className="absolute top-4 right-4 flex items-center space-x-4">
          <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
            
          </p>
          <label
            className="relative inline-flex items-center cursor-pointer"
            aria-label="Toggle Dark Mode"
          >
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isDarkMode}
              onChange={toggle}
            />
            <div className="w-14 h-8 bg-gray-300 rounded-full peer-checked:bg-gray-700 transition-colors duration-300"></div>

            <div
              className={`absolute left-1 top-1 w-6 h-6 bg-white dark:bg-yellow-400 rounded-full shadow-md 
                          transform peer-checked:translate-x-6 transition-transform duration-300`}
            ></div>

            <FaMoon
              className={`absolute left-2 top-2 text-gray-500 dark:text-gray-200 transition-opacity duration-300 ${
                isDarkMode ? "opacity-100" : "opacity-0"
              }`}
              size={16}
            />
            <FaSun
              className={`absolute right-2 top-2 text-yellow-500 transition-opacity duration-300 ${
                isDarkMode ? "opacity-0" : "opacity-100"
              }`}
              size={16}
            />
          </label>
        </div>

        {session ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Signed in as {session.user.email}</h2>
            {session.user.image && (
              <img
                className="rounded-full mb-4"
                src={session.user.image}
                alt="Profile Picture"
                width={100}
                height={100}
              />
            )}
            {session.user.name && (
              <h3  className="text-xl font-semibold mb-4">{session.user.name}</h3>
            )}
            <button
              onClick={() => signOut()}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
            >
              Sign out
            </button>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Not signed in</h2>
            <button
              onClick={() => signIn("github")}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            >
              Sign in with GitHub
            </button>
          </div>
        )}
      </div>
    </>
  )
}