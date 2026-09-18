import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";

import NuzioLogo from "../components/NuzioLogo";
import AppShell from "../components/AppShell";

const languages = [
  {
    code: "GB",
    name: "English",
    subtitle: "Briefings delivered in English",
  },
  {
    code: "IN",
    name: "हिन्दी",
    subtitle: "हिन्दी में समाचार सुनें",
  },
];

function Language() {
  const navigate = useNavigate();

  const [selectedLanguage, setSelectedLanguage] =
    useState("English");

  const [locationEnabled, setLocationEnabled] =
    useState(false);

  // ==========================================
  // Restore previously selected onboarding data
  // ==========================================

  useEffect(() => {
    try {
      const savedData = JSON.parse(
        localStorage.getItem("nuzioOnboarding") || "{}"
      );

      if (savedData.language) {
        setSelectedLanguage(savedData.language);
      }

      if (
        typeof savedData.locationEnabled === "boolean"
      ) {
        setLocationEnabled(savedData.locationEnabled);
      }
    } catch (error) {
      console.error(
        "Failed to restore onboarding data:",
        error
      );
    }
  }, []);

  // ==========================================
  // Save language + location
  // ==========================================

  const handleContinue = () => {
    try {
      const existingData = JSON.parse(
        localStorage.getItem("nuzioOnboarding") || "{}"
      );

      const updatedData = {
        ...existingData,
        language: selectedLanguage,
        locationEnabled,
      };

      localStorage.setItem(
        "nuzioOnboarding",
        JSON.stringify(updatedData)
      );
    } catch (error) {
      console.error(
        "Failed to save language preferences:",
        error
      );
    }

    navigate("/login");
  };

  return (
    <AppShell>
      <div className="flex min-h-screen flex-col px-5 pb-5 sm:px-6 lg:mx-auto lg:max-w-[620px] lg:px-0">

        {/* ======================================
            LOGO
        ======================================= */}

        <div className="flex justify-center pt-[70px] sm:pt-16">
          <NuzioLogo />
        </div>


        {/* ======================================
            HEADING
        ======================================= */}

        <section className="mt-[48px] sm:mt-12">
          <h1
            className="
              text-[21px]
              font-semibold
              leading-[1.05]
              tracking-[-0.5px]
              sm:text-[27px]
            "
          >
            Choose your

            <span
              className="
                mt-1
                block
                font-serif
                text-[25px]
                font-normal
                italic
                leading-none
                text-violet-400
                sm:text-[31px]
              "
            >
              language.
            </span>
          </h1>

          <p className="mt-3 text-[9px] leading-relaxed text-white/40 sm:text-[11px]">
            Select the language for your daily brief.
          </p>
        </section>


        {/* ======================================
            LANGUAGE OPTIONS
        ======================================= */}

        <section className="mt-5 space-y-2 sm:mt-6">

          {languages.map((language) => {
            const selected =
              selectedLanguage === language.name;

            return (
              <button
                key={language.name}
                type="button"
                onClick={() =>
                  setSelectedLanguage(language.name)
                }
                className={`
                  flex
                  w-full
                  items-center
                  rounded-[11px]
                  border
                  px-3.5
                  py-3
                  text-left
                  transition-all
                  duration-200
                  sm:px-4
                  sm:py-3.5

                  ${
                    selected
                      ? `
                        border-violet-500
                        bg-violet-500/[0.08]
                        shadow-[0_0_18px_rgba(124,58,237,0.08)]
                      `
                      : `
                        border-white/[0.08]
                        bg-white/[0.035]
                        hover:bg-white/[0.05]
                      `
                  }
                `}
              >

                {/* Code */}

                <span className="mr-3 text-[9px] text-white/50 sm:text-[10px]">
                  {language.code}
                </span>


                {/* Text */}

                <div className="flex-1">
                  <p className="text-[11px] font-semibold text-white sm:text-[12px]">
                    {language.name}
                  </p>

                  <p className="mt-0.5 text-[8px] text-white/30 sm:text-[9px]">
                    {language.subtitle}
                  </p>
                </div>


                {/* Radio */}

                <span
                  className={`
                    flex
                    h-[15px]
                    w-[15px]
                    items-center
                    justify-center
                    rounded-full
                    border
                    sm:h-[17px]
                    sm:w-[17px]

                    ${
                      selected
                        ? "border-violet-400"
                        : "border-white/20"
                    }
                  `}
                >
                  {selected && (
                    <span className="h-[7px] w-[7px] rounded-full bg-violet-400 sm:h-2 sm:w-2" />
                  )}
                </span>
              </button>
            );
          })}


          {/* ======================================
              LOCATION
          ======================================= */}

          <div className="mt-4 rounded-[11px] border border-white/[0.08] bg-white/[0.035] px-3.5 py-3 sm:mt-5 sm:px-4 sm:py-3.5">

            <div className="flex items-center">

              <div className="mr-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-violet-500/15 sm:h-9 sm:w-9">
                <MapPin
                  size={13}
                  strokeWidth={2}
                  className="text-pink-400 sm:h-[15px] sm:w-[15px]"
                />
              </div>

              <div className="flex-1">
                <p className="text-[11px] font-semibold sm:text-[12px]">
                  Enable Location
                </p>

                <p className="mt-0.5 text-[8px] text-white/30 sm:text-[9px]">
                  Get hyperlocal news tailored to your city.
                </p>
              </div>


              {/* Toggle */}

              <button
                type="button"
                aria-label="Toggle location"
                aria-pressed={locationEnabled}
                onClick={() =>
                  setLocationEnabled(
                    !locationEnabled
                  )
                }
                className={`
                  relative
                  h-[20px]
                  w-[34px]
                  shrink-0
                  rounded-full
                  transition
                  sm:h-[22px]
                  sm:w-[37px]

                  ${
                    locationEnabled
                      ? "bg-violet-500"
                      : "bg-white/15"
                  }
                `}
              >
                <span
                  className={`
                    absolute
                    top-[3px]
                    h-[14px]
                    w-[14px]
                    rounded-full
                    bg-white
                    shadow
                    transition-all
                    sm:h-4
                    sm:w-4

                    ${
                      locationEnabled
                        ? "left-[17px] sm:left-[18px]"
                        : "left-[3px]"
                    }
                  `}
                />
              </button>

            </div>


            {/* Status */}

            <p className="mt-2 pl-11 text-[7px] tracking-[0.18em] text-white/25 sm:text-[8px]">
              {locationEnabled
                ? "LOCATION ENABLED"
                : "LOCATION NOT ALLOWED"}
            </p>

          </div>

        </section>


        {/* ======================================
            BOTTOM CTA
        ======================================= */}

        <div className="mt-auto pt-8 sm:pt-10">

          <button
            type="button"
            onClick={handleContinue}
            className="
              w-full
              rounded-[11px]
              bg-gradient-to-r
              from-violet-400
              to-violet-600
              py-3.5
              text-[11px]
              font-semibold
              shadow-[0_8px_30px_rgba(124,58,237,0.22)]
              transition
              hover:brightness-110
              active:scale-[0.99]
              sm:py-4
              sm:text-[12px]
            "
          >
            Continue →
          </button>

        </div>

      </div>
    </AppShell>
  );
}

export default Language;