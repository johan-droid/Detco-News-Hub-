import "@testing-library/jest-dom";
import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { NewsItem } from "@/types";

// Use jest.fn() inline within the factory to avoid hoisting reference errors
jest.mock("@/lib/supabaseClient", () => ({
    supabase: {
        from: jest.fn(),
    },
}));

// Mock next/navigation
const mockRouterPush = jest.fn();
jest.mock("next/navigation", () => ({
    useParams: () => ({ id: "test-id-123" }),
    useRouter: () => ({ push: mockRouterPush, back: jest.fn() }),
}));

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

// Mock lucide-react
jest.mock("lucide-react", () => ({
    Clock: () => <svg data-testid="icon-clock" />,
    User: () => <svg data-testid="icon-user" />,
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

// Import component and mocked module after jest.mock declarations
import NewsDetail from "@/app/news/[id]/page";
import { supabase } from "@/lib/supabaseClient";

// Helper to set up mock chain: supabase.from("news").select("*").eq("id", id).single()
function setupMockChain(resolvedValue: { data: NewsItem | null; error: unknown }) {
    const mockSingle = jest.fn().mockResolvedValue(resolvedValue);
    const mockEq = jest.fn().mockReturnValue({ single: mockSingle });
    const mockSelect = jest.fn().mockReturnValue({ eq: mockEq });
    (supabase.from as jest.Mock).mockReturnValue({ select: mockSelect });
    return { mockSingle, mockEq, mockSelect, mockFrom: supabase.from as jest.Mock };
}

const baseNewsItem: NewsItem = {
    id: "test-id-123",
    title: "Major Conan Update",
    content: "First paragraph content.\nSecond paragraph content.\nThird paragraph.",
    category: "MANGA",
    created_at: "2024-03-15T10:00:00Z",
    author: "Conan Team",
    image: "https://example.com/image.jpg",
    updated_at: undefined,
};

describe("NewsDetail", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("loading state", () => {
        it("shows loading text while fetching", () => {
            // Don't resolve the promise
            const mockSingle = jest.fn().mockReturnValue(new Promise(() => {}));
            const mockEq = jest.fn().mockReturnValue({ single: mockSingle });
            const mockSelect = jest.fn().mockReturnValue({ eq: mockEq });
            (supabase.from as jest.Mock).mockReturnValue({ select: mockSelect });

            render(<NewsDetail />);
            expect(screen.getByText(/Accessing Case File/i)).toBeInTheDocument();
        });
    });

    describe("not found / error state", () => {
        it("shows 'not found' message when no data is returned", async () => {
            setupMockChain({ data: null, error: { message: "Not found" } });
            render(<NewsDetail />);
            await waitFor(() => {
                expect(
                    screen.getByText(/Case file not found or access denied/i)
                ).toBeInTheDocument();
            });
        });

        it("renders 'Return to Archive' button in not found state", async () => {
            setupMockChain({ data: null, error: null });
            render(<NewsDetail />);
            await waitFor(() => {
                expect(screen.getByText(/Return to Archive/i)).toBeInTheDocument();
            });
        });

        it("navigates to /#news when 'Return to Archive' is clicked", async () => {
            setupMockChain({ data: null, error: null });
            render(<NewsDetail />);
            await waitFor(() => screen.getByText(/Return to Archive/i));
            await userEvent.click(screen.getByText(/Return to Archive/i));
            expect(mockRouterPush).toHaveBeenCalledWith("/#news");
        });
    });

    describe("success state with full news item", () => {
        beforeEach(async () => {
            setupMockChain({ data: baseNewsItem, error: null });
            await act(async () => {
                render(<NewsDetail />);
            });
            await waitFor(() => screen.getByText("Major Conan Update"));
        });

        it("renders the article title", () => {
            expect(screen.getByRole("heading", { name: /Major Conan Update/i })).toBeInTheDocument();
        });

        it("renders the category badge", () => {
            expect(screen.getByText("MANGA")).toBeInTheDocument();
        });

        it("renders the formatted creation date", () => {
            expect(screen.getByText(/March 15, 2024/i)).toBeInTheDocument();
        });

        it("renders the author name", () => {
            expect(screen.getByText(/Conan Team/i)).toBeInTheDocument();
        });

        it("renders the article image with correct src", () => {
            const img = screen.getByRole("img", { name: /Major Conan Update/i });
            expect(img).toBeInTheDocument();
            expect(img).toHaveAttribute("src", "https://example.com/image.jpg");
        });

        it("renders back button with 'Back to News' text", () => {
            expect(screen.getByTestId("back-button")).toHaveTextContent("Back to News");
        });

        it("renders each paragraph of content split by newlines", () => {
            expect(screen.getByText("First paragraph content.")).toBeInTheDocument();
            expect(screen.getByText("Second paragraph content.")).toBeInTheDocument();
            expect(screen.getByText("Third paragraph.")).toBeInTheDocument();
        });

        it("does not show updated notice when updated_at is undefined", () => {
            expect(screen.queryByText(/Updated/i)).not.toBeInTheDocument();
        });
    });

    describe("news item without optional fields", () => {
        it("does not render author icon when author is undefined", async () => {
            const noAuthorItem: NewsItem = { ...baseNewsItem, author: undefined };
            setupMockChain({ data: noAuthorItem, error: null });
            await act(async () => { render(<NewsDetail />); });
            await waitFor(() => screen.getByText("Major Conan Update"));
            expect(screen.queryByTestId("icon-user")).not.toBeInTheDocument();
        });

        it("does not render image element when image is undefined", async () => {
            const noImageItem: NewsItem = { ...baseNewsItem, image: undefined };
            setupMockChain({ data: noImageItem, error: null });
            await act(async () => { render(<NewsDetail />); });
            await waitFor(() => screen.getByText("Major Conan Update"));
            expect(screen.queryByRole("img")).not.toBeInTheDocument();
        });
    });

    describe("updated_at display", () => {
        it("renders update notice when updated_at differs from created_at", async () => {
            const updatedItem: NewsItem = {
                ...baseNewsItem,
                updated_at: "2024-04-01T12:00:00Z",
            };
            setupMockChain({ data: updatedItem, error: null });
            await act(async () => { render(<NewsDetail />); });
            await waitFor(() => screen.getByText("Major Conan Update"));
            expect(screen.getByText(/Updated/i)).toBeInTheDocument();
        });

        it("does not render update notice when updated_at equals created_at", async () => {
            const sameTimeItem: NewsItem = {
                ...baseNewsItem,
                updated_at: "2024-03-15T10:00:00Z",
            };
            setupMockChain({ data: sameTimeItem, error: null });
            await act(async () => { render(<NewsDetail />); });
            await waitFor(() => screen.getByText("Major Conan Update"));
            expect(screen.queryByText(/^Updated/i)).not.toBeInTheDocument();
        });
    });

    describe("category color mapping", () => {
        const categoryColorCases: [string, string][] = [
            ["BREAKING", "#c0392b"],
            ["MANGA", "#c9a84c"],
            ["ANIME", "#27ae60"],
            ["THEORY", "#4A90D9"],
            ["EVENTS", "#9B59B6"],
            ["GENERAL", "#34495e"],
        ];

        it.each(categoryColorCases)(
            "renders %s category badge with correct inline color style",
            async (category, expectedColor) => {
                const item: NewsItem = { ...baseNewsItem, category };
                setupMockChain({ data: item, error: null });
                await act(async () => { render(<NewsDetail />); });
                await waitFor(() => screen.getByText(category));
                const badge = screen.getByText(category);
                expect(badge).toHaveStyle({ color: expectedColor });
            }
        );

        it("falls back to gold color for unknown category", async () => {
            const item: NewsItem = { ...baseNewsItem, category: "UNKNOWN" };
            setupMockChain({ data: item, error: null });
            await act(async () => { render(<NewsDetail />); });
            await waitFor(() => screen.getByText("UNKNOWN"));
            const badge = screen.getByText("UNKNOWN");
            expect(badge).toHaveStyle({ color: "#c9a84c" });
        });
    });

    describe("supabase query", () => {
        it("queries the 'news' table with the correct id", async () => {
            const { mockFrom, mockSelect, mockEq } = setupMockChain({ data: baseNewsItem, error: null });
            await act(async () => { render(<NewsDetail />); });
            await waitFor(() => screen.getByText("Major Conan Update"));
            expect(mockFrom).toHaveBeenCalledWith("news");
            expect(mockSelect).toHaveBeenCalledWith("*");
            expect(mockEq).toHaveBeenCalledWith("id", "test-id-123");
        });
    });
});