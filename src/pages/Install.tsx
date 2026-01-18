import { useEffect } from "react";

export function Install() {
  useEffect(() => {
    window.location.href = "/install.sh";
  }, []);

  return (
    <div className="min-h-screen bg-black text-zinc-300 flex items-center justify-center">
      <div className="text-center">
        <p className="text-zinc-500">Redirecting to install script...</p>
      </div>
    </div>
  );
}
