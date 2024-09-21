import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="h-screen bg-gradient-to-r from-orange-500 via-orange-300 to-yellow-500 text-white py-20 flex flex-col items-center justify-center space-y-4">
      <SignUp />
    </div>
  );
}
