import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="rounded-2xl shadow-md bg-white">
      <SignUp
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
        forceRedirectUrl="/dashboard"
        appearance={{
          elements: {
            formButtonPrimary: "bg-slate-900 hover:bg-slate-800 text-white",
            formFieldInput: "border-slate-300 focus:ring-slate-500",
            card: "shadow-none",
          },
          variables: {
            colorPrimary: "#0f172a",
          },
        }}
      />
    </div>
  );
}
