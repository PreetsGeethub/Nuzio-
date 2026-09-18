import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Play, Check } from "lucide-react";

import AppShell from "../components/AppShell";
import NuzioLogo from "../components/NuzioLogo";

const voices = [
  {
    name: "Aria",
    language: "EN",
    description: "Warm · Unhurried · British",
    gender: "♀",
    sampleLanguage: "English",
  },
  {
    name: "Kai",
    language: "EN",
    description: "Crisp · Focused · American",
    gender: "♂",
    sampleLanguage: "English",
  },
  {
    name: "Meera",
    language: "HI",
    description: "Bright · Warm · Indian",
    gender: "♀",
    sampleLanguage: "Hindi",
  },
];

const lengths = [
  "5 min",
  "10 min",
  "15 min",
  "Custom",
];

function Preferences() {
  const navigate = useNavigate();

  const [selectedVoice, setSelectedVoice] = useState(() => {
    const saved = localStorage.getItem("nuzioOnboarding");

    if (saved) {
      try {
        const data = JSON.parse(saved);
        return data.voice || "Aria";
      } catch {
        return "Aria";
      }
    }

    return "Aria";
  });

  const [selectedLength, setSelectedLength] = useState(() => {
    const saved = localStorage.getItem("nuzioOnboarding");

    if (saved) {
      try {
        const data = JSON.parse(saved);
        return data.length || "5 min";
      } catch {
        return "5 min";
      }
    }

    return "5 min";
  });

  const [playingVoice, setPlayingVoice] = useState(null);

  const handlePlay = (voiceName) => {
    if (playingVoice === voiceName) {
      setPlayingVoice(null);
      return;
    }

    setPlayingVoice(voiceName);

    // Temporary 10-second sample simulation.
    setTimeout(() => {
      setPlayingVoice((current) =>
        current === voiceName ? null : current
      );
    }, 10000);
  };

  const handleContinue = () => {
    /*
      Save this step locally.

      We don't send to the backend yet because
      Time and Notifications are collected later.
    */

    let existingData = {};

    try {
      const saved = localStorage.getItem("nuzioOnboarding");

      if (saved) {
        existingData = JSON.parse(saved);
      }
    } catch {
      existingData = {};
    }

    const updatedData = {
      ...existingData,
      voice: selectedVoice,
      length: selectedLength,
    };

    localStorage.setItem(
      "nuzioOnboarding",
      JSON.stringify(updatedData)
    );

    console.log("Preferences saved locally:", updatedData);

    navigate("/time");
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

            lg:max-w-[520px]
            xl:max-w-[560px]
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
              onClick={() => navigate("/time")}
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

            <div className="h-[3px] flex-1 rounded-full bg-gradient-to-r from-violet-500 to-emerald-400" />

            <div className="h-[3px] flex-1 rounded-full bg-gradient-to-r from-violet-500 to-emerald-400" />

            <div className="h-[3px] flex-1 rounded-full bg-gradient-to-r from-violet-500 to-emerald-400" />

            <div className="h-[3px] flex-1 rounded-full bg-white/[0.09]" />

            <div className="h-[3px] flex-1 rounded-full bg-white/[0.09]" />

            <div className="h-[3px] flex-1 rounded-full bg-white/[0.09]" />

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
            STEP 3 OF 6
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
              Pick a
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
              narrator voice.
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
              Tap ▶ to hear a 10-second sample.
            </p>

          </section>


          {/* =========================
              VOICE CARDS
          ========================== */}

          <section
            className="
              mt-[15px]
              space-y-[8px]

              sm:mt-4
              sm:space-y-2
            "
          >

            {voices.map((voice) => {

              const selected =
                selectedVoice === voice.name;

              const playing =
                playingVoice === voice.name;

              return (
                <div
                  key={voice.name}
                  className={`
                    flex
                    items-center
                    rounded-[11px]
                    border
                    px-[13px]
                    py-[10px]
                    transition-all

                    sm:px-4
                    sm:py-3

                    ${
                      selected
                        ? `
                          border-violet-500
                          bg-violet-500/[0.09]
                          shadow-[0_0_15px_rgba(124,58,237,0.07)]
                        `
                        : `
                          border-white/[0.09]
                          bg-white/[0.045]
                        `
                    }
                  `}
                >

                  {/* =========================
                      AVATAR
                  ========================== */}

                  <button
                    type="button"
                    onClick={() =>
                      setSelectedVoice(voice.name)
                    }
                    className={`
                      mr-[10px]
                      flex
                      h-[32px]
                      w-[32px]
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      text-[11px]
                      font-semibold
                      text-white

                      sm:mr-3
                      sm:h-9
                      sm:w-9

                      ${
                        selected
                          ? "bg-violet-500"
                          : "bg-blue-500/90"
                      }
                    `}
                  >
                    {voice.name.charAt(0)}
                  </button>


                  {/* =========================
                      INFORMATION
                  ========================== */}

                  <button
                    type="button"
                    onClick={() =>
                      setSelectedVoice(voice.name)
                    }
                    className="
                      min-w-0
                      flex-1
                      text-left
                    "
                  >

                    <div className="flex items-center gap-[6px]">

                      <span
                        className="
                          text-[10px]
                          font-semibold
                          text-white

                          sm:text-[11px]
                        "
                      >
                        {voice.name}
                      </span>

                      <span
                        className="
                          rounded-[4px]
                          bg-white/[0.08]
                          px-[4px]
                          py-[1px]
                          text-[6px]
                          text-violet-300

                          sm:text-[7px]
                        "
                      >
                        {voice.language}
                      </span>

                    </div>

                    <p
                      className="
                        mt-[3px]
                        truncate
                        text-[7px]
                        text-white/40

                        sm:text-[8px]
                      "
                    >
                      {voice.description}, {voice.gender}
                    </p>

                    <p
                      className="
                        mt-[1px]
                        font-serif
                        text-[7px]
                        italic
                        text-white/25

                        sm:text-[8px]
                      "
                    >
                      {voice.sampleLanguage}
                    </p>

                  </button>


                  {/* =========================
                      SELECTED CHECK
                  ========================== */}

                  {selected && (
                    <div
                      className="
                        mr-[7px]
                        flex
                        h-[15px]
                        w-[15px]
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-emerald-400

                        sm:mr-2
                        sm:h-[17px]
                        sm:w-[17px]
                      "
                    >
                      <Check
                        size={9}
                        strokeWidth={3}
                        className="text-black"
                      />
                    </div>
                  )}


                  {/* =========================
                      PLAY
                  ========================== */}

                  <button
                    type="button"
                    onClick={() =>
                      handlePlay(voice.name)
                    }
                    aria-label={`Play ${voice.name} sample`}
                    className={`
                      flex
                      h-[26px]
                      w-[26px]
                      shrink-0
                      items-center
                      justify-center
                      rounded-[7px]
                      transition

                      sm:h-8
                      sm:w-8

                      ${
                        selected
                          ? "bg-violet-500 text-white"
                          : "bg-white/[0.10] text-white/45"
                      }
                    `}
                  >
                    <Play
                      size={10}
                      fill="currentColor"
                      className={
                        playing
                          ? "animate-pulse"
                          : ""
                      }
                    />
                  </button>

                </div>
              );
            })}

          </section>


          {/* =========================
              BRIEF LENGTH
          ========================== */}

          <section
            className="
              mt-[17px]

              sm:mt-6
            "
          >

            <p
              className="
                text-[7px]
                font-medium
                tracking-[0.2em]
                text-violet-400

                sm:text-[8px]
              "
            >
              BRIEF LENGTH
            </p>

            <h2
              className="
                mt-[7px]
                text-[17px]
                font-semibold
                leading-[0.9]

                sm:text-[19px]

                lg:text-[21px]
              "
            >
              How long is
            </h2>

            <p
              className="
                mt-[3px]
                font-serif
                text-[19px]
                italic
                leading-none
                text-violet-400

                sm:text-[21px]

                lg:text-[23px]
              "
            >
              your morning?
            </p>

            <p
              className="
                mt-[8px]
                text-[8px]
                text-white/35

                sm:text-[9px]
              "
            >
              Set your ideal brief length.
            </p>


            {/* =========================
                LENGTH BUTTONS
            ========================== */}

            <div
              className="
                mt-[9px]
                flex
                gap-[7px]

                sm:gap-2
              "
            >

              {lengths.map((length) => {

                const selected =
                  selectedLength === length;

                return (
                  <button
                    key={length}
                    type="button"
                    onClick={() =>
                      setSelectedLength(length)
                    }
                    className={`
                      flex-1
                      rounded-[8px]
                      border
                      py-[9px]
                      text-[8px]
                      font-medium
                      transition

                      sm:py-[10px]
                      sm:text-[9px]

                      ${
                        selected
                          ? `
                            border-violet-500
                            bg-violet-500
                            text-white
                          `
                          : `
                            border-white/[0.08]
                            bg-white/[0.045]
                            text-white/50
                          `
                      }
                    `}
                  >
                    {length}
                  </button>
                );
              })}

            </div>

          </section>


          {/* =========================
              CONTINUE
          ========================== */}

          <div
            className="
              mt-auto
              pt-6

              sm:pt-8

              lg:pt-10
            "
          >

            <button
              type="button"
              onClick={handleContinue}
              className="
                h-[44px]
                w-full
                rounded-[11px]
                bg-gradient-to-r
                from-violet-400
                to-violet-600
                text-[10px]
                font-semibold
                text-white
                shadow-[0_7px_25px_rgba(124,58,237,0.25)]
                transition
                hover:brightness-110

                sm:h-[48px]
                sm:text-[11px]

                lg:h-[50px]
              "
            >
              Continue with {selectedVoice} · {selectedLength} →
            </button>

          </div>

        </div>

      </div>
    </AppShell>
  );
}

export default Preferences;