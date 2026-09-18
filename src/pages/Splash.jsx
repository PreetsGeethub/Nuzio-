import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NuzioLogo from "../components/NuzioLogo";
import AppShell from "../components/AppShell";

function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/language");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <AppShell>
      <div className="flex min-h-screen flex-col items-center justify-center">

        <NuzioLogo />

        <p className="mt-14 font-serif text-[21px] italic text-white">
          News on go
        </p>

        <p className="mt-3 text-[7px] tracking-[0.3em] text-white/25">
          YOUR AUDIO BRIEF, EVERY MORNING
        </p>

        <div className="absolute bottom-16 flex items-center gap-2">
          <span className="h-1 w-1 rounded-full bg-emerald-400" />

          <span className="text-[7px] tracking-[0.25em] text-white/25">
            CURATING YOUR BRIEF...
          </span>
        </div>

      </div>
    </AppShell>
  );
}

export default Splash;