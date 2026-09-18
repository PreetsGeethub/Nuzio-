import { useEffect, useRef, useState } from "react";
import {
  Bell,
  Bookmark,
  ChevronRight,
  CirclePlay,
  Compass,
  MoreHorizontal,
  Pause,
  Play,
  Settings,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react";

import AppShell from "../components/AppShell";
import NuzioLogo from "../components/NuzioLogo";

// ==========================================
// API
// ==========================================

const API_URL = "http://localhost:5000";

// ==========================================
// CATEGORIES
// ==========================================

const categories = [
  "All",
  "AI & Tech",
  "Markets",
  "Startups",
  "Science",
];

// ==========================================
// STORIES
// Mock content for assignment prototype
// ==========================================

const stories = [
  {
    id: 1,
    category: "AI & Tech",
    title:
      "The next generation of AI tools is moving from chat interfaces into everyday workflows.",
    source: "THE VERGE",
    duration: "4 MIN",
    time: "4:47",
    tag: "TOP RATED",
  },
  {
    id: 2,
    category: "Markets",
    title:
      "Markets react as investors reassess the next phase of the global economy.",
    source: "REUTERS",
    duration: "3 MIN",
    time: "3:42",
    tag: "MARKETS",
  },
  {
    id: 3,
    category: "Startups",
    title:
      "Indian startups are building a new generation of AI-first products.",
    source: "TECHCRUNCH",
    duration: "5 MIN",
    time: "5:18",
    tag: "STARTUPS",
  },
  {
    id: 4,
    category: "Science",
    title:
      "Scientists uncover new clues about how advanced models reason.",
    source: "NATURE",
    duration: "3 MIN",
    time: "3:54",
    tag: "SCIENCE",
  },
  {
    id: 5,
    category: "AI & Tech",
    title:
      "AI is becoming increasingly integrated into the tools people use every day.",
    source: "WIRED",
    duration: "4 MIN",
    time: "4:12",
    tag: "AI & TECH",
  },
  {
    id: 6,
    category: "Markets",
    title:
      "Technology stocks remain in focus as investors watch earnings and rates.",
    source: "BLOOMBERG",
    duration: "3 MIN",
    time: "3:36",
    tag: "MARKETS",
  },
];

// ==========================================
// AUDIO WAVEFORM
// ==========================================

const waveform = [
  8, 13, 21, 12, 29, 17, 9, 15,
  24, 11, 35, 18, 12, 27, 42, 17,
  24, 13, 8, 19, 31, 14, 27, 11,
  36, 20, 14, 25, 10, 18, 28, 12,
  32, 18, 11, 25, 15, 9, 20, 13,
];

// ==========================================
// NEWS
// ==========================================

function News() {
  const [activeCategory, setActiveCategory] =
    useState("All");

  const [currentStoryIndex, setCurrentStoryIndex] =
    useState(0);

  const [isPlaying, setIsPlaying] =
    useState(true);

  const [progress, setProgress] =
    useState(31);

  const [playbackSpeed, setPlaybackSpeed] =
    useState(1);

  const [saved, setSaved] =
    useState(false);

  // ------------------------------------------
  // User data
  // ------------------------------------------

  const [user, setUser] = useState(null);

  const [preferences, setPreferences] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const progressRef = useRef(null);

  // ==========================================
  // Load authenticated user + preferences
  // ==========================================

  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);
        setError("");

        // --------------------------------------
        // Get current user
        // --------------------------------------

        const userResponse = await fetch(
          `${API_URL}/api/auth/me`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const userData =
          await userResponse.json();

        if (!userResponse.ok) {
          throw new Error(
            userData.message ||
              "Unable to load your account."
          );
        }

        setUser(userData.user);

        // --------------------------------------
        // Get preferences
        // --------------------------------------

        const preferencesResponse =
          await fetch(
            `${API_URL}/api/preferences`,
            {
              method: "GET",
              credentials: "include",
            }
          );

        const preferencesData =
          await preferencesResponse.json();

        if (!preferencesResponse.ok) {
          throw new Error(
            preferencesData.message ||
              "Unable to load your preferences."
          );
        }

        setPreferences(
          preferencesData.preferences || {}
        );
      } catch (error) {
        console.error(
          "News initialization error:",
          error
        );

        setError(
          error.message ||
            "Unable to load your personalized brief."
        );
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  // ==========================================
  // Filter stories
  // ==========================================

  const filteredStories =
    activeCategory === "All"
      ? stories
      : stories.filter(
          (story) =>
            story.category ===
            activeCategory
        );

  // ==========================================
  // Current story
  // ==========================================

  const currentStory =
    filteredStories[currentStoryIndex] ||
    filteredStories[0];

  // ==========================================
  // Keep index valid when category changes
  // ==========================================

  useEffect(() => {
    setCurrentStoryIndex(0);
    setProgress(0);
  }, [activeCategory]);

  // ==========================================
  // Simulated audio progress
  // ==========================================

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setProgress((current) => {
        if (current >= 100) {
          return 0;
        }

        return current + 0.35;
      });
    }, 1000);

    return () =>
      clearInterval(interval);
  }, [isPlaying]);

  // ==========================================
  // Previous story
  // ==========================================

  const previousStory = () => {
    setCurrentStoryIndex((current) => {
      if (current <= 0) {
        return filteredStories.length - 1;
      }

      return current - 1;
    });

    setProgress(0);
  };

  // ==========================================
  // Next story
  // ==========================================

  const nextStory = () => {
    setCurrentStoryIndex((current) => {
      if (
        current >=
        filteredStories.length - 1
      ) {
        return 0;
      }

      return current + 1;
    });

    setProgress(0);
  };

  // ==========================================
  // Change playback speed
  // ==========================================

  const changeSpeed = () => {
    const speeds = [1, 1.25, 1.5, 2];

    const currentIndex =
      speeds.indexOf(playbackSpeed);

    const nextIndex =
      (currentIndex + 1) %
      speeds.length;

    setPlaybackSpeed(
      speeds[nextIndex]
    );
  };

  // ==========================================
  // Click progress bar
  // ==========================================

  const handleProgressClick = (event) => {
    if (!progressRef.current) {
      return;
    }

    const rect =
      progressRef.current.getBoundingClientRect();

    const clickPosition =
      event.clientX - rect.left;

    const percentage =
      (clickPosition / rect.width) * 100;

    setProgress(
      Math.max(
        0,
        Math.min(100, percentage)
      )
    );
  };

  // ==========================================
  // Loading
  // ==========================================

  if (loading) {
    return (
      <AppShell>
        <div className="flex min-h-screen items-center justify-center bg-[#080808]">

          <div className="text-center">

            <div
              className="
                mx-auto
                h-8
                w-8
                animate-spin
                rounded-full
                border-2
                border-white/10
                border-t-violet-400
              "
            />

            <p className="mt-4 text-[8px] tracking-[0.18em] text-white/35">
              PREPARING YOUR BRIEF
            </p>

          </div>

        </div>
      </AppShell>
    );
  }

  // ==========================================
  // Error
  // ==========================================

  if (error) {
    return (
      <AppShell>
        <div className="flex min-h-screen items-center justify-center bg-[#080808] px-5">

          <div className="w-full max-w-[430px] text-center">

            <NuzioLogo />

            <h1 className="mt-8 text-[18px] font-semibold">
              Couldn't load your brief.
            </h1>

            <p className="mt-2 text-[9px] leading-relaxed text-white/40">
              {error}
            </p>

            <button
              type="button"
              onClick={() =>
                window.location.reload()
              }
              className="
                mt-6
                w-full
                rounded-[11px]
                bg-gradient-to-r
                from-violet-400
                to-violet-600
                py-3.5
                text-[10px]
                font-semibold
              "
            >
              Try again →
            </button>

          </div>

        </div>
      </AppShell>
    );
  }

  // ==========================================
  // Dynamic user values
  // ==========================================

  const userName =
    user?.name || "there";

  const voice =
    preferences?.voice || "Aria";

  const selectedInterests =
    preferences?.interests || [];

  const storyCount =
    stories.length;

  const totalDuration =
    preferences?.length || "5 min";

  // ==========================================
  // Main UI
  // ==========================================

  return (
    <AppShell>

      <div
        className="
          relative
          flex
          min-h-screen
          flex-col
          overflow-hidden
          bg-[#080808]
        "
      >

        {/* ======================================
            SUBTLE BACKGROUND GLOW
        ======================================= */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-[90px]
            h-[320px]
            w-[320px]
            -translate-x-1/2
            rounded-full
            bg-violet-600/[0.045]
            blur-[110px]
          "
        />


        {/* ======================================
            HEADER
        ======================================= */}

        <header
          className="
            relative
            z-20
            flex
            items-center
            justify-between
            border-b
            border-white/[0.06]
            px-[17px]
            pb-[11px]
            pt-[24px]
          "
        >

          <NuzioLogo />

          <div className="flex items-center gap-[7px]">

            {/* Utility */}

            <button
              type="button"
              aria-label="More options"
              className="
                flex
                h-[29px]
                w-[29px]
                items-center
                justify-center
                rounded-full
                border
                border-white/[0.08]
                bg-white/[0.04]
              "
            >
              <MoreHorizontal
                size={13}
                className="text-white/50"
              />
            </button>


            {/* Notification */}

            <button
              type="button"
              aria-label="Notifications"
              className="
                relative
                flex
                h-[29px]
                w-[29px]
                items-center
                justify-center
                rounded-full
                border
                border-white/[0.08]
                bg-white/[0.04]
              "
            >

              <Bell
                size={12}
                className="text-white/60"
              />

              <span
                className="
                  absolute
                  right-[5px]
                  top-[5px]
                  h-[4px]
                  w-[4px]
                  rounded-full
                  bg-violet-400
                "
              />

            </button>

          </div>

        </header>


        {/* ======================================
            CATEGORY FILTER
        ======================================= */}

        <div
          className="
            relative
            z-20
            flex
            gap-[6px]
            overflow-x-auto
            border-b
            border-white/[0.06]
            px-[17px]
            py-[9px]
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          "
        >

          {categories.map((category) => {

            const active =
              activeCategory ===
              category;

            return (
              <button
                key={category}
                type="button"
                onClick={() =>
                  setActiveCategory(
                    category
                  )
                }
                className={`
                  shrink-0
                  rounded-full
                  px-[13px]
                  py-[6px]
                  text-[7px]
                  font-medium
                  transition-all

                  ${
                    active
                      ? `
                        bg-emerald-400
                        text-[#07100d]
                        shadow-[0_0_14px_rgba(52,211,153,0.12)]
                      `
                      : `
                        border
                        border-white/[0.07]
                        bg-white/[0.045]
                        text-white/45
                      `
                  }
                `}
              >
                {category}
              </button>
            );
          })}

        </div>


        {/* ======================================
            MAIN CONTENT
        ======================================= */}

        <main
          className="
            relative
            z-10
            flex-1
            overflow-y-auto
            px-[17px]
            pb-[110px]
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          "
        >

          {/* ====================================
              BRIEF HEADER
          ==================================== */}

          <section className="pt-[15px]">

            <p
              className="
                text-[6px]
                font-medium
                tracking-[0.22em]
                text-violet-400
              "
            >
              MORNING BRIEF
            </p>

            <h1
              className="
                mt-[6px]
                font-serif
                text-[20px]
                leading-[1.02]
                text-white
              "
            >
              Good morning,{" "}
              {userName} —
            </h1>

            <p
              className="
                mt-[2px]
                font-serif
                text-[21px]
                italic
                leading-none
                text-violet-400
              "
            >
              {storyCount} things.
            </p>


            {/* Audio status */}

            <div
              className="
                mt-[9px]
                flex
                flex-wrap
                items-center
                gap-[5px]
                text-[7px]
                text-white/35
              "
            >

              <span
                className="
                  h-[6px]
                  w-[6px]
                  rounded-full
                  bg-emerald-400
                  shadow-[0_0_8px_rgba(52,211,153,0.7)]
                "
              />

              <span className="font-medium text-emerald-400">
                Audio live
              </span>

              <span>·</span>

              <span>
                Voice:{" "}
                <span className="text-white/60">
                  {voice}
                </span>
              </span>

              <span>·</span>

              <span>
                {storyCount} stories
              </span>

              <span>·</span>

              <span>
                {totalDuration}
              </span>

            </div>

          </section>


          {/* ====================================
              PERSONALIZED INTERESTS
          ==================================== */}

          {selectedInterests.length > 0 && (
            <div
              className="
                mt-[10px]
                flex
                gap-[5px]
                overflow-x-auto
                [scrollbar-width:none]
                [&::-webkit-scrollbar]:hidden
              "
            >

              {selectedInterests
                .slice(0, 5)
                .map((interest) => (
                  <span
                    key={interest}
                    className="
                      shrink-0
                      rounded-full
                      border
                      border-violet-500/15
                      bg-violet-500/[0.06]
                      px-[8px]
                      py-[4px]
                      text-[6px]
                      text-violet-300/70
                    "
                  >
                    {interest}
                  </span>
                ))}

            </div>
          )}


          {/* ====================================
              STORY CARD
          ==================================== */}

          <article
            className="
              mt-[13px]
              rounded-[17px]
              border
              border-white/[0.09]
              bg-white/[0.055]
              p-[12px]
              shadow-[0_15px_50px_rgba(0,0,0,0.22)]
            "
          >

            {/* Story header */}

            <div className="flex items-center">

              <span
                className="
                  rounded-[7px]
                  border
                  border-violet-500/20
                  bg-violet-500/[0.10]
                  px-[8px]
                  py-[5px]
                  text-[6px]
                  font-medium
                  tracking-[0.12em]
                  text-violet-300
                "
              >
                ✦ {currentStory.tag} · TODAY
              </span>

              <span
                className="
                  ml-auto
                  text-[7px]
                  font-medium
                  text-white/25
                "
              >
                {String(
                  currentStoryIndex + 1
                ).padStart(2, "0")}
                {" / "}
                {String(
                  filteredStories.length
                ).padStart(2, "0")}
              </span>

            </div>


            {/* Story title */}

            <h2
              className="
                mt-[14px]
                font-serif
                text-[17px]
                font-medium
                leading-[1.05]
                tracking-[-0.3px]
                text-white
              "
            >
              {currentStory.title}
            </h2>


            {/* Metadata */}

            <div
              className="
                mt-[14px]
                flex
                items-center
                text-[6px]
                tracking-[0.06em]
                text-white/30
              "
            >

              <span className="font-semibold text-violet-400">
                {currentStory.source}
              </span>

              <span className="mx-[5px]">
                ·
              </span>

              <span>
                {currentStory.duration}
              </span>

              <span className="mx-[5px]">
                ·
              </span>

              <button
                type="button"
                className="text-emerald-400"
              >
                SOURCE ↗
              </button>

              <button
                type="button"
                onClick={() =>
                  setSaved(!saved)
                }
                className="
                  ml-auto
                  flex
                  items-center
                  gap-[3px]
                  text-white/30
                  transition
                  hover:text-white/60
                "
              >

                <Bookmark
                  size={8}
                  fill={
                    saved
                      ? "currentColor"
                      : "none"
                  }
                />

                SAVE

              </button>

            </div>


            {/* =================================
                ANIMATED WAVEFORM
            ================================== */}

            <div
              ref={progressRef}
              onClick={
                handleProgressClick
              }
              className="
                relative
                mt-[13px]
                h-[47px]
                cursor-pointer
              "
            >

              {/* Baseline */}

              <div
                className="
                  absolute
                  bottom-[9px]
                  left-0
                  right-0
                  h-[1px]
                  bg-white/[0.08]
                "
              />


              {/* Bars */}

              <div
                className="
                  absolute
                  inset-x-0
                  bottom-[10px]
                  flex
                  h-[35px]
                  items-end
                  gap-[2px]
                "
              >

                {waveform.map(
                  (height, index) => {

                    const barProgress =
                      (index /
                        waveform.length) *
                      100;

                    const active =
                      barProgress <=
                      progress;

                    const animationDuration =
                      `${0.45 +
                        (index % 5) *
                          0.12}s`;

                    const animationDelay =
                      `${(index % 7) *
                        0.06}s`;

                    return (
                      <div
                        key={index}
                        className={`
                          relative
                          flex-1
                          rounded-t-[2px]
                          origin-bottom
                          transition-all
                          duration-200

                          ${
                            active
                              ? "bg-violet-400"
                              : "bg-white/[0.12]"
                          }

                          ${
                            isPlaying
                              ? "animate-wave"
                              : ""
                          }
                        `}
                        style={{
                          height: `${height}px`,
                          animationDuration,
                          animationDelay,
                        }}
                      />
                    );
                  }
                )}

              </div>


              {/* Playback position */}

              <div
                className="
                  pointer-events-none
                  absolute
                  bottom-[9px]
                  left-0
                  h-[1.5px]
                  rounded-full
                  bg-violet-400
                  transition-all
                  duration-200
                "
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>


            {/* Time */}

            <div
              className="
                flex
                items-center
                justify-between
                text-[6px]
                text-white/25
              "
            >

              <span>
                02:14
              </span>

              <span>
                -03:47
              </span>

            </div>


            {/* =================================
                PLAYER CONTROLS
            ================================== */}

            <div
              className="
                mt-[11px]
                flex
                items-center
                justify-between
              "
            >

              {/* Previous */}

              <button
                type="button"
                onClick={
                  previousStory
                }
                className="
                  flex
                  h-[34px]
                  w-[34px]
                  items-center
                  justify-center
                  rounded-full
                  bg-white/[0.08]
                  text-white/55
                  transition
                  hover:bg-white/[0.12]
                "
              >

                <SkipBack
                  size={12}
                  fill="currentColor"
                />

              </button>


              {/* Main play */}

              <button
                type="button"
                onClick={() =>
                  setIsPlaying(
                    !isPlaying
                  )
                }
                className="
                  flex
                  h-[49px]
                  w-[49px]
                  items-center
                  justify-center
                  rounded-full
                  bg-violet-500
                  text-white
                  shadow-[0_0_25px_rgba(124,58,237,0.45)]
                  transition
                  hover:brightness-110
                  active:scale-95
                "
              >

                {isPlaying ? (
                  <Pause
                    size={17}
                    fill="currentColor"
                  />
                ) : (
                  <Play
                    size={17}
                    fill="currentColor"
                    className="ml-[2px]"
                  />
                )}

              </button>


              {/* Next */}

              <button
                type="button"
                onClick={
                  nextStory
                }
                className="
                  flex
                  h-[34px]
                  w-[34px]
                  items-center
                  justify-center
                  rounded-full
                  bg-white/[0.08]
                  text-white/55
                  transition
                  hover:bg-white/[0.12]
                "
              >

                <SkipForward
                  size={12}
                  fill="currentColor"
                />

              </button>


              {/* Speed */}

              <button
                type="button"
                onClick={
                  changeSpeed
                }
                className="
                  flex
                  h-[30px]
                  min-w-[34px]
                  items-center
                  justify-center
                  rounded-full
                  bg-white/[0.07]
                  px-[6px]
                  text-[7px]
                  font-medium
                  text-white/55
                  transition
                  hover:bg-white/[0.11]
                "
              >
                {playbackSpeed}×
              </button>

            </div>

          </article>


          {/* ====================================
              NOW NARRATING
          ==================================== */}

          <div
            className="
              mt-[10px]
              flex
              items-center
              rounded-[12px]
              border
              border-emerald-500/10
              bg-emerald-500/[0.045]
              px-[10px]
              py-[9px]
            "
          >

            <div
              className="
                flex
                h-[20px]
                w-[20px]
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-emerald-400/[0.12]
              "
            >
              <Volume2
                size={10}
                className="text-emerald-400"
              />
            </div>

            <div className="ml-[7px] min-w-0">

              <p
                className="
                  truncate
                  text-[7px]
                  font-medium
                  text-emerald-400
                "
              >
                Now narrating —{" "}
                {currentStory.title}
              </p>

            </div>

          </div>


          {/* ====================================
              NEXT STORIES
          ==================================== */}

          <section className="mt-[15px]">

            <div className="flex items-center justify-between">

              <p
                className="
                  text-[6px]
                  font-medium
                  tracking-[0.2em]
                  text-white/25
                "
              >
                UP NEXT
              </p>

              <span className="text-[6px] text-white/20">
                {Math.max(
                  0,
                  filteredStories.length - 1
                )}{" "}
                stories
              </span>

            </div>


            <div className="mt-[7px] space-y-[6px]">

              {filteredStories
                .filter(
                  (_, index) =>
                    index !==
                    currentStoryIndex
                )
                .slice(0, 2)
                .map((story) => (

                  <button
                    key={story.id}
                    type="button"
                    onClick={() => {

                      const index =
                        filteredStories.findIndex(
                          (item) =>
                            item.id ===
                            story.id
                        );

                      setCurrentStoryIndex(
                        index
                      );

                      setProgress(0);

                    }}
                    className="
                      flex
                      w-full
                      items-center
                      rounded-[10px]
                      border
                      border-white/[0.06]
                      bg-white/[0.035]
                      px-[9px]
                      py-[8px]
                      text-left
                    "
                  >

                    <div
                      className="
                        flex
                        h-[25px]
                        w-[25px]
                        shrink-0
                        items-center
                        justify-center
                        rounded-[7px]
                        bg-white/[0.07]
                      "
                    >
                      <CirclePlay
                        size={12}
                        className="text-white/45"
                      />
                    </div>

                    <div className="ml-[8px] min-w-0">

                      <p
                        className="
                          truncate
                          text-[7px]
                          font-medium
                          text-white/70
                        "
                      >
                        {story.title}
                      </p>

                      <p className="mt-[2px] text-[6px] text-white/25">
                        {story.source} ·{" "}
                        {story.duration}
                      </p>

                    </div>

                    <ChevronRight
                      size={11}
                      className="
                        ml-auto
                        shrink-0
                        text-white/20
                      "
                    />

                  </button>

                ))}

            </div>

          </section>

        </main>


        {/* ======================================
            BOTTOM NAVIGATION
        ======================================= */}

        <nav
          className="
            absolute
            bottom-0
            left-0
            right-0
            z-30
            border-t
            border-white/[0.06]
            bg-[#080808]/95
            px-[30px]
            pb-[13px]
            pt-[9px]
            backdrop-blur-xl
          "
        >

          <div className="flex items-center justify-between">

            {/* Discover */}

            <button
              type="button"
              className="
                flex
                flex-col
                items-center
                gap-[4px]
                text-emerald-400
              "
            >

              <Compass size={12} />

              <span
                className="
                  text-[5px]
                  tracking-[0.12em]
                "
              >
                DISCOVER
              </span>

            </button>


            {/* Floating player */}

            <button
              type="button"
              onClick={() =>
                setIsPlaying(
                  !isPlaying
                )
              }
              className="
                relative
                -mt-[28px]
                flex
                h-[54px]
                w-[54px]
                items-center
                justify-center
                rounded-full
                border
                border-emerald-400
                bg-violet-500
                text-white
                shadow-[0_0_28px_rgba(124,58,237,0.45)]
              "
            >

              {isPlaying ? (
                <Pause
                  size={16}
                  fill="currentColor"
                />
              ) : (
                <Play
                  size={16}
                  fill="currentColor"
                  className="ml-[2px]"
                />
              )}

            </button>


            {/* Settings */}

            <button
              type="button"
              className="
                flex
                flex-col
                items-center
                gap-[4px]
                text-white/30
              "
            >

              <Settings size={12} />

              <span
                className="
                  text-[5px]
                  tracking-[0.12em]
                "
              >
                SETTINGS
              </span>

            </button>

          </div>

        </nav>

      </div>

    </AppShell>
  );
}

export default News;