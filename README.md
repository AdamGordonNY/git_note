# GitNote

GitNote is a dedicated hub designed for learners and educators alike, offering a seamless experience for storing insights, guiding learning journeys, and tracking progress. Built with Next.js, GitNote emphasizes clean code, best practices, and a user-centric design. Whether you're jotting down quick notes, tracking your learning goals, or sharing insights with the community, GitNote is your go-to platform.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Screenshots](#screenshots)
- [License](#license)
- [Contact](#contact)

## Features

- **Authentication**: Secure login via email/password, GitHub, and Google.
- **Authorization**: Robust system controlling access based on user roles.
- **Onboarding Process**: Streamlined onboarding similar to LinkedIn's flow.
- **Profile Management**: Users can manage profiles, including learning goals and social media links.
- **Post Management**: Create, edit, and delete posts with support for tags and code snippets.
- **Home Page**: A dynamic feed displaying community posts with filters.
- **Explore Page**: Access via a command palette for quick document search.
- **Search & Filters**: Comprehensive search functionality across the platform.
- **Contribution Grid**: Visual representation of user activity, akin to GitHub's contribution graph.
- **Responsive Design**: Fully responsive layout across all devices.
- **Light & Dark Mode**: Users can toggle between themes.

## Technologies Used

- Next.js (TypeScript)
- Tailwind CSS
- MongoDB & Mongoose
- NextAuth.js
- React Query

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- MongoDB

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/gitnote.git
```

2. Install NPM packages

cd gitnote
npm install

3. Set Up Environemnt Variables

MONGODB_URI=your_mongodb_uri
NEXTAUTH_URL=<http://localhost:3000>
GITHUB_ID=your_github_id
GITHUB_SECRET=your_github_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret 4. Start the Development Server
npm run dev
