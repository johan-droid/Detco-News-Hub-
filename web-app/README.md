# DetCo News Hub — Web App

A modern Next.js application for the Detective Conan News Hub, featuring a responsive design, animations, and an admin dashboard.

## Tech Stack

-   **Framework:** [Next.js](https://nextjs.org/) (App Router)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **Language:** TypeScript
-   **Icons:** [Lucide React](https://lucide.dev/)
-   **Animations:** [Framer Motion](https://www.framer.com/motion/)
-   **Backend:** [Supabase](https://supabase.com/) (Auth & Database)
-   **Media:** [Cloudinary](https://cloudinary.com/)

## Getting Started

1.  **Install Dependencies:**

    ```bash
    npm install
    ```

2.  **Environment Setup:**

    Copy the example environment file:

    ```bash
    cp .env.local.example .env.local
    ```

    Fill in your credentials in `.env.local`:

    -   `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase Project URL
    -   `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase Anon Key
    -   `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`: Your Cloudinary Cloud Name
    -   `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`: Your Unsigned Upload Preset

3.  **Run Development Server:**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser.

## Admin Dashboard

Access the admin dashboard at `/admin`. You will need to set up an admin user in Supabase Auth or use the secret key mechanism simulated in the code (check `app/admin/page.tsx` for details).

## Deployment

This app is optimized for deployment on [Vercel](https://vercel.com/).

1.  Push code to GitHub.
2.  Import project into Vercel.
3.  Add the Environment Variables in Vercel project settings.
4.  Deploy!
