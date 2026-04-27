import { useCallback, useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useTheme } from "../../theme/ThemeContext";

export default function ParticlesBackground() {
  const [init, setInit] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const particlesLoaded = useCallback(async () => {}, []);

  const options = {
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: { enable: true, mode: "grab" },
        onClick: { enable: true, mode: "push" },
      },
      modes: {
        grab: { distance: 140, links: { opacity: 0.5 } },
        push: { quantity: 2 },
      },
    },
    particles: {
      color: {
        value: theme === "dark" ? "#0ea5e9" : "#0284c7",
      },
      links: {
        color: theme === "dark" ? "#0ea5e9" : "#0284c7",
        distance: 130,
        enable: true,
        opacity: theme === "dark" ? 0.15 : 0.2,
        width: 1,
      },
      move: {
        enable: true,
        speed: 0.6,
        direction: "none",
        random: true,
        straight: false,
        outModes: { default: "bounce" },
      },
      number: {
        value: 60,
        density: { enable: true, area: 900 },
      },
      opacity: {
        value: theme === "dark" ? 0.4 : 0.5,
        animation: {
          enable: true,
          speed: 0.8,
          minimumValue: 0.1,
        },
      },
      shape: { type: "circle" },
      size: {
        value: { min: 1, max: 2.5 },
      },
    },
    detectRetina: true,
    background: { color: "transparent" },
  };

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      options={options}
      particlesLoaded={particlesLoaded}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
      }}
    />
  );
}