# Chat App Framework

Welcome to the **Chat App Framework** repository! This project aims to provide a flexible and scalable framework for building real-time chat applications, supporting both client and server functionalities.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [MVC Architecture](#mvc-architecture)
- [License](#license)

## Features
- Real-time communication between clients
- Modular architecture for easy feature expansion
- User authentication
- Multiple chat rooms support
- Simple WebSocket-based messaging protocol
- Scalable client and server model

## Technologies Used
- **Java**: Backend server framework using servlets
- **Maven**: Build and dependency management tool
- **WebSocket**: Real-time communication between server and clients
- **React** (Optional): Used for creating a simple web-based client UI

## Getting Started

To get a local copy up and running, follow these steps:

### Prerequisites

- **Java 11 or higher**: Ensure you have Java Development Kit (JDK) installed.
- **Node.js**: You need to have Node.js installed. You can download it from [Node.js Official Website](https://nodejs.org/).
- **Maven**: Maven is required to build the backend.
- **Git**: Git should be installed for cloning the repository.

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/jazu1412/CHAT_APP_FRAMEWORK_1.git
   ```

2. Navigate to the project directory
   ```bash
   cd CHAT_APP_FRAMEWORK_1
   ```

### Running the Application

#### Backend

1. Navigate to the backend directory and package the application
   ```bash
   cd chat-app/backend && mvn clean package
   ```

2. Start the backend server
   ```bash
   java -jar target/chat-app-backend-1.0-SNAPSHOT.jar server config.yml
   ```

#### Frontend

1. Navigate to the frontend directory and start the application
   ```bash
   cd chat-app/frontend && npm start
   ```
   The frontend will start at `http://localhost:3000` by default.

## Usage
- Once the server is running, you can connect via the web client or another WebSocket client.
- Use multiple browsers or devices to test real-time communication between different users.
- Create chat rooms and invite users to join in real time.

## Project Structure
- **backend/**: Contains the server-side code implemented in Java, using servlets and WebSocket.
- **frontend/**: Contains the React client application.
- **config/**: Configuration files for the backend server.
- **public/**: Static files for the web application.

## MVC Architecture


