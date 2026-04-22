import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import AuthorPage from "@/app/author/page";

// Mock framer-motion
jest.mock("framer-motion", () => ({
    motion: {
        div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }) => (
            <div {...props}>{children}</div>
        ),
        header: ({ children, ...props }: React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }) => (
            <header {...props}>{children}</header>
        ),
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock next/navigation
jest.mock("next/navigation", () => ({
    useRouter: () => ({ back: jest.fn(), push: jest.fn() }),
    usePathname: () => "/author",
}));

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
    PenTool: () => <svg data-testid="icon-pentool" />,
    Calendar: () => <svg data-testid="icon-calendar" />,
    Award: () => <svg data-testid="icon-award" />,
    BookOpen: () => <svg data-testid="icon-bookopen" />,
    Star: () => <svg data-testid="icon-star" />,
}));

// Mock react-icons
jest.mock("react-icons/fa", () => ({
    FaArrowLeft: () => <svg data-testid="icon-arrow-left" />,
}));

// Mock BackButton
jest.mock("@/components/BackButton", () => {
    return function MockBackButton({ text }: { text?: string }) {
        return <button data-testid="back-button">{text}</button>;
    };
});

describe("AuthorPage", () => {
    beforeEach(() => {
        render(<AuthorPage />);
    });

    describe("author identity section", () => {
        it("renders the 'Creator Dossier' label", () => {
            expect(screen.getByText("Creator Dossier")).toBeInTheDocument();
        });

        it("renders the author first name", () => {
            expect(screen.getByText("Gosho")).toBeInTheDocument();
        });

        it("renders the author last name in italic gold", () => {
            expect(screen.getByText("Aoyama")).toBeInTheDocument();
        });

        it("renders the bio text", () => {
            expect(
                screen.getByText(/legendary creator of Detective Conan/i)
            ).toBeInTheDocument();
        });

        it("renders the birth date information", () => {
            expect(screen.getByText(/Born June 21, 1963/i)).toBeInTheDocument();
        });

        it("renders the birthplace", () => {
            expect(
                screen.getByText(/Hokuei, Tottori Prefecture, Japan/i)
            ).toBeInTheDocument();
        });
    });

    describe("skills section", () => {
        const expectedSkills = [
            "Manga Illustration",
            "Mystery Writing",
            "Character Design",
            "Storytelling",
            "Plot Development",
        ];

        it.each(expectedSkills)('renders skill badge "%s"', (skill) => {
            expect(screen.getByText(skill)).toBeInTheDocument();
        });

        it("renders all 5 skill badges", () => {
            const skillBadges = expectedSkills.map((skill) => screen.getByText(skill));
            expect(skillBadges).toHaveLength(5);
        });
    });

    describe("achievements section", () => {
        it('renders "1000+ Chapters" achievement', () => {
            expect(screen.getByText("1000+ Chapters")).toBeInTheDocument();
        });

        it('renders "Multiple Awards" achievement', () => {
            expect(screen.getByText("Multiple Awards")).toBeInTheDocument();
        });

        it('renders "Cultural Icon" achievement', () => {
            expect(screen.getByText("Cultural Icon")).toBeInTheDocument();
        });

        it("renders achievement descriptions", () => {
            expect(
                screen.getByText(/Over 1000 chapters of Detective Conan/i)
            ).toBeInTheDocument();
            expect(
                screen.getByText(/Winner of prestigious Shogakukan/i)
            ).toBeInTheDocument();
            expect(
                screen.getByText(/one of Japan's most iconic/i)
            ).toBeInTheDocument();
        });
    });

    describe("career timeline section", () => {
        it('renders "Career Timeline" heading', () => {
            expect(screen.getByText("Career Timeline")).toBeInTheDocument();
        });

        it("renders all 6 timeline year labels", () => {
            expect(screen.getByText("1986")).toBeInTheDocument();
            expect(screen.getByText("1987")).toBeInTheDocument();
            expect(screen.getByText("1988")).toBeInTheDocument();
            expect(screen.getByText("1994")).toBeInTheDocument();
            expect(screen.getByText("2001")).toBeInTheDocument();
            expect(screen.getByText("2017")).toBeInTheDocument();
        });

        it("renders all 6 timeline event titles", () => {
            expect(screen.getByText("Debut")).toBeInTheDocument();
            expect(screen.getByText("Magic Kaito")).toBeInTheDocument();
            expect(screen.getByText("Yaiba")).toBeInTheDocument();
            expect(screen.getByText("Detective Conan Begins")).toBeInTheDocument();
            expect(screen.getByText("Shogakukan Award")).toBeInTheDocument();
            expect(screen.getByText("1000th Chapter")).toBeInTheDocument();
        });

        it("renders the Debut timeline description", () => {
            expect(
                screen.getByText(/Made his debut with 'Wait a Minute'/i)
            ).toBeInTheDocument();
        });

        it("renders the Detective Conan Begins description referencing Weekly Shōnen Sunday", () => {
            expect(
                screen.getByText(/Meitantei Conan.*Weekly Shōnen Sunday/i)
            ).toBeInTheDocument();
        });

        it("renders the 1000th Chapter description", () => {
            expect(
                screen.getByText(/Detective Conan reached its 1000th chapter milestone/i)
            ).toBeInTheDocument();
        });
    });

    describe("navigation", () => {
        it("renders the back button with 'Back to Home' text", () => {
            expect(screen.getByTestId("back-button")).toHaveTextContent("Back to Home");
        });
    });

    describe("author image", () => {
        it("renders the author photo with correct alt text", () => {
            const img = screen.getByRole("img", { name: /Gosho Aoyama/i });
            expect(img).toBeInTheDocument();
        });
    });
});