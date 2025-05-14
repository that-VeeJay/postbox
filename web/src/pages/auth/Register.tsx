import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100 dark:bg-neutral-950">
      <div className="md:bg-white dark:bg-neutral-900 w-[500px] p-12 md:shadow-lg rounded-lg space-y-5 overflow-hidden">
        <div className="z-10">
          <h1 className="text-2xl font-semibold ">Create a new account</h1>
          <p className="text-sm text-neutral-500">
            To use postbox, please enter your details.
          </p>
        </div>

        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Your name"
            className="w-full bg-neutral-100 dark:bg-neutral-800 p-3 rounded-lg mt-1"
          />
        </div>

        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="@yourusername"
            className="w-full bg-neutral-100 dark:bg-neutral-800 p-3 rounded-lg mt-1"
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            placeholder="name@email.com"
            className="w-full bg-neutral-100 dark:bg-neutral-800 p-3 rounded-lg mt-1"
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="••••••••••••"
            className="w-full bg-neutral-100 dark:bg-neutral-800 p-3 rounded-lg mt-1"
          />
        </div>

        <div>
          <label htmlFor="password_confirmation">Confirm Password</label>
          <input
            type="password"
            id="password_confirmation"
            placeholder="••••••••••••"
            className="w-full bg-neutral-100 dark:bg-neutral-800 p-3 rounded-lg mt-1"
          />
        </div>

        <Button className="w-full py-6">Create account</Button>
        <div className="text-center">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="font-semibold hover:underline">
              Login
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
