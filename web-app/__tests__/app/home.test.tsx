import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";

// Mock all child components so we test only the Home page structure
jest.mock("@/components/Navbar", () => {
    return function MockNavbar() {
        return <nav data-testid="navbar" />;
    };
});
jest.mock("@/components/Hero", () => {
    return function MockHero() {
        return <section data-testid="hero" />;
    };
});
jest.mock("@/components/About", () => {
    return function MockAbout() {
        return <section data-testid="about" />;
    };
});
jest.mock("@/components/Characters", () => {
    return function MockCharacters() {
        return <section data-testid="characters" />;
    };
});
jest.mock("@/components/Gadgets", () => {
    return function MockGadgets() {
        return <section data-testid="gadgets" />;
    };
});
jest.mock("@/components/News", () => {
    return function MockNews() {
        return <section data-testid="news" />;
    };
});
jest.mock("@/components/Footer", () => {
    return function MockFooter() {
        return <footer data-testid="footer" />;
    };
});
jest.mock("@/components/BackToTop", () => {
    return function MockBackToTop() {
        return <button data-testid="back-to-top" />;
    };
});

import Home from "@/app/page";

describe("Home page (app/page.tsx)", () => {
    beforeEach(() => {
        render(<Home />);
    });

    describe("layout structure", () => {
        it("renders the main element", () => {
            expect(screen.getByRole("main")).toBeInTheDocument();
        });

        it("applies relative and overflow-x-hidden to the main element (PR change)", () => {
            const main = screen.getByRole("main");
            expect(main).toHaveClass("relative");
            expect(main).toHaveClass("overflow-x-hidden");
        });

        it("applies min-h-screen bg-ink text-white font-body classes", () => {
            const main = screen.getByRole("main");
            expect(main).toHaveClass("min-h-screen", "bg-ink", "text-white", "font-body");
        });
    });

    describe("background glow decorators (PR addition)", () => {
        it("renders the background decorator container with pointer-events-none", () => {
            const main = screen.getByRole("main");
            // The background decorators are non-interactive overlays
            const decoratorContainer = main.querySelector(".pointer-events-none.absolute.inset-0");
            expect(decoratorContainer).toBeInTheDocument();
        });

        it("renders the gold glow orb div", () => {
            const main = screen.getByRole("main");
            const goldOrb = main.querySelector(".bg-gold\\/10");
            expect(goldOrb).toBeInTheDocument();
        });

        it("renders the accent glow orb div", () => {
            const main = screen.getByRole("main");
            const accentOrb = main.querySelector(".bg-accent\\/10");
            expect(accentOrb).toBeInTheDocument();
        });
    });

    describe("child components", () => {
        it("renders Navbar", () => {
            expect(screen.getByTestId("navbar")).toBeInTheDocument();
        });

        it("renders Hero", () => {
            expect(screen.getByTestId("hero")).toBeInTheDocument();
        });

        it("renders About", () => {
            expect(screen.getByTestId("about")).toBeInTheDocument();
        });

        it("renders Characters", () => {
            expect(screen.getByTestId("characters")).toBeInTheDocument();
        });

        it("renders Gadgets", () => {
            expect(screen.getByTestId("gadgets")).toBeInTheDocument();
        });

        it("renders News", () => {
            expect(screen.getByTestId("news")).toBeInTheDocument();
        });

        it("renders Footer", () => {
            expect(screen.getByTestId("footer")).toBeInTheDocument();
        });

        it("renders BackToTop", () => {
            expect(screen.getByTestId("back-to-top")).toBeInTheDocument();
        });
    });
});