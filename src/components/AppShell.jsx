function AppShell({ children }) {
    return (
      <main className="min-h-screen bg-[#050505] text-white">
  
        <div
          className="
            relative
            mx-auto
            min-h-screen
            w-full
            max-w-[430px]
            overflow-hidden
            bg-[#080808]
          "
        >
  
          {/* Top purple glow */}
          <div
            className="
              pointer-events-none
              absolute
              -top-[180px]
              left-1/2
              h-[520px]
              w-[520px]
              -translate-x-1/2
              rounded-full
              bg-violet-700/[0.14]
              blur-[120px]
            "
          />
  
          {/* Very subtle center glow */}
          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-[25%]
              h-[280px]
              w-[280px]
              -translate-x-1/2
              rounded-full
              bg-violet-900/[0.07]
              blur-[100px]
            "
          />
  
          <div className="relative z-10 min-h-screen">
            {children}
          </div>
  
        </div>
  
      </main>
    );
  }
  
  export default AppShell;