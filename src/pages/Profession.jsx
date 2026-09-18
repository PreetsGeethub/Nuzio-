import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AppShell from "../components/AppShell";
import NuzioLogo from "../components/NuzioLogo";

const professions = [
  {
    name: "Finance & Trading",
    icon: "📈",
  },
  {
    name: "Legal",
    icon: "⚖️",
  },
  {
    name: "Technology",
    icon: "💻",
  },
  {
    name: "Healthcare",
    icon: "🩺",
  },
  {
    name: "Consulting",
    icon: "💼",
  },
  {
    name: "Marketing & Media",
    icon: "📣",
  },
  {
    name: "Government & Policy",
    icon: "🏛️",
  },
  {
    name: "Real Estate",
    icon: "🏢",
  },
  {
    name: "Education",
    icon: "🎓",
  },
  {
    name: "Founder / Builder",
    icon: "🚀",
  },
];

function Profession() {
  const navigate = useNavigate();

  /*
    Restore previously selected profession
    if the user comes back to this screen.
  */
  const [selectedProfession, setSelectedProfession] =
    useState(() => {
      try {
        const saved =
          localStorage.getItem("nuzioOnboarding");

        if (saved) {
          const data = JSON.parse(saved);

          return data.profession || "";
        }
      } catch (error) {
        console.error(
          "Unable to restore onboarding data:",
          error
        );
      }

      return "";
    });

  const handleContinue = () => {
    if (!selectedProfession) return;

    /*
      Read existing onboarding data so we don't
      overwrite anything collected from other steps.
    */
    let existingData = {};

    try {
      const saved =
        localStorage.getItem("nuzioOnboarding");

      if (saved) {
        existingData = JSON.parse(saved);
      }
    } catch (error) {
      console.error(
        "Unable to read onboarding data:",
        error
      );
    }

    const updatedData = {
      ...existingData,
      profession: selectedProfession,
    };

    localStorage.setItem(
      "nuzioOnboarding",
      JSON.stringify(updatedData)
    );

    console.log(
      "Profession saved locally:",
      updatedData
    );

    navigate("/interests");
  };

  return (
    <AppShell>
      <div
        className="
          flex
          min-h-screen
          flex-col
          px-[17px]
          pb-5

          sm:px-8

          md:px-12

          lg:px-16
          xl:px-20
        "
      >

        {/* =========================
            CONTENT WRAPPER
        ========================== */}

        <div
          className="
            mx-auto
            flex
            w-full
            max-w-[430px]
            flex-1
            flex-col

            lg:max-w-[560px]
            xl:max-w-[620px]
          "
        >

          {/* =========================
              TOP BAR
          ========================== */}

          <div
            className="
              flex
              items-center
              justify-between
              pt-[27px]

              sm:pt-8

              lg:pt-10
            "
          >

            <NuzioLogo />

            <button
              type="button"
              onClick={() => navigate("/interests")}
              className="
                text-[7px]
                tracking-[0.15em]
                text-white/35
                transition
                hover:text-white/60

                sm:text-[8px]
              "
            >
              SKIP →
            </button>

          </div>


          {/* =========================
              PROGRESS
          ========================== */}

          <div
            className="
              mt-[25px]
              flex
              gap-[4px]

              sm:mt-7
            "
          >

            <div
              className="
                h-[3px]
                flex-1
                rounded-full
                bg-gradient-to-r
                from-violet-500
                to-emerald-400
              "
            />

            <div
              className="
                h-[3px]
                flex-1
                rounded-full
                bg-white/[0.09]
              "
            />

            <div
              className="
                h-[3px]
                flex-1
                rounded-full
                bg-white/[0.09]
              "
            />

            <div
              className="
                h-[3px]
                flex-1
                rounded-full
                bg-white/[0.09]
              "
            />

            <div
              className="
                h-[3px]
                flex-1
                rounded-full
                bg-white/[0.09]
              "
            />

            <div
              className="
                h-[3px]
                flex-1
                rounded-full
                bg-white/[0.09]
              "
            />

          </div>


          {/* =========================
              STEP
          ========================== */}

          <p
            className="
              mt-[19px]
              text-[7px]
              font-medium
              tracking-[0.25em]
              text-violet-400

              sm:mt-5
              sm:text-[8px]
            "
          >
            STEP 1 OF 6
          </p>


          {/* =========================
              HEADING
          ========================== */}

          <section
            className="
              mt-[11px]

              sm:mt-3
            "
          >

            <h1
              className="
                text-[22px]
                font-semibold
                leading-[0.95]
                tracking-[-0.6px]

                sm:text-[25px]

                lg:text-[28px]
              "
            >
              What's your
            </h1>

            <p
              className="
                mt-[3px]
                font-serif
                text-[25px]
                italic
                leading-none
                text-violet-400

                sm:text-[28px]

                lg:text-[31px]
              "
            >
              profession?
            </p>

            <p
              className="
                mt-[12px]
                text-[9px]
                leading-relaxed
                text-white/40

                sm:text-[10px]
              "
            >
              We'll tune every brief to what actually
              moves your day.
            </p>

          </section>


          {/* =========================
              PROFESSION CHIPS
          ========================== */}

          <section
            className="
              mt-[18px]
              flex
              flex-wrap
              gap-[8px]

              sm:gap-[9px]

              lg:gap-[10px]
            "
          >

            {professions.map((profession) => {

              const selected =
                selectedProfession ===
                profession.name;

              return (
                <button
                  key={profession.name}
                  type="button"
                  onClick={() =>
                    setSelectedProfession(
                      profession.name
                    )
                  }
                  aria-pressed={selected}
                  className={`
                    flex
                    items-center
                    gap-[6px]
                    rounded-full
                    border
                    px-[13px]
                    py-[9px]
                    text-[9px]
                    font-medium
                    transition-all
                    duration-150

                    sm:px-[14px]
                    sm:py-[10px]
                    sm:text-[10px]

                    ${
                      selected
                        ? `
                          border-violet-500
                          bg-violet-500/[0.10]
                          text-white
                          shadow-[0_0_12px_rgba(124,58,237,0.08)]
                        `
                        : `
                          border-white/[0.09]
                          bg-white/[0.045]
                          text-white/65
                          hover:bg-white/[0.07]
                        `
                    }
                  `}
                >

                  <span
                    className="
                      text-[10px]

                      sm:text-[11px]
                    "
                  >
                    {profession.icon}
                  </span>

                  <span>
                    {profession.name}
                  </span>

                  {selected && (
                    <span
                      className="
                        ml-[1px]
                        text-emerald-400
                      "
                    >
                      ✓
                    </span>
                  )}

                </button>
              );
            })}

          </section>


          {/* =========================
              CONTINUE
          ========================== */}

          <div
            className="
              mt-auto
              pt-7

              sm:pt-8

              lg:pt-10
            "
          >

            <button
              type="button"
              disabled={!selectedProfession}
              onClick={handleContinue}
              className={`
                h-[44px]
                w-full
                rounded-[11px]
                text-[10px]
                font-semibold
                transition-all

                sm:h-[48px]
                sm:text-[11px]

                ${
                  selectedProfession
                    ? `
                      bg-gradient-to-r
                      from-violet-400
                      to-violet-600
                      text-white
                      shadow-[0_7px_25px_rgba(124,58,237,0.25)]
                      hover:brightness-110
                    `
                    : `
                      cursor-not-allowed
                      bg-white/[0.07]
                      text-white/25
                    `
                }
              `}
            >
              Continue →
            </button>

          </div>

        </div>

      </div>
    </AppShell>
  );
}

export default Profession;