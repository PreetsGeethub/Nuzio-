import { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  Clock3,
  Languages,
  MapPin,
  Mic2,
  Timer,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://nuzio-production.up.railway.app";

export default function Ready() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [preferences, setPreferences] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadAndSavePreferences = async () => {
      try {
        setLoading(true);
        setError("");

        // Get logged-in user
        const userResponse = await fetch(`${API_URL}/api/auth/me`, {
          credentials: "include",
        });

        if (!userResponse.ok) {
          throw new Error("Session expired. Please login again.");
        }

        const userData = await userResponse.json();
        setUser(userData.user);

        // Get onboarding data stored locally
        const stored = localStorage.getItem("nuzioOnboarding");
        const onboardingData = stored ? JSON.parse(stored) : {};

        const finalPreferences = {
          language: onboardingData.language || "English",
          locationEnabled: onboardingData.locationEnabled ?? false,
          profession: onboardingData.profession || null,
          interests: onboardingData.interests || [],
          voice: onboardingData.voice || "Aria",
          length: onboardingData.length || "5 min",
          deliveryTime: onboardingData.deliveryTime || "7:00 AM",
          notifications: onboardingData.notifications ?? false,
        };

        // Save complete preferences
        const saveResponse = await fetch(`${API_URL}/api/preferences`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(finalPreferences),
        });

        if (!saveResponse.ok) {
          throw new Error("Could not save your preferences.");
        }

        const savedData = await saveResponse.json();

        setPreferences(savedData.preferences || finalPreferences);

        // Onboarding data is no longer needed
        localStorage.removeItem("nuzioOnboarding");
      } catch (err) {
        console.error(err);
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
        setSaving(false);
      }
    };

    loadAndSavePreferences();
  }, []);

  const getName = () => {
    if (!user?.name) return "there";

    return user.name.split(" ")[0];
  };

  const getInterests = () => {
    if (!preferences?.interests?.length) return "Your selected topics";

    if (preferences.interests.length <= 2) {
      return preferences.interests.join(", ");
    }

    return `${preferences.interests.slice(0, 2).join(", ")} +${
      preferences.interests.length - 2
    }`;
  };

  const getVoice = () => {
    const voice = preferences?.voice || "Aria";

    const descriptions = {
      Aria: "British, warm",
      Kai: "Calm, clear",
      Meera: "Indian, warm",
    };

    return `${voice} — ${descriptions[voice] || "Warm, natural"}`;
  };

  const getLength = () => {
    const length = preferences?.length || "5 min";

    // Match screenshot style
    if (length === "Custom") {
      return "Custom";
    }

    return length;
  };

  const getDelivery = () => {
    const time = preferences?.deliveryTime || "7:00 AM";

    return `Daily at ${time}`;
  };

  const handleStartListening = () => {
    if (saving || !preferences) return;

    navigate("/news");
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#080909] text-white flex items-center justify-center px-5">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 rounded-full border-2 border-[#36d49b] border-t-transparent animate-spin" />
          <p className="text-sm text-white/55">
            Preparing your personalized brief...
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#080909] text-white flex items-center justify-center px-5">
        <div className="w-full max-w-sm text-center">
          <p className="text-sm text-red-400 mb-5">{error}</p>

          <button
            onClick={() => navigate("/login")}
            className="w-full h-12 rounded-xl bg-white text-black font-medium"
          >
            Back to login
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#080909] text-white flex justify-center overflow-hidden">
      {/* Mobile device / main content */}
      <div className="relative w-full max-w-[390px] min-h-screen overflow-hidden bg-[#090a0a]">
        {/* Subtle background glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-[190px] -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-[#19b77d]/10 blur-[100px]" />

          <div className="absolute left-[-100px] top-[500px] w-[220px] h-[220px] rounded-full bg-[#183c30]/10 blur-[90px]" />

          <div className="absolute right-[-100px] bottom-[20px] w-[220px] h-[220px] rounded-full bg-[#233c64]/10 blur-[100px]" />
        </div>

        {/* Content */}
        <div className="relative z-10 min-h-screen px-5 pt-[58px] pb-5 flex flex-col">
          {/* ALL SET */}
          <div className="text-[9px] tracking-[0.24em] font-medium text-[#35d99a] uppercase">
            ✓ &nbsp;ALL SET
          </div>

          {/* Success icon */}
          <div className="mt-[15px] flex justify-center">
            <div className="relative flex items-center justify-center w-[70px] h-[70px] rounded-full border-[2px] border-[#36d89c]">
              {/* Blue/purple upper-left accent */}
              <div className="absolute inset-[-2px] rounded-full border-[2px] border-transparent border-t-[#6b5cff] border-l-[#6b5cff]" />

              <svg
                width="31"
                height="31"
                viewBox="0 0 31 31"
                fill="none"
                className="relative"
              >
                <path
                  d="M7 16L12.5 21.5L24 9.5"
                  stroke="#38D99C"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Heading */}
          <div className="mt-[12px] text-center">
            <h1 className="text-[24px] leading-[1.05] font-semibold tracking-[-0.6px]">
              You're ready,
            </h1>

            <div
              className="mt-[2px] text-[27px] leading-none text-[#35d99a]"
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontStyle: "italic",
              }}
            >
              {getName()}.
            </div>
          </div>

          {/* Description */}
          <div className="mt-[12px] text-center">
            <p className="text-[9.5px] leading-[1.65] text-white/45">
              Your first brief will be ready tomorrow at 7:00 AM.
              <br />
              We're already curating.
            </p>
          </div>

          {/* Profile title */}
          <div className="mt-[45px]">
            <p className="text-[8px] tracking-[0.13em] uppercase text-[#695cff] font-semibold">
              YOUR BRIEF PROFILE
            </p>
          </div>

          {/* Profile cards */}
          <div className="mt-[8px] space-y-[6px]">
            {/* Profession */}
            <ProfileCard
              icon={<BriefcaseBusiness size={13} strokeWidth={1.8} />}
              label="PROFESSION"
              value={preferences?.profession || "Technology"}
            />

            {/* Niches */}
            <ProfileCard
              icon={<span className="text-[12px]">✦</span>}
              label="NICHES"
              value={getInterests()}
            />

            {/* Voice */}
            <ProfileCard
              icon={<Mic2 size={13} strokeWidth={1.8} />}
              label="VOICE"
              value={getVoice()}
            />

            {/* Length */}
            <ProfileCard
              icon={<Timer size={13} strokeWidth={1.8} />}
              label="LENGTH"
              value={getLength()}
            />

            {/* Delivery */}
            <ProfileCard
              icon={<Clock3 size={13} strokeWidth={1.8} />}
              label="DELIVERY"
              value={getDelivery()}
            />
          </div>

          {/* Button */}
          <div className="mt-auto pt-[30px]">
            <button
              onClick={handleStartListening}
              disabled={saving || !preferences}
              className="
                w-full
                h-[43px]
                rounded-[12px]
                bg-gradient-to-r
                from-[#3bcf9b]
                to-[#438df5]
                text-[#06100d]
                text-[11px]
                font-semibold
                flex
                items-center
                justify-center
                gap-1
                transition
                active:scale-[0.98]
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              {saving ? "Saving..." : "Start listening →"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

function ProfileCard({ icon, label, value }) {
  return (
    <div className="h-[47px] rounded-[9px] border border-white/[0.06] bg-[#191a1a] flex items-center px-[10px]">
      {/* Icon box */}
      <div className="w-[34px] h-[34px] shrink-0 rounded-[9px] bg-[#242525] flex items-center justify-center text-white/55">
        {icon}
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1 ml-[9px]">
        <p className="text-[7px] tracking-[0.08em] text-white/30 uppercase leading-none mb-[4px]">
          {label}
        </p>

        <p className="text-[10px] font-semibold text-white/85 truncate leading-none">
          {value}
        </p>
      </div>

      {/* Check */}
      <div className="ml-2 text-[#35d99a] text-[14px] font-medium">
        ✓
      </div>
    </div>
  );
}