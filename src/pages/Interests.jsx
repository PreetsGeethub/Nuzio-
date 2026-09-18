import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AppShell from "../components/AppShell";
import NuzioLogo from "../components/NuzioLogo";

const niches = [
  {
    name: "AI & Technology",
    icon: "🤖",
  },
  {
    name: "Financial Markets",
    icon: "📊",
  },
  {
    name: "Indian Business",
    icon: "🇮🇳",
  },
  {
    name: "Global Politics",
    icon: "🌎",
  },
  {
    name: "Startups",
    icon: "🚀",
  },
  {
    name: "Science",
    icon: "🔬",
  },
  {
    name: "Geopolitics",
    icon: "🌐",
  },
  {
    name: "Health & Medicine",
    icon: "💊",
  },
  {
    name: "Climate & Energy",
    icon: "🌱",
  },
  {
    name: "Sports",
    icon: "⚽",
  },
  {
    name: "Culture & Arts",
    icon: "🎭",
  },
  {
    name: "Legal & Policy",
    icon: "⚖️",
  },
];

function Interests() {
  const navigate = useNavigate();

  const MAX_NICHES = 7;

  /*
    Restore previously selected interests if the user
    comes back to this screen.
  */
  const [selectedNiches, setSelectedNiches] = useState(() => {
    try {
      const saved = localStorage.getItem("nuzioOnboarding");

      if (saved) {
        const data = JSON.parse(saved);

        if (Array.isArray(data.interests)) {
          return data.interests;
        }
      }
    } catch (error) {
      console.error(
        "Unable to restore onboarding data:",
        error
      );
    }

    return [];
  });

  const toggleNiche = (niche) => {
    setSelectedNiches((current) => {

      // Remove if already selected
      if (current.includes(niche)) {
        return current.filter(
          (item) => item !== niche
        );
      }

      // Don't allow more than 7
      if (current.length >= MAX_NICHES) {
        return current;
      }

      // Add new niche
      return [...current, niche];
    });
  };

  const handleContinue = () => {
    if (selectedNiches.length === 0) {
      return;
    }

    /*
      Read existing onboarding data so we don't
      overwrite profession or any other step.
    */
    let existingData = {};

    try {
      const saved = localStorage.getItem(
        "nuzioOnboarding"
      );

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
      interests: selectedNiches,
    };

    localStorage.setItem(
      "nuzioOnboarding",
      JSON.stringify(updatedData)
    );

    console.log(
      "Interests saved locally:",
      updatedData
    );

    navigate("/preferences");
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
            DESKTOP CONTENT WRAPPER
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
              onClick={() => navigate("/preferences")}
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
            STEP 2 OF 6
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
              What moves
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
              your world?
            </p>

            <div
              className="
                mt-[12px]
                flex
                items-center
                gap-2
              "
            >

              <p
                className="
                  text-[9px]
                  text-white/40

                  sm:text-[10px]
                "
              >
                Pick up to 7 niches.
              </p>

              <span
                className="
                  rounded-full
                  border
                  border-emerald-400/50
                  bg-emerald-400/[0.08]
                  px-[7px]
                  py-[2px]
                  text-[7px]
                  font-medium
                  text-emerald-400

                  sm:text-[8px]
                "
              >
                {selectedNiches.length}/7
              </span>

            </div>

          </section>


          {/* =========================
              NICHE CHIPS
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

            {niches.map((niche) => {

              const selected =
                selectedNiches.includes(
                  niche.name
                );

              return (
                <button
                  key={niche.name}
                  type="button"
                  onClick={() =>
                    toggleNiche(niche.name)
                  }
                  aria-pressed={selected}
                  className={`
                    flex
                    items-center
                    gap-[6px]
                    rounded-full
                    border
                    px-[12px]
                    py-[9px]
                    text-[9px]
                    font-medium
                    transition-all
                    duration-150

                    sm:px-[13px]
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
                    {niche.icon}
                  </span>

                  <span>
                    {niche.name}
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
              disabled={
                selectedNiches.length === 0
              }
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
                  selectedNiches.length > 0
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

export default Interests;