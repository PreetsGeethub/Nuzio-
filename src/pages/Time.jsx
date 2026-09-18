import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import AppShell from "../components/AppShell";
import NuzioLogo from "../components/NuzioLogo";

// ==========================================
// Generate all times
// 1:00 AM → 12:30 AM
// Same clock values are used for PM.
// ==========================================

const generateTimes = () => {
  const result = [];

  for (let hour = 1; hour <= 12; hour++) {
    result.push(`${hour}:00`);
    result.push(`${hour}:30`);
  }

  return result;
};

const times = generateTimes();

const ITEM_HEIGHT = 48;

function Time() {
  const navigate = useNavigate();

  const [period, setPeriod] = useState("AM");
  const [selectedTime, setSelectedTime] = useState("7:00");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const scrollRef = useRef(null);

  // ==========================================
  // Scroll a specific time into the center
  // ==========================================

  const scrollToTime = (time, smooth = true) => {
    const index = times.indexOf(time);

    if (index === -1 || !scrollRef.current) {
      return;
    }

    /*
      The picker has a top spacer:

      50% - half item height
      = 150 - 24
      = 126px

      Therefore:

      scrollTop = index × item height

      puts that item's center exactly
      in the center of the 300px picker.
    */

    const targetScroll = index * ITEM_HEIGHT;

    scrollRef.current.scrollTo({
      top: targetScroll,
      behavior: smooth ? "smooth" : "auto",
    });
  };

  // ==========================================
  // Initial selected time
  // ==========================================

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToTime("7:00", false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // ==========================================
  // Detect selected time while scrolling
  // ==========================================

  const handleScroll = () => {
    const container = scrollRef.current;

    if (!container) {
      return;
    }

    /*
      Because the spacer already centers the
      first item, scrollTop / ITEM_HEIGHT gives
      us the currently centered item.
    */

    const index = Math.round(
      container.scrollTop / ITEM_HEIGHT
    );

    const safeIndex = Math.max(
      0,
      Math.min(index, times.length - 1)
    );

    const newTime = times[safeIndex];

    if (newTime && newTime !== selectedTime) {
      setSelectedTime(newTime);
    }
  };

  // ==========================================
  // Click a time
  // ==========================================

  const handleTimeClick = (time) => {
    setSelectedTime(time);
    scrollToTime(time);
  };

  // ==========================================
  // AM / PM
  // ==========================================

  const handlePeriodChange = (newPeriod) => {
    setPeriod(newPeriod);

    setTimeout(() => {
      scrollToTime(selectedTime, false);
    }, 50);
  };

  // ==========================================
  // Continue
  // Save delivery time through API
  // ==========================================

  const handleContinue = async () => {
    const deliveryTime = `${selectedTime} ${period}`;

    setLoading(true);
    setError("");

    try {
      /*
        First get the preferences already saved
        for the logged-in user.

        This prevents us from accidentally
        replacing profession/interests/voice/length.
      */

      const existingResponse = await fetch(
        "http://localhost:5000/api/preferences",
        {
          method: "GET",
          credentials: "include",
        }
      );

      let existingPreferences = {};

      if (existingResponse.ok) {
        const existingData = await existingResponse.json();

        existingPreferences =
          existingData.preferences || {};
      }

      /*
        Save the existing preferences together
        with the newly selected delivery time.
      */

      const response = await fetch(
        "http://localhost:5000/api/preferences",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...existingPreferences,
            deliveryTime,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to save delivery time"
        );
      }

      console.log(
        "Delivery time saved:",
        data.preferences
      );

      // Continue to the next onboarding step
      navigate("/stay-in");
    } catch (error) {
      console.error(
        "Error saving delivery time:",
        error
      );

      setError(
        error.message ||
          "Something went wrong while saving your time."
      );

      /*
        We don't navigate if the API fails.
        This lets the user see the error instead
        of silently losing their preference.
      */
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell>
      <div className="flex min-h-screen flex-col px-[17px] pb-5">

        {/* ======================================
            TOP BAR
        ======================================= */}

        <div className="flex items-center justify-between pt-[27px]">

          <NuzioLogo />

          <button
            type="button"
            onClick={handleContinue}
            disabled={loading}
            className="
              text-[7px]
              tracking-[0.15em]
              text-white/35
              transition
              hover:text-white/60
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            SKIP →
          </button>

        </div>


        {/* ======================================
            PROGRESS
        ======================================= */}

        <div className="mt-[25px] flex gap-[4px]">

          <div className="h-[3px] flex-1 rounded-full bg-gradient-to-r from-violet-500 to-emerald-400" />

          <div className="h-[3px] flex-1 rounded-full bg-gradient-to-r from-violet-500 to-emerald-400" />

          <div className="h-[3px] flex-1 rounded-full bg-gradient-to-r from-violet-500 to-emerald-400" />

          <div className="h-[3px] flex-1 rounded-full bg-gradient-to-r from-violet-500 to-emerald-400" />

          <div className="h-[3px] flex-1 rounded-full bg-white/[0.09]" />

          <div className="h-[3px] flex-1 rounded-full bg-white/[0.09]" />

        </div>


        {/* ======================================
            STEP
        ======================================= */}

        <p
          className="
            mt-[19px]
            text-[7px]
            font-medium
            tracking-[0.25em]
            text-violet-400
          "
        >
          STEP 4 OF 6
        </p>


        {/* ======================================
            HEADING
        ======================================= */}

        <section className="mt-[11px]">

          <h1
            className="
              text-[22px]
              font-semibold
              leading-[0.95]
              tracking-[-0.6px]
            "
          >
            When do you
          </h1>

          <p
            className="
              mt-[3px]
              font-serif
              text-[25px]
              italic
              leading-none
              text-violet-400
            "
          >
            want your brief?
          </p>

          <p
            className="
              mt-[12px]
              text-[9px]
              leading-relaxed
              text-white/40
            "
          >
            Nuzio will have your brief ready and waiting each morning.
          </p>

        </section>


        {/* ======================================
            AM / PM
        ======================================= */}

        <div className="mt-[16px] flex gap-[7px]">

          <button
            type="button"
            onClick={() => handlePeriodChange("AM")}
            className={`
              flex-1
              rounded-[9px]
              py-[10px]
              text-[9px]
              font-semibold
              transition-all

              ${
                period === "AM"
                  ? `
                    bg-violet-500
                    text-white
                    shadow-[0_5px_18px_rgba(124,58,237,0.18)]
                  `
                  : `
                    bg-white/[0.07]
                    text-white/40
                    hover:bg-white/[0.10]
                  `
              }
            `}
          >
            AM
          </button>


          <button
            type="button"
            onClick={() => handlePeriodChange("PM")}
            className={`
              flex-1
              rounded-[9px]
              py-[10px]
              text-[9px]
              font-semibold
              transition-all

              ${
                period === "PM"
                  ? `
                    bg-violet-500
                    text-white
                    shadow-[0_5px_18px_rgba(124,58,237,0.18)]
                  `
                  : `
                    bg-white/[0.07]
                    text-white/40
                    hover:bg-white/[0.10]
                  `
              }
            `}
          >
            PM
          </button>

        </div>


        {/* ======================================
            TIME PICKER

            IMPORTANT:
            This is fixed to 300px.

            The selection frame and the scroll
            container therefore have exactly the
            same center.
        ======================================= */}

        <div
          className="
            relative
            mt-[14px]
            h-[300px]
            shrink-0
          "
        >

          {/* ==================================
              CENTER SELECTION FRAME
          =================================== */}

          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              z-10
              h-[48px]
              w-[82%]
              -translate-x-1/2
              -translate-y-1/2
              rounded-[10px]
              border
              border-violet-500/20
              bg-violet-500/[0.08]
              shadow-[inset_0_0_20px_rgba(124,58,237,0.04)]
            "
          />


          {/* ==================================
              TOP FADE
          =================================== */}

          <div
            className="
              pointer-events-none
              absolute
              left-0
              right-0
              top-0
              z-20
              h-[85px]
              bg-gradient-to-b
              from-[#080808]
              via-[#080808]/80
              to-transparent
            "
          />


          {/* ==================================
              BOTTOM FADE
          =================================== */}

          <div
            className="
              pointer-events-none
              absolute
              bottom-0
              left-0
              right-0
              z-20
              h-[90px]
              bg-gradient-to-t
              from-[#080808]
              via-[#080808]/80
              to-transparent
            "
          />


          {/* ==================================
              SCROLL CONTAINER
          =================================== */}

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="
              relative
              z-0
              h-[300px]
              overflow-y-auto
              overscroll-contain
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
            "
          >

            {/* ==================================
                TOP SPACER
            =================================== */}

            <div
              style={{
                height: `calc(50% - ${ITEM_HEIGHT / 2}px)`,
              }}
            />


            {/* ==================================
                TIMES
            =================================== */}

            {times.map((time) => {

              const selected =
                time === selectedTime;

              return (
                <button
                  key={time}
                  type="button"
                  onClick={() => handleTimeClick(time)}
                  style={{
                    height: `${ITEM_HEIGHT}px`,
                  }}
                  className={`
                    relative
                    flex
                    w-full
                    shrink-0
                    items-center
                    justify-center
                    transition-all
                    duration-150

                    ${
                      selected
                        ? "text-white"
                        : "text-white/[0.18]"
                    }
                  `}
                >

                  {/* Time */}

                  <span
                    className={`
                      transition-all
                      duration-150

                      ${
                        selected
                          ? `
                            text-[30px]
                            font-semibold
                            tracking-[-1px]
                          `
                          : `
                            text-[15px]
                            font-medium
                          `
                      }
                    `}
                  >
                    {time}
                  </span>


                  {/* AM / PM */}

                  {selected && (
                    <span
                      className="
                        ml-[4px]
                        mt-[10px]
                        text-[7px]
                        font-semibold
                        text-violet-400
                      "
                    >
                      {period}
                    </span>
                  )}

                </button>
              );
            })}


            {/* ==================================
                BOTTOM SPACER
            =================================== */}

            <div
              style={{
                height: `calc(50% - ${ITEM_HEIGHT / 2}px)`,
              }}
            />

          </div>

        </div>


        {/* ======================================
            ERROR
        ======================================= */}

        {error && (
          <p
            className="
              mt-2
              text-center
              text-[8px]
              text-red-400/80
            "
          >
            {error}
          </p>
        )}


        {/* ======================================
            CONTINUE
        ======================================= */}

        <div className="pt-4">

          <button
            type="button"
            onClick={handleContinue}
            disabled={loading}
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
              active:scale-[0.99]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {loading
              ? "Saving..."
              : "Continue →"}
          </button>

        </div>

      </div>
    </AppShell>
  );
}

export default Time;