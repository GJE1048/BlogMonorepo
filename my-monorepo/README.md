# My Monorepo

This is a monorepo project structure for a blogging system built with modern technologies. It includes a frontend application, an admin panel, and a backend API, all organized in a monorepo format using Turborepo and pnpm.

## Project Structure

```
my-monorepo
├── apps
│   ├── web                     # Next.js frontend application for the blog
│   ├── admin                   # Admin panel built with Vite and React
│   └── api                     # Express.js backend for the blog
├── libs
│   ├── ui                      # Custom Element Plus styled component library
│   ├── shared                  # Shared code across applications
│   ├── features                # Business feature modules
│   └── api-types               # API type definitions
├── docs                        # Documentation files
├── tools                       # Utility scripts and tools
├── configs                     # Configuration files
├── package.json                # Main package.json for the monorepo
├── pnpm-workspace.yaml         # Configuration for pnpm workspace
├── turbo.json                  # Configuration for Turborepo
├── tsconfig.json               # Base TypeScript configuration
└── .gitignore                  # Git ignore file
```

## Getting Started

To get started with this project, follow these steps:

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd my-monorepo
   ```

2. **Install dependencies:**
   ```
   pnpm install
   ```

3. **Run the development server:**
   - For the web app:
     ```
     cd apps/web
     pnpm dev
     ```
   - For the admin panel:
     ```
     cd apps/admin
     pnpm dev
     ```
   - For the API:
     ```
     cd apps/api
     pnpm dev
     ```

## Technologies Used

- **Frontend:** Next.js for the blog frontend and Vite for the admin panel.
- **Backend:** Express.js for the REST API.
- **Database:** PostgreSQL with Neon for database management.
- **UI Library:** Custom styled components based on Element Plus.
- **State Management:** tRPC for type-safe API calls.
- **Development Tools:** Turborepo for monorepo management and pnpm for package management.

## Documentation

Refer to the `docs` directory for detailed documentation on architecture, UI guidelines, contributing, and API specifications.

## Contributing

Contributions are welcome! Please refer to the `docs/contributing.md` file for guidelines on how to contribute to this project.