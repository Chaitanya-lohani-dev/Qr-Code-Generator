import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className=" rounded-2xl shadow-md bg-white">
      <SignIn
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
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
