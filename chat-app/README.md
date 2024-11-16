# Chat Application with CI/CD Pipeline

This is a full-stack chat application with automated CI/CD pipeline using CircleCI.

## Pipeline Features

- Automated builds triggered on git push
- Parallel execution of backend and frontend builds
- Dependency caching for faster builds
- Artifact storage
- Test results reporting
- Automatic deployment to CircleCI Pages

## Accessing the Deployed Application

The frontend is automatically deployed to CircleCI Pages on every successful build of the main branch.
You can access the live application at: `https://chat-app.circleci.pages.dev`

## Components

### Backend
- Java-based WebSocket server
- Maven build system
- Automated testing

### Frontend
- React-based user interface
- npm package management
- Automated building and testing
- Static deployment through CircleCI Pages

## Running Locally

### Prerequisites
- Node.js (v16.x or later)
- Java JDK 17
- Maven

### Starting the Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Build and run the backend server:
   ```bash
   mvn spring-boot:run
   ```
   The WebSocket server will start on `ws://localhost:8080/chat`

### Starting the Frontend
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
   The frontend will be accessible at `http://localhost:3000`

## Features

- Real-time messaging
- Automatic reconnection
- Message persistence during session
- Clean user interface
- Connection status indicator

## Deployment Process

The application uses CircleCI for continuous deployment:

1. On every push to the main branch:
   - Backend is built and tested
   - Frontend is built and automatically deployed to CircleCI Pages
   - Static site is accessible at chat-app.circleci.pages.dev

2. Deployment Status:
   - Check the CircleCI dashboard for build and deployment status
   - Green build indicates successful deployment
   - The latest version is automatically published to CircleCI Pages

## Troubleshooting

1. If the frontend fails to connect:
   - Ensure the backend server is running on port 8080
   - Check browser console for connection errors
   - Verify WebSocket URL in App.js matches backend port

2. If the backend fails to start:
   - Verify port 8080 is not in use
   - Ensure Java 17 is installed and properly configured
   - Check Maven installation

3. If the frontend fails to start locally:
   - Verify Node.js installation
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and run `npm install` again

4. If the deployed site is not accessible:
   - Check CircleCI build status for any deployment failures
   - Verify the correct URL: chat-app.circleci.pages.dev
   - Clear browser cache and try again
