import useWindowDimensions from "../windowsSize";

export default function useBreakpoints() {
  const desktopBreakpoint = 768;
  const { width } = useWindowDimensions();

  return {
    isDesktop: width >= desktopBreakpoint,
    isMobile: width < desktopBreakpoint,
  };
}
