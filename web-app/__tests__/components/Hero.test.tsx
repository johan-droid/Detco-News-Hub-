import "@testing-library/jest-dom";
import React from "react";
import { render, screen, act } from "@testing-library/react";
import Hero from "@/components/Hero";

// Mock framer-motion
jest.mock("framer-motion", () => ({
    motion: {
        div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }) => (
            <div {...props}>{children}</div>
        ),
        h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement> & { children?: React.ReactNode }) => (
            <h1 {...props}>{children}</h1>
        ),
        p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement> & { children?: React.ReactNode }) => (
            <p {...props}>{children}</p>
        ),
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock next/link
jest.mock("next/link", () => {
    return function MockLink({
        href,
        children,
        ...props
    }: { href: string; children: React.ReactNode } & React.HTMLAttributes<HTMLAnchorElement>) {
        return (
            <a href={href} {...props}>
                {children}
            </a>
        );
    };
});

const detectiveQuotes = [
    "There is always only one truth.",
    "A detective who gets scared by danger is no detective at all.",
    "The darker the night, the brighter the stars.",
    "Every lie leaves a trace. You just have to find it.",
];

describe("Hero component", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    describe("static content", () => {
        beforeEach(() => {
            render(<Hero />);
        });

        it("renders the hero section with id='home'", () => {
            const section = document.getElementById("home");
            expect(section).toBeInTheDocument();
        });

        it("renders the 'Case Timeline · Since Jan 19, 1994' badge", () => {
            expect(screen.getByText(/Case Timeline · Since Jan 19, 1994/i)).toBeInTheDocument();
        });

        it("renders the main headline text", () => {
            expect(screen.getByText(/Detective news,/i)).toBeInTheDocument();
        });

        it("renders the 'designed like a case board.' subtitle", () => {
            expect(screen.getByText(/designed like a case board\./i)).toBeInTheDocument();
        });

        it("renders the description paragraph", () => {
            expect(
                screen.getByText(/Explore character dossiers, canon timeline insights/i)
            ).toBeInTheDocument();
        });

        it("renders 'Open News Archive' link pointing to #news", () => {
            const link = screen.getByRole("link", { name: /Open News Archive/i });
            expect(link).toBeInTheDocument();
            expect(link).toHaveAttribute("href", "#news");
        });

        it("renders 'Meet the Creator' link pointing to /author", () => {
            const link = screen.getByRole("link", { name: /Meet the Creator/i });
            expect(link).toBeInTheDocument();
            expect(link).toHaveAttribute("href", "/author");
        });
    });

    describe("Investigation Board stats panel (PR addition)", () => {
        beforeEach(() => {
            render(<Hero />);
        });

        it("renders 'Investigation Board' header", () => {
            expect(screen.getByText(/Investigation Board/i)).toBeInTheDocument();
        });

        it("renders 'Live' status indicator", () => {
            expect(screen.getByText("Live")).toBeInTheDocument();
        });

        it("renders 'Episodes' stat", () => {
            expect(screen.getByText("Episodes")).toBeInTheDocument();
        });

        it("renders '1100+' episodes count", () => {
            expect(screen.getByText("1100+")).toBeInTheDocument();
        });

        it("renders 'Movies' stat", () => {
            expect(screen.getByText("Movies")).toBeInTheDocument();
        });

        it("renders '28' movies count", () => {
            expect(screen.getByText("28")).toBeInTheDocument();
        });

        it("renders 'Manga Volumes' stat", () => {
            expect(screen.getByText("Manga Volumes")).toBeInTheDocument();
        });

        it("renders '107+' manga volumes count", () => {
            expect(screen.getByText("107+")).toBeInTheDocument();
        });

        it("renders 'Years Running' stat", () => {
            expect(screen.getByText("Years Running")).toBeInTheDocument();
        });

        it("renders '30+' years count", () => {
            expect(screen.getByText("30+")).toBeInTheDocument();
        });

        it("renders all 4 stat cards", () => {
            const statLabels = ["Episodes", "Movies", "Manga Volumes", "Years Running"];
            statLabels.forEach((label) => {
                expect(screen.getByText(label)).toBeInTheDocument();
            });
        });
    });

    describe("quote rotation", () => {
        // The component renders &ldquo; and &rdquo; (curly quotes) around the quote text.
        // We match the quote text content (without quotes) using a regex.
        it("renders the first quote on initial render", () => {
            render(<Hero />);
            expect(screen.getByText(new RegExp(detectiveQuotes[0]))).toBeInTheDocument();
        });

        it("cycles to the second quote after 4000ms", () => {
            render(<Hero />);
            act(() => {
                jest.advanceTimersByTime(4000);
            });
            expect(screen.getByText(new RegExp(detectiveQuotes[1]))).toBeInTheDocument();
        });

        it("cycles to the third quote after 8000ms", () => {
            render(<Hero />);
            act(() => {
                jest.advanceTimersByTime(8000);
            });
            expect(screen.getByText(new RegExp(detectiveQuotes[2]))).toBeInTheDocument();
        });

        it("cycles to the fourth quote after 12000ms", () => {
            render(<Hero />);
            act(() => {
                jest.advanceTimersByTime(12000);
            });
            expect(screen.getByText(new RegExp(detectiveQuotes[3]))).toBeInTheDocument();
        });

        it("wraps back to the first quote after 16000ms (full cycle)", () => {
            render(<Hero />);
            act(() => {
                jest.advanceTimersByTime(16000);
            });
            expect(screen.getByText(new RegExp(detectiveQuotes[0]))).toBeInTheDocument();
        });

        it("clears the interval on unmount (no timer leak)", () => {
            const clearIntervalSpy = jest.spyOn(global, "clearInterval");
            const { unmount } = render(<Hero />);
            unmount();
            expect(clearIntervalSpy).toHaveBeenCalled();
            clearIntervalSpy.mockRestore();
        });
    });

    describe("navigation links use next/link (PR change)", () => {
        beforeEach(() => {
            render(<Hero />);
        });

        it("'Open News Archive' is rendered as an anchor tag via Next Link", () => {
            const link = screen.getByRole("link", { name: /Open News Archive/i });
            expect(link.tagName.toLowerCase()).toBe("a");
        });

        it("'Meet the Creator' is rendered as an anchor tag via Next Link", () => {
            const link = screen.getByRole("link", { name: /Meet the Creator/i });
            expect(link.tagName.toLowerCase()).toBe("a");
        });
    });
});