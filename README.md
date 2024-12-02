# Frontend for Product Dashboard

This is the frontend application for a Product Dashboard built with React and TypeScript. It provides a user interface for authentication,and CSV file upload for bulk product import.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Technology Stack](#technology-stack)
3. [Getting Started](#getting-started)
   - [Cloning the Repository](#cloning-the-repository)
   - [Installing Dependencies](#installing-dependencies)
   - [Environment Variables](#environment-variables)
4. [Running the Application](#running-the-application)

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- Node.js (v21 or later)
- npm (v10 or later)
- Git

## Technology Stack

- React
- TypeScript
- React Router (for routing)
- Axios (for API requests)
- shadcn/ui (for UI components)
- React Hook Form (for form handling)
- Tailwind CSS (for styling)

## Getting Started

### Cloning the Repository

1. Open your terminal.
2. Clone the repository:

### Installing Dependencies

1. Navigate to the project directory: `cd product-dashboard-ui`
2. Install the dependencies: `npm install`

### Environment Variables

This project uses environment variables for configuration. Create a `.env` file in the root directory with the following variables:

Replace the placeholder values with your actual configuration:
- `VITE_API_URL`: URL of backend application.  

**Important:** Never commit your `.env` file to version control. Add it to your `.gitignore` file.

### Setting Up Environment Variables

Refer to the [Environment Variables](#environment-variables) section for detailed information on setting up your `.env` file.

## Running the Application

### Development Mode

1. Start the development server: `npm run dev`

### Production Build

1. Build the application: `npm run build`
2. Run the built application: `npm run preview`
