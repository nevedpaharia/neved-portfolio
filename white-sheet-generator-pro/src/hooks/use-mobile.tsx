import * as React from "react"

const MOBILE_BREAKPOINT = 768
const TABLET_BREAKPOINT = 1024

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Set initial value
    checkMobile()
    
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return isMobile
}

export function useIsTablet() {
  const [isTablet, setIsTablet] = React.useState<boolean>(false)

  React.useEffect(() => {
    const checkTablet = () => {
      setIsTablet(window.innerWidth >= MOBILE_BREAKPOINT && window.innerWidth < TABLET_BREAKPOINT)
    }
    
    // Set initial value
    checkTablet()
    
    window.addEventListener("resize", checkTablet)
    return () => window.removeEventListener("resize", checkTablet)
  }, [])

  return isTablet
}

export function useIsDesktop() {
  const [isDesktop, setIsDesktop] = React.useState<boolean>(false)

  React.useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= TABLET_BREAKPOINT)
    }
    
    // Set initial value
    checkDesktop()
    
    window.addEventListener("resize", checkDesktop)
    return () => window.removeEventListener("resize", checkDesktop)
  }, [])

  return isDesktop
}
