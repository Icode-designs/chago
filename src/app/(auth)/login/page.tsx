"use client";

import Logo from "@/components/Logo";
import { getUserDocument } from "@/lib/services/userService";
import { setUser } from "@/store/slices/userSlice";
import { AppDispatch } from "@/store/store";
import {
  AuthMain,
  CustomButton,
  FlexBox,
  RedirectMessageBox,
} from "@/styles/components/ui.Styles";
import { loginUser, signInWithGoogle } from "@/utils/auth";
import { FirebaseError } from "firebase/app";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaGoogle, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";

interface ERRORTYPE {
  emailErr?: string;
  generalErr?: string;
}

const Page = () => {
  const [error, setError] = useState<ERRORTYPE>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectTo = searchParams.get("from") || "/";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    setError({});
    setLoading(true);

    const email = (formData.get("email") as string) || "";
    const password = (formData.get("password") as string) || "";

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      setError({ emailErr: "Please enter a valid email" });
      setLoading(false);
      return;
    }

    try {
      // Login user
      const user = await loginUser(email, password);
      console.log("User logged in:", user.uid);

      // Set user data
      const userData = await getUserDocument(user.uid);
      dispatch(setUser(userData));

      // Create session cookie
      const idToken = await user.getIdToken();

      const response = await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      if (!response.ok) {
        throw new Error("Failed to create session");
      }

      // Redirect back
      router.push(redirectTo);
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        if (err.code === "auth/invalid-credential") {
          setError({ generalErr: "Incorrect email or password" });
        } else {
          setError({ generalErr: err.message });
        }
      } else {
        setError({ generalErr: "Something went wrong. Try again." });
      }
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setError({});
    setLoading(true);

    try {
      const user = await signInWithGoogle();
      console.log("User logged in with Google:", user.uid);

      // Fetch and set user data in Redux
      const userData = await getUserDocument(user.uid);
      dispatch(setUser(userData));

      // Get ID token
      const idToken = await user.getIdToken();

      // Create session cookie
      const response = await fetch("/api/auth/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
      });

      if (!response.ok) {
        throw new Error("Failed to create session");
      }

      // Redirect to the original page or dashboard
      router.push(redirectTo);
      router.refresh();
    } catch (error: unknown) {
      console.error("Google login error:", error);

      if (
        error instanceof FirebaseError &&
        error.code === "auth/popup-closed-by-user"
      ) {
        setError({ generalErr: "Login cancelled" });
      } else {
        setError({
          generalErr: "Failed to login with Google. Please try again.",
        });
      }

      setLoading(false);
    }
  }

  function toggleShowPassword() {
    setShowPassword((prev) => !prev);
  }

  return (
    <AuthMain>
      <FlexBox $width="100%" $justifyContent="center">
        <Logo variant="black" />
      </FlexBox>
      <form onSubmit={handleSubmit}>
        <div>
          <h1>Login</h1>
          <p>
            or{" "}
            <Link
              href={`/signup${
                searchParams.get("from")
                  ? `?from=${searchParams.get("from")}`
                  : ""
              }`}
            >
              Create A New Account
            </Link>
          </p>
        </div>

        {searchParams.get("from") && (
          <RedirectMessageBox>Login to access that page</RedirectMessageBox>
        )}

        {error.generalErr && <p className="error">{error.generalErr}</p>}

        <fieldset disabled={loading}>
          <div>
            <input type="email" placeholder="Email" name="email" required />
            {error.emailErr && <p className="error">{error.emailErr}</p>}
          </div>

          <div>
            <input
              className="password"
              minLength={8}
              type={!showPassword ? "password" : "text"}
              placeholder="Password"
              name="password"
              required
            />
            <button type="button" className="eye" onClick={toggleShowPassword}>
              {!showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>
        </fieldset>

        <CustomButton $variant="extended" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "login"}
        </CustomButton>

        <FlexBox
          $justifyContent="space-between"
          $width="100%"
          className="seperator"
        >
          <div></div>
          <p>or continue with</p>
          <div></div>
        </FlexBox>

        <button
          className="google"
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          <FaGoogle /> <p>Google</p>
        </button>
      </form>
    </AuthMain>
  );
};

export default Page;
