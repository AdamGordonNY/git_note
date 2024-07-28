# GitNote

GitNote is a dedicated hub designed for learners and educators alike, offering a seamless experience for storing insights, guiding learning journeys, and tracking progress. Built with Next.js, GitNote emphasizes clean code, best practices, and a user-centric design. Whether you're jotting down quick notes, tracking your learning goals, or sharing insights with the community, GitNote is your go-to platform.

## Thumbnail

<img src="https://gitnote.s3.us-east-2.amazonaws.com/GitNote.png" alt="gitnote" />

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

- **Authentication/Authorization**: Secure login via email/password, GitHub, and Google, using NextAuth.
- **Onboarding Process**: Streamlined onboarding steps to set a baseline for your learning goals.
- **Profile Management**: User's can use their profiles as a mini summary of their educational goals and experiences.
- **Contribution Grid**: Modeled off github,
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
- React-hook-form
- Zod validation
- shadcn-ui components
- CMD+K
- Cloudinary Image Storage

<img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="nextdotjs" />

<img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />

<img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />

### ⚒️ How to Contribute

Want to contribute? Great!

To fix a bug or enhance an existing module, follow these steps:

- Fork the repo
- Create a new branch (`git checkout -b improve-feature`)
- Make the appropriate changes in the files
- Add changes to reflect the changes made
- Commit your changes (`git commit -am 'Improve feature'`)
- Push to the branch (`git push origin improve-feature`)
- Create a Pull Request

### 📩 Bug / Feature Request

If you find a bug (the website couldn't handle the query and / or gave undesired results), kindly open an issue [here](https://github.com/username/projectname/issues/new) by including your search query and the expected result.

If you'd like to request a new function, feel free to do so by opening an issue [here](https://github.com/username/projectname/issues/new). Please include sample queries and their corresponding results.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- MongoDB

### Installation

1. Clone the repository:

```bash
git clone https://github.com/agordon123/git_note.git
```

2.Install NPM packages

cd git_note
npm install

3. Set Up Environemnt Variables

```
GITHUB_CLIENT_ID=
MONGODB_URI=
GOOGLE_CLIENT_SECRET=
GOOGLE_CLIENT_ID=
NEXTAUTH_SECRET=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_TINYMCE_API_KEY=
```
