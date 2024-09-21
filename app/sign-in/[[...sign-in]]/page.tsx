import { SignIn } from "@clerk/nextjs";

export default function page() {
  return (
    <div className="h-screen bg-gradient-to-r from-black via-violet-500 to-purple-950 text-white py-20 flex flex-col items-center justify-center space-y-4">
      <SignIn />
    </div>
    )
}
