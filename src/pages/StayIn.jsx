import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  Sun,
  Zap,
  Pin,
} from "lucide-react";

import AppShell from "../components/AppShell";
import NuzioLogo from "../components/NuzioLogo";

function StayIn() {
  const navigate = useNavigate();

  const [notificationStatus, setNotificationStatus] =
    useState("idle");

  /*
    Save the notification preference while preserving
    everything collected in the previous onboarding steps.

    localStorage structure:

    {
      profession: "...",
      interests: [...],
      voice: "...",
      length: "...",
      deliveryTime: "...",
      notifications: true / false
    }
  */
  const saveNotificationPreference = (notifications) => {
    try {
      const existingData = JSON.parse(
        localStorage.getItem("nuzioOnboarding") || "{}"
      );

      const updatedData = {
        ...existingData,
        notifications,
      };

      localStorage.setItem(
        "nuzioOnboarding",
        JSON.stringify(updatedData)
      );
    } catch (error) {
      console.error(
        "Failed to save notification preference:",
        error
      );
    }
  };

  const requestNotifications = async () => {
    if ("Notification" in window) {
      try {
        const permission =
          await Notification.requestPermission();

        const notifications = permission === "granted";

        setNotificationStatus(permission);

        saveNotificationPreference(notifications);

        navigate("/ready");
      } catch (error) {
        console.error(error);

        /*
          If the browser notification API fails,
          we still let the user continue.
        */
        saveNotificationPreference(false);
        navigate("/ready");
      }

      return;
    }

    /*
      Browsers without Notification API support.
    */
    saveNotificationPreference(false);
    navigate("/ready");
  };

  const handleNotNow = () => {
    setNotificationStatus("skipped");

    saveNotificationPreference(false);

    navigate("/ready");
  };

  return (
    <AppShell>
      <div className="flex min-h-screen flex-col px-[17px] pb-5 sm:px-6 lg:mx-auto lg:max-w-[620px] lg:px-0">

        {/* ======================================
            TOP BAR
        ======================================= */}

        <div className="flex items-center justify-between pt-[27px] sm:pt-8">
          <NuzioLogo />

          <button
            type="button"
            onClick={handleNotNow}
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


        {/* ======================================
            PROGRESS
        ======================================= */}

        <div className="mt-[25px] flex gap-[4px] sm:mt-7">
          <div className="h-[3px] flex-1 rounded-full bg-gradient-to-r from-violet-500 to-emerald-400" />

          <div className="h-[3px] flex-1 rounded-full bg-gradient-to-r from-violet-500 to-emerald-400" />

          <div className="h-[3px] flex-1 rounded-full bg-gradient-to-r from-violet-500 to-emerald-400" />

          <div className="h-[3px] flex-1 rounded-full bg-gradient-to-r from-violet-500 to-emerald-400" />

          <div className="h-[3px] flex-1 rounded-full bg-gradient-to-r from-violet-500 to-emerald-400" />

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
            sm:text-[8px]
          "
        >
          STEP 5 OF 6
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
              sm:text-[28px]
            "
          >
            Stay in
          </h1>

          <p
            className="
              mt-[3px]
              font-serif
              text-[25px]
              italic
              leading-none
              text-violet-400
              sm:text-[31px]
            "
          >
            the loop.
          </p>

          <p
            className="
              mt-[12px]
              text-[9px]
              leading-relaxed
              text-white/40
              sm:text-[11px]
            "
          >
            Turn on notifications so you never miss your brief.
          </p>
        </section>


        {/* ======================================
            NOTIFICATION PREVIEW
        ======================================= */}

        <section
          className="
            mt-[15px]
            rounded-[12px]
            border
            border-white/[0.08]
            bg-white/[0.055]
            p-[12px]
            sm:mt-5
            sm:p-4
          "
        >
          <div className="flex items-center">
            <div
              className="
                flex
                h-[25px]
                w-[25px]
                items-center
                justify-center
                rounded-[7px]
                bg-violet-500/[0.18]
                sm:h-8
                sm:w-8
              "
            >
              <Bell
                size={14}
                strokeWidth={2}
                fill="currentColor"
                className="text-violet-300 sm:h-4 sm:w-4"
              />
            </div>

            <div className="ml-[8px]">
              <p className="text-[8px] font-semibold text-white sm:text-[10px]">
                Nuzio
              </p>
            </div>

            <span className="ml-auto text-[6px] text-white/30 sm:text-[7px]">
              NOW
            </span>
          </div>

          <div className="mt-[10px]">
            <p className="text-[9px] font-semibold text-white sm:text-[11px]">
              ☀️ Your morning brief is ready
            </p>

            <p className="mt-[3px] text-[7px] leading-relaxed text-white/35 sm:text-[9px]">
              6 stories · AI & Tech, Markets, Startups · Voice:
              Aria · 18:30
            </p>
          </div>
        </section>


        {/* ======================================
            WHAT YOU'LL RECEIVE
        ======================================= */}

        <section className="mt-[17px] sm:mt-6">
          <p
            className="
              text-[7px]
              font-medium
              tracking-[0.2em]
              text-violet-400
              sm:text-[8px]
            "
          >
            WHAT YOU'LL RECEIVE
          </p>


          {/* Morning brief */}

          <div
            className="
              mt-[10px]
              flex
              items-center
              rounded-[11px]
              border
              border-white/[0.08]
              bg-white/[0.045]
              px-[11px]
              py-[10px]
              sm:px-4
              sm:py-3
            "
          >
            <div
              className="
                flex
                h-[31px]
                w-[31px]
                shrink-0
                items-center
                justify-center
                rounded-[8px]
                bg-emerald-500/[0.13]
                sm:h-9
                sm:w-9
              "
            >
              <Sun
                size={16}
                strokeWidth={2}
                className="text-emerald-400"
              />
            </div>

            <div className="ml-[9px] min-w-0">
              <p className="text-[8px] font-semibold text-white sm:text-[10px]">
                Morning brief ready
              </p>

              <p className="mt-[2px] text-[7px] text-white/30 sm:text-[8px]">
                Your daily audio briefing is waiting
              </p>
            </div>

            <span className="ml-auto whitespace-nowrap text-[6px] font-medium text-emerald-400 sm:text-[7px]">
              Daily · 7:00 AM
            </span>
          </div>


          {/* Breaking story */}

          <div
            className="
              mt-[7px]
              flex
              items-center
              rounded-[11px]
              border
              border-white/[0.08]
              bg-white/[0.045]
              px-[11px]
              py-[10px]
              sm:px-4
              sm:py-3
            "
          >
            <div
              className="
                flex
                h-[31px]
                w-[31px]
                shrink-0
                items-center
                justify-center
                rounded-[8px]
                bg-violet-500/[0.13]
                sm:h-9
                sm:w-9
              "
            >
              <Zap
                size={16}
                strokeWidth={2}
                className="text-violet-400"
              />
            </div>

            <div className="ml-[9px] min-w-0">
              <p className="text-[8px] font-semibold text-white sm:text-[10px]">
                Breaking story
              </p>

              <p className="mt-[2px] text-[7px] text-white/30 sm:text-[8px]">
                A major story just broke in your niches
              </p>
            </div>

            <span className="ml-auto whitespace-nowrap text-[6px] font-medium text-violet-400 sm:text-[7px]">
              When it happens
            </span>
          </div>


          {/* Weekly digest */}

          <div
            className="
              mt-[7px]
              flex
              items-center
              rounded-[11px]
              border
              border-white/[0.08]
              bg-white/[0.045]
              px-[11px]
              py-[10px]
              sm:px-4
              sm:py-3
            "
          >
            <div
              className="
                flex
                h-[31px]
                w-[31px]
                shrink-0
                items-center
                justify-center
                rounded-[8px]
                bg-blue-500/[0.12]
                sm:h-9
                sm:w-9
              "
            >
              <Pin
                size={16}
                strokeWidth={2}
                className="text-blue-400"
              />
            </div>

            <div className="ml-[9px] min-w-0">
              <p className="text-[8px] font-semibold text-white sm:text-[10px]">
                Weekly digest
              </p>

              <p className="mt-[2px] text-[7px] text-white/30 sm:text-[8px]">
                The most-saved stories from this week
              </p>
            </div>

            <span className="ml-auto whitespace-nowrap text-[6px] font-medium text-blue-400 sm:text-[7px]">
              Sundays · 9:00 AM
            </span>
          </div>
        </section>


        {/* ======================================
            ACTIONS
        ======================================= */}

        <div className="mt-auto pt-[18px] sm:pt-8">
          <button
            type="button"
            onClick={requestNotifications}
            disabled={notificationStatus === "denied"}
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
              sm:h-12
              sm:text-[11px]
            "
          >
            {notificationStatus === "denied"
              ? "Notifications blocked"
              : "Allow notifications"}
          </button>

          <button
            type="button"
            onClick={handleNotNow}
            className="
              mt-[7px]
              h-[38px]
              w-full
              rounded-[11px]
              border
              border-white/[0.08]
              bg-white/[0.025]
              text-[9px]
              text-white/40
              transition
              hover:bg-white/[0.05]
              hover:text-white/60
              sm:h-11
              sm:text-[10px]
            "
          >
            Not now
          </button>
        </div>
      </div>
    </AppShell>
  );
}

export default StayIn;