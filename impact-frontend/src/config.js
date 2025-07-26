export const BACKEND = import.meta.env.VITE_BACKEND ?? "http://localhost:8000";
export const SNAPSHOT_URL = BACKEND + "/snapshot";
export const DEMO_URL = import.meta.env.VITE_DEMO_URL ?? window.location.origin;
export const ARCADE_URL = import.meta.env.VITE_ARCADE_URL ?? ""; 