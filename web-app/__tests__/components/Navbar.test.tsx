import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Track the pathname so we can change it between tests
let mockPathname = "/";
jest.mock("next/navigation", () => ({
    usePathname: () => mockPathname,
}));

// Mock next/link
jest.mock("next/link", () => {
    return function MockLink({
        href,
        children,
        onClick,
        className,
    }: {
        href: string;
        children: React.ReactNode;
        onClick?: () => void;
        className?: string;
    }) {
        return (
            <a href={href} onClick={onClick} className={className}>
                {children}
            </a>
        );
    };
});

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
    Search: () => <svg data-testid="icon-search" />,
    Menu: () => <svg data-testid="icon-menu" />,
    X: () => <svg data-testid="icon-x" />,
}));

// Mock IntersectionObserver
const mockObserve = jest.fn();
const mockDisconnect = jest.fn();
const mockUnobserve = jest.fn();
global.IntersectionObserver = jest.fn().mockImplementation((callback) => ({
    observe: mockObserve,
    unobserve: mockUnobserve,
    disconnect: mockDisconnect,
})) as jest.Mock;

import Navbar from "@/components/Navbar";

describe("Navbar component", () => {
    beforeEach(() => {
        mockPathname = "/";
        jest.clearAllMocks();
        // Reset scrollY
        Object.defineProperty(window, "scrollY", { value: 0, writable: true, configurable: true });
    });

    describe("brand logo", () => {
        beforeEach(() => {
            render(<Navbar />);
        });

        it("renders the brand name DETCONEWSHUB", () => {
            // The brand is split across text nodes: "DETCO" + <span>NEWS</span> + "HUB"
            // Use the parent link element's text content to verify the full brand name
            const brandLink = document.querySelector('a[href="/"]') as HTMLElement;
            expect(brandLink).toBeInTheDocument();
            expect(brandLink?.textContent).toContain("DETCO");
            expect(brandLink?.textContent).toContain("NEWS");
            expect(brandLink?.textContent).toContain("HUB");
        });

        it("renders the search icon", () => {
            expect(screen.getByTestId("icon-search")).toBeInTheDocument();
        });

        it("brand link points to home '/'", () => {
            // The brand text is split across multiple child nodes: "DETCO" + <span>NEWS</span> + "HUB"
            // Find the link by its href attribute instead
            const homeLink = document.querySelector('a[href="/"]');
            expect(homeLink).toBeInTheDocument();
        });
    });

    describe("desktop navigation links", () => {
        beforeEach(() => {
            render(<Navbar />);
        });

        it("renders all 5 section links (Home, About, Characters, News, Author)", () => {
            expect(screen.getAllByRole("link", { name: /Home/i })).not.toHaveLength(0);
            expect(screen.getAllByRole("link", { name: /About/i })).not.toHaveLength(0);
            expect(screen.getAllByRole("link", { name: /Characters/i })).not.toHaveLength(0);
            expect(screen.getAllByRole("link", { name: /News/i })).not.toHaveLength(0);
            expect(screen.getAllByRole("link", { name: /Author/i })).not.toHaveLength(0);
        });

        it("renders Admin link pointing to /login", () => {
            const adminLink = screen.getByRole("link", { name: /Admin/i });
            expect(adminLink).toBeInTheDocument();
            expect(adminLink).toHaveAttribute("href", "/login");
        });

        it("Home link href is '/'", () => {
            const links = screen.getAllByRole("link", { name: "Home" });
            expect(links.some((l) => l.getAttribute("href") === "/")).toBe(true);
        });

        it("About link href is '/#about'", () => {
            const links = screen.getAllByRole("link", { name: "About" });
            expect(links.some((l) => l.getAttribute("href") === "/#about")).toBe(true);
        });

        it("Author link href is '/author'", () => {
            const links = screen.getAllByRole("link", { name: "Author" });
            expect(links.some((l) => l.getAttribute("href") === "/author")).toBe(true);
        });
    });

    describe("currentActiveSection logic (PR change)", () => {
        it("sets 'Home' nav link as active when on '/' path (home section active by default)", () => {
            mockPathname = "/";
            render(<Navbar />);
            // On "/" path, the default activeSection state is "home"
            // Home link should have the active style (bg-gold text-ink)
            const homeLinks = screen.getAllByRole("link", { name: "Home" });
            const homeNavLink = homeLinks.find((l) => l.getAttribute("href") === "/");
            expect(homeNavLink).toHaveClass("bg-gold");
        });

        it("sets 'Author' as active when on '/author' path", () => {
            mockPathname = "/author";
            render(<Navbar />);
            const authorLinks = screen.getAllByRole("link", { name: "Author" });
            // On /author path, currentActiveSection = "author"
            const authorNavLink = authorLinks.find((l) => l.getAttribute("href") === "/author");
            expect(authorNavLink).toHaveClass("bg-gold");
        });

        it("sets 'Home' as active when on a non-root, non-author path", () => {
            mockPathname = "/some-other-page";
            render(<Navbar />);
            // currentActiveSection = "home" for unknown paths
            const homeLinks = screen.getAllByRole("link", { name: "Home" });
            const homeNavLink = homeLinks.find((l) => l.getAttribute("href") === "/");
            expect(homeNavLink).toHaveClass("bg-gold");
        });

        it("does NOT mark Author as active when on '/' path", () => {
            mockPathname = "/";
            render(<Navbar />);
            const authorLinks = screen.getAllByRole("link", { name: "Author" });
            const authorNavLink = authorLinks.find((l) => l.getAttribute("href") === "/author");
            expect(authorNavLink).not.toHaveClass("bg-gold");
        });

        it("does NOT mark Home as active when on '/author' path", () => {
            mockPathname = "/author";
            render(<Navbar />);
            const homeLinks = screen.getAllByRole("link", { name: "Home" });
            const homeNavLink = homeLinks.find((l) => l.getAttribute("href") === "/");
            expect(homeNavLink).not.toHaveClass("bg-gold");
        });
    });

    describe("mobile menu toggle", () => {
        beforeEach(() => {
            render(<Navbar />);
        });

        it("renders the menu toggle button with aria-label 'Toggle menu'", () => {
            expect(screen.getByRole("button", { name: /Toggle menu/i })).toBeInTheDocument();
        });

        it("shows Menu icon when menu is closed", () => {
            expect(screen.getByTestId("icon-menu")).toBeInTheDocument();
            expect(screen.queryByTestId("icon-x")).not.toBeInTheDocument();
        });

        it("shows X icon when menu is open", async () => {
            const toggleButton = screen.getByRole("button", { name: /Toggle menu/i });
            await userEvent.click(toggleButton);
            expect(screen.getByTestId("icon-x")).toBeInTheDocument();
            expect(screen.queryByTestId("icon-menu")).not.toBeInTheDocument();
        });

        it("opens mobile menu and shows all section links", async () => {
            const toggleButton = screen.getByRole("button", { name: /Toggle menu/i });
            await userEvent.click(toggleButton);
            // Mobile menu duplicates the links, so we look for them in the mobile drawer
            // After opening, we should see the mobile menu container
            const allLinks = screen.getAllByRole("link", { name: /Home/i });
            // There should be at least 2 Home links (desktop + mobile)
            expect(allLinks.length).toBeGreaterThanOrEqual(2);
        });

        it("closes mobile menu when backdrop is clicked", async () => {
            const toggleButton = screen.getByRole("button", { name: /Toggle menu/i });
            await userEvent.click(toggleButton);
            // Menu is now open, X icon visible
            expect(screen.getByTestId("icon-x")).toBeInTheDocument();
            // Click the backdrop overlay
            const backdrop = document.querySelector(".fixed.inset-0.z-\\[60\\]");
            expect(backdrop).toBeInTheDocument();
            if (backdrop) {
                fireEvent.click(backdrop);
            }
            expect(screen.queryByTestId("icon-x")).not.toBeInTheDocument();
            expect(screen.getByTestId("icon-menu")).toBeInTheDocument();
        });

        it("closes mobile menu when a mobile nav link is clicked", async () => {
            const toggleButton = screen.getByRole("button", { name: /Toggle menu/i });
            await userEvent.click(toggleButton);
            expect(screen.getByTestId("icon-x")).toBeInTheDocument();

            // The mobile drawer is the last menu container in the DOM
            // After opening, there are 2 About links: desktop (index 0) and mobile (index 1)
            const aboutLinks = screen.getAllByRole("link", { name: "About" });
            // The mobile menu link is the second one (index 1)
            const mobileLinkIdx = aboutLinks.length > 1 ? 1 : 0;
            await userEvent.click(aboutLinks[mobileLinkIdx]);
            expect(screen.queryByTestId("icon-x")).not.toBeInTheDocument();
        });

        it("menu is initially closed (no duplicate links in DOM)", () => {
            // Mobile menu not rendered when closed
            const homeLinks = screen.getAllByRole("link", { name: "Home" });
            // Desktop only = 1 Home link visible (mobile menu not rendered)
            expect(homeLinks).toHaveLength(1);
        });
    });

    describe("IntersectionObserver setup (PR change: merged useEffects)", () => {
        it("does NOT set up IntersectionObserver on non-home paths", () => {
            mockPathname = "/author";
            render(<Navbar />);
            // When not on "/", useEffect returns early without creating observer
            expect(mockObserve).not.toHaveBeenCalled();
        });

        it("sets up IntersectionObserver when on '/' path", () => {
            mockPathname = "/";
            // Create elements for the observer to observe
            const aboutEl = document.createElement("div");
            aboutEl.id = "about";
            const charsEl = document.createElement("div");
            charsEl.id = "characters";
            const newsEl = document.createElement("div");
            newsEl.id = "news";
            document.body.appendChild(aboutEl);
            document.body.appendChild(charsEl);
            document.body.appendChild(newsEl);

            render(<Navbar />);
            expect(mockObserve).toHaveBeenCalledTimes(3);

            document.body.removeChild(aboutEl);
            document.body.removeChild(charsEl);
            document.body.removeChild(newsEl);
        });

        it("disconnects IntersectionObserver on unmount", () => {
            mockPathname = "/";
            const { unmount } = render(<Navbar />);
            unmount();
            expect(mockDisconnect).toHaveBeenCalled();
        });
    });

    describe("scroll behavior", () => {
        it("sets active section to 'home' when scrollY < 100", () => {
            mockPathname = "/";
            Object.defineProperty(window, "scrollY", { value: 50, writable: true, configurable: true });
            render(<Navbar />);
            fireEvent.scroll(window);
            // Active section should remain "home"
            const homeLinks = screen.getAllByRole("link", { name: "Home" });
            const homeNavLink = homeLinks.find((l) => l.getAttribute("href") === "/");
            expect(homeNavLink).toHaveClass("bg-gold");
        });

        it("removes scroll listener on unmount", () => {
            const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");
            const { unmount } = render(<Navbar />);
            unmount();
            expect(removeEventListenerSpy).toHaveBeenCalledWith("scroll", expect.any(Function));
            removeEventListenerSpy.mockRestore();
        });
    });
});