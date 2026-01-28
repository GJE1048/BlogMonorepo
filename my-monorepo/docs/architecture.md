# Project Architecture

## Overview
This document outlines the architecture of the my-monorepo project, which is designed to support a blog system with a frontend built using Next.js, an admin panel using Vite and React, and a backend powered by Express.js and PostgreSQL.

## Project Structure
The project is organized into a monorepo structure, which includes the following main directories:

- **apps/**: Contains the applications for the project.
  - **web/**: The frontend application built with Next.js.
  - **admin/**: The admin panel built with Vite and React.
  - **api/**: The backend service built with Express.js.

- **libs/**: Contains shared libraries and components.
  - **ui/**: A custom UI component library styled based on Element Plus.
  - **shared/**: Shared code, including types, utilities, and constants.
  - **features/**: Business feature modules that can be referenced by applications.
  - **api-types/**: Type definitions for API responses and requests.

- **docs/**: Documentation for the project, including architecture, UI guidelines, contributing guidelines, and API documentation.

- **tools/**: Utility scripts and tools for development and database management.

- **configs/**: Configuration files for ESLint, Prettier, and TypeScript.

## Applications

### 1. Web Application (Next.js)
- **Purpose**: Serves as the frontend for the blog, providing a user-friendly interface for visitors.
- **Key Features**:
  - Dynamic routing for blog posts.
  - Reusable components for consistent UI.
  - Integration with the backend API for data fetching.

### 2. Admin Panel (Vite + React)
- **Purpose**: Provides an interface for administrators to manage blog content, users, and settings.
- **Key Features**:
  - User authentication and authorization.
  - CRUD operations for blog posts and user management.
  - Responsive design for various devices.

### 3. API (Express.js)
- **Purpose**: Acts as the backend service, handling requests from the frontend and admin panel.
- **Key Features**:
  - RESTful API endpoints for blog and user management.
  - Middleware for security (CORS, Helmet).
  - Integration with PostgreSQL using Prisma for database management.

## Libraries

### 1. UI Library
- **Purpose**: A design system that provides reusable components with a consistent style.
- **Key Components**:
  - Buttons, cards, and layout components.
  - Theming support for customization.

### 2. Shared Code
- **Purpose**: Contains common utilities, types, and constants used across applications.
- **Key Features**:
  - Type definitions for TypeScript.
  - Utility functions for common tasks.

### 3. Features
- **Purpose**: Encapsulates business logic and features that can be reused across applications.
- **Key Modules**:
  - Authentication, blog management, and comments.

## Database
The project uses PostgreSQL as the database, managed through Prisma. The database schema is defined in the `prisma/schema.prisma` file, and the connection is configured in the backend API.

## Conclusion
This architecture provides a scalable and maintainable structure for the blog system, allowing for easy development and deployment of features across the frontend, admin panel, and backend services.