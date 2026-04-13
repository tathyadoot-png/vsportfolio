"use client";
import { ReactLenis } from '@studio-freight/react-lenis';

// Humein yahan 'any' dena padega kyunki Lenis ka purana version 
// React 19 ke strict types ko support nahi karta.
export default function SmoothScroll({ children }: { children: any }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}