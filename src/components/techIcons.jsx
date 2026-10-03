'use client'

import {
  SiJavascript, SiHtml5, SiCss, SiReact, SiNextdotjs, SiTailwindcss,
  SiBootstrap, SiFramer, SiNodedotjs, SiPhp, SiMysql, SiPostgresql,
  SiSupabase, SiVercel, SiGit, SiArduino, SiCplusplus, SiFigma,
  SiTypescript, SiMongodb, SiFirebase, SiFlutter
} from 'react-icons/si'
import { FaShieldHalved, FaCloud } from 'react-icons/fa6'

// ─── VS Code ──────────────────────────────────────────────────────────────────
// Simple Icons no longer ships the Microsoft brand marks, so the official
// VS Code ribbon path is inlined (single solid path, one brand colour).
function VsCodeGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="100%" height="100%" fill="#007ACC" aria-hidden="true">
      <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z" />
    </svg>
  )
}

// ─── Brand registry ───────────────────────────────────────────────────────────
// Every mark is drawn from its real logo path on the normalised 24x24 grid, so
// the whole set keeps one optical size instead of the mixed 24/128 viewBoxes
// that used to sit at different scales. Marks whose brand colour is pure black
// or white stay on `currentColor`, which keeps them legible in both themes.
export const icons = {
  JavaScript: <SiJavascript size="100%" color="#F7DF1E" />,
  TypeScript: <SiTypescript size="100%" color="#3178C6" />,
  HTML5: <SiHtml5 size="100%" color="#E34F26" />,
  CSS3: <SiCss size="100%" color="#1572B6" />,
  'HTML/CSS': <SiHtml5 size="100%" color="#E34F26" />,
  React: <SiReact size="100%" color="#61DAFB" />,
  'Next.js': <SiNextdotjs size="100%" />,
  Tailwind: <SiTailwindcss size="100%" color="#38BDF8" />,
  'Tailwind CSS': <SiTailwindcss size="100%" color="#38BDF8" />,
  Bootstrap: <SiBootstrap size="100%" color="#8540B5" />,
  'Framer Motion': <SiFramer size="100%" />,
  'Node.js': <SiNodedotjs size="100%" color="#5FA04E" />,
  PHP: <SiPhp size="100%" color="#8A93C9" />,
  MySQL: <SiMysql size="100%" color="#4479A1" />,
  PostgreSQL: <SiPostgresql size="100%" color="#4B8BBE" />,
  Supabase: <SiSupabase size="100%" color="#3FCF8E" />,
  MongoDB: <SiMongodb size="100%" color="#47A248" />,
  Firebase: <SiFirebase size="100%" color="#FFCA28" />,
  Flutter: <SiFlutter size="100%" color="#4285F4" />,
  'C++': <SiCplusplus size="100%" color="#659AD2" />,
  Arduino: <SiArduino size="100%" color="#00979D" />,
  Vercel: <SiVercel size="100%" />,
  Git: <SiGit size="100%" color="#F05032" />,
  Figma: <SiFigma size="100%" color="#F24E1E" />,
  'VS Code': <VsCodeGlyph />,
  Cybersecurity: <FaShieldHalved size="100%" />,
  Cloud: <FaCloud size="100%" />,
}

export function DefaultIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}

// Renders a registry entry by name. Kept as a client component so server
// rendered pages (e.g. /about) can look icons up without crossing the module
// boundary with a plain object, which used to silently fall back to chevrons.
export default function TechIcon({ name }) {
  return <>{icons[name] ?? <DefaultIcon />}</>
}
