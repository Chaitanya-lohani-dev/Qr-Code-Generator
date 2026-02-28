import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <SignIn
      path="/sign-in"
      routing="path"
      signUpUrl="/sign-up"
      forceRedirectUrl="/dashboard"
      appearance={{
        elements: {
          formButtonPrimary: "bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 text-sm normal-case",
          formFieldInput: "focus:ring-cyan-500 focus:border-cyan-500",
          footerActionLink: "text-cyan-600 hover:text-cyan-700",
          card: "shadow-xl"
        },
        variables: {
          colorPrimary: "#0891b2", // A nice cyan color
        },
      }}
    />
  );
}
