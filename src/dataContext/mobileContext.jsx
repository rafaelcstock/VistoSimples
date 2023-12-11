import { createContext, useContext, useState, useEffect } from "react";

const MobileContext = createContext(undefined);

export function useMobile() {
    const context = useContext(MobileContext);
    if (!context) {
        throw new Error("useMobile must be used within a MobileProvider");
    }
    return context;
}

export function MobileProvider({ children }) {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    function handleWindowSizeChange() {
        setIsMobile(window.innerWidth <= 768);
    }

    useEffect(() => {
        window.addEventListener("resize", handleWindowSizeChange);
        return () => {
            window.removeEventListener("resize", handleWindowSizeChange);
        };
    }, []);

    return (
        <MobileContext.Provider value={{ isMobile }}>
            {children}
        </MobileContext.Provider>
    );
}
