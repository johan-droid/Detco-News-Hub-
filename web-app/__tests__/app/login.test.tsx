import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import LoginPage from "@/app/login/page";

// Mock next/navigation
jest.mock("next/navigation", () => ({
    useRouter: () => ({ push: jest.fn(), back: jest.fn() }),
    useSearchParams: () => ({ get: jest.fn(() => null) }),
}));

// Mock react-icons
jest.mock("react-icons/fa", () => ({
    FaArrowLeft: () => <svg data-testid="icon-arrow-left" />,
}));

// Mock supabase (required to prevent env var errors)
jest.mock("@/lib/supabaseClient", () => ({
    supabase: {
        auth: {
            signInWithPassword: jest.fn(),
        },
    },
}));

// Mock framer-motion
jest.mock("framer-motion", () => ({
    motion: {
        div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }) => (
            <div {...props}>{children}</div>
        ),
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock lucide-react
jest.mock("lucide-react", () => ({
    Lock: () => <svg data-testid="icon-lock" />,
    Mail: () => <svg data-testid="icon-mail" />,
    ArrowRight: () => <svg data-testid="icon-arrow-right" />,
    AlertCircle: () => <svg data-testid="icon-alert" />,
    Eye: () => <svg data-testid="icon-eye" />,
    EyeOff: () => <svg data-testid="icon-eye-off" />,
}));

// Mock BackButton
jest.mock("@/components/BackButton", () => {
    return function MockBackButton({ text }: { text?: string }) {
        return <button data-testid="back-button">{text}</button>;
    };
});

// Mock LoginForm
jest.mock("@/components/LoginForm", () => {
    return function MockLoginForm() {
        return <div data-testid="login-form">Login Form</div>;
    };
});

describe("LoginPage", () => {
    beforeEach(() => {
        render(<LoginPage />);
    });

    describe("layout structure", () => {
        it("renders the main element with correct classes", () => {
            const main = screen.getByRole("main");
            expect(main).toBeInTheDocument();
            expect(main).toHaveClass("min-h-screen", "bg-ink");
        });

        it("renders the BackButton with 'Back to Home' text", () => {
            expect(screen.getByTestId("back-button")).toHaveTextContent("Back to Home");
        });

        it("renders the LoginForm component", () => {
            expect(screen.getByTestId("login-form")).toBeInTheDocument();
        });
    });

    describe("admin portal panel (desktop-only)", () => {
        it('renders the "Admin Portal" label', () => {
            expect(screen.getByText("Admin Portal")).toBeInTheDocument();
        });

        it('renders the "Control Desk" heading', () => {
            expect(screen.getByRole("heading", { name: /Control Desk/i })).toBeInTheDocument();
        });

        it("renders the admin portal description text", () => {
            expect(
                screen.getByText(/Sign in to manage news articles/i)
            ).toBeInTheDocument();
        });
    });

    describe("secure area badge", () => {
        it('renders the "Secure Area" badge text', () => {
            expect(screen.getByText("Secure Area")).toBeInTheDocument();
        });
    });

    describe("background decorators", () => {
        it("renders the page with overflow-hidden to contain background blurs", () => {
            const main = screen.getByRole("main");
            expect(main).toHaveClass("overflow-hidden");
        });
    });
});