import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

import AppShell from "../components/AppShell";
import NuzioLogo from "../components/NuzioLogo";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    // Remove previous error once user starts editing again
    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: form.email,
            password: form.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to sign in"
        );
      }

      console.log("Login successful:", data);

      // Backend has already set the HTTP-only cookie.
      // We don't need to store the JWT ourselves.

      navigate("/profession");
    } catch (error) {
      console.error("Login error:", error);

      setError(
        error.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell>
      <div
        className="
          relative
          min-h-screen
          overflow-hidden
          px-7
          pb-6

          sm:px-10
          md:px-12
          lg:px-16
          xl:px-20
        "
      >

        {/* =========================
            DESKTOP BACKGROUND GLOW
        ========================== */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-[-180px]
            h-[420px]
            w-[420px]
            -translate-x-1/2
            rounded-full
            bg-violet-600/[0.07]
            blur-[100px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            bottom-[-180px]
            right-[-100px]
            hidden
            h-[420px]
            w-[420px]
            rounded-full
            bg-violet-500/[0.05]
            blur-[120px]

            lg:block
          "
        />


        {/* =========================
            MAIN CONTENT
        ========================== */}

        <div
          className="
            relative
            mx-auto
            w-full
            max-w-[430px]

            lg:max-w-[470px]
          "
        >

          {/* =========================
              LOGO
          ========================== */}

          <div
            className="
              flex
              justify-center
              pt-[72px]

              sm:pt-[80px]
              lg:pt-[90px]
            "
          >
            <NuzioLogo />
          </div>


          {/* =========================
              HERO COPY
          ========================== */}

          <section
            className="
              mt-[92px]

              sm:mt-[96px]
              lg:mt-[82px]
            "
          >

            <h1
              className="
                text-[29px]
                font-semibold
                leading-[1.05]
                tracking-[-1px]
                text-white

                sm:text-[31px]
                lg:text-[34px]
              "
            >
              Good morning.
            </h1>

            <p
              className="
                mt-1
                font-serif
                text-[31px]
                font-normal
                italic
                leading-none
                tracking-[-1px]
                text-violet-400

                sm:text-[33px]
                lg:text-[36px]
              "
            >
              News on go.
            </p>

            <p
              className="
                mt-6
                max-w-[310px]
                text-[10px]
                leading-[1.65]
                text-white/45

                sm:text-[11px]
                lg:max-w-[350px]
                lg:text-[11px]
              "
            >
              Personalised audio news for Indian
              professionals — curated every morning.
            </p>

          </section>


          {/* =========================
              LOGIN FORM
          ========================== */}

          <form
            onSubmit={handleSubmit}
            className="
              mt-[58px]

              sm:mt-[60px]
              lg:mt-[52px]
            "
          >

            {/* =========================
                EMAIL
            ========================== */}

            <div className="relative">

              <Mail
                size={16}
                strokeWidth={1.7}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-white/40
                "
              />

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email address"
                required
                autoComplete="email"
                disabled={loading}
                className="
                  h-[52px]
                  w-full
                  rounded-[12px]
                  border
                  border-white/[0.12]
                  bg-white/[0.035]
                  pl-[47px]
                  pr-4
                  text-[11px]
                  text-white
                  outline-none

                  placeholder:text-white/30

                  transition

                  focus:border-violet-500/70
                  focus:bg-white/[0.05]

                  disabled:cursor-not-allowed
                  disabled:opacity-60

                  sm:h-[54px]
                  lg:h-[56px]
                "
              />

            </div>


            {/* =========================
                PASSWORD
            ========================== */}

            <div className="relative mt-3">

              <Lock
                size={16}
                strokeWidth={1.7}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-white/40
                "
              />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                required
                autoComplete="current-password"
                disabled={loading}
                className="
                  h-[52px]
                  w-full
                  rounded-[12px]
                  border
                  border-white/[0.12]
                  bg-white/[0.035]
                  pl-[47px]
                  pr-[45px]
                  text-[11px]
                  text-white
                  outline-none

                  placeholder:text-white/30

                  transition

                  focus:border-violet-500/70
                  focus:bg-white/[0.05]

                  disabled:cursor-not-allowed
                  disabled:opacity-60

                  sm:h-[54px]
                  lg:h-[56px]
                "
              />

              <button
                type="button"
                disabled={loading}
                onClick={() =>
                  setShowPassword(
                    (previous) => !previous
                  )
                }
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-white/35
                  transition
                  hover:text-white/60

                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword ? (
                  <EyeOff size={15} />
                ) : (
                  <Eye size={15} />
                )}
              </button>

            </div>


            {/* =========================
                ERROR MESSAGE
            ========================== */}

            {error && (
              <div
                className="
                  mt-3
                  rounded-[10px]
                  border
                  border-red-400/20
                  bg-red-400/[0.08]
                  px-3
                  py-2.5
                  text-[10px]
                  leading-relaxed
                  text-red-300
                "
              >
                {error}
              </div>
            )}


            {/* =========================
                CONTINUE BUTTON
            ========================== */}

            <button
              type="submit"
              disabled={loading}
              className="
                mt-4
                flex
                h-[52px]
                w-full
                items-center
                justify-center
                rounded-[12px]

                bg-gradient-to-r
                from-violet-400
                via-violet-500
                to-violet-600

                text-[12px]
                font-semibold
                text-white

                shadow-[0_8px_30px_rgba(124,58,237,0.28)]

                transition

                hover:brightness-110
                active:scale-[0.99]

                disabled:cursor-not-allowed
                disabled:opacity-60
                disabled:hover:brightness-100

                sm:h-[54px]
                lg:h-[56px]
              "
            >
              {loading
                ? "Signing in..."
                : "Continue →"}
            </button>


            {/* =========================
                DIVIDER
            ========================== */}

            <div className="my-6 flex items-center gap-3">

              <div className="h-px flex-1 bg-white/[0.10]" />

              <span
                className="
                  text-[9px]
                  font-medium
                  text-white/30
                "
              >
                OR
              </span>

              <div className="h-px flex-1 bg-white/[0.10]" />

            </div>


            {/* =========================
                GOOGLE
            ========================== */}

            <button
              type="button"
              disabled={loading}
              className="
                flex
                h-[52px]
                w-full
                items-center
                justify-center
                gap-3

                rounded-[12px]

                border
                border-white/[0.08]

                bg-white/[0.08]

                text-[11px]
                font-medium
                text-white

                transition

                hover:bg-white/[0.11]

                disabled:cursor-not-allowed
                disabled:opacity-50

                sm:h-[54px]
                lg:h-[56px]
              "
            >

              {/* Google G */}

              <span
                className="
                  text-[17px]
                  font-bold
                "
              >
                G
              </span>

              Continue with Google

            </button>


            {/* =========================
                TERMS
            ========================== */}

            <p
              className="
                mt-7
                text-center
                text-[8px]
                leading-relaxed
                text-white/30

                sm:text-[9px]
              "
            >
              By continuing you agree to our{" "}

              <button
                type="button"
                className="
                  text-violet-400
                  underline
                  underline-offset-2
                "
              >
                Terms
              </button>

              {" "} & {" "}

              <button
                type="button"
                className="
                  text-violet-400
                  underline
                  underline-offset-2
                "
              >
                Privacy Policy
              </button>

            </p>

          </form>

        </div>

      </div>
    </AppShell>
  );
}

export default Login;