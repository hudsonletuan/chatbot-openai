# Chatbot OpenAI Project

<p align="center">
  <a href="https://chatbot.tuanle.top"><img height="30px" src="https://img.shields.io/badge/Live%20Demo-success.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tIFVwbG9hZGVkIHRvOiBTVkcgUmVwbywgd3d3LnN2Z3JlcG8uY29tLCBHZW5lcmF0b3I6IFNWRyBSZXBvIE1peGVyIFRvb2xzIC0tPg0KPHN2ZyB3aWR0aD0iODAwcHgiIGhlaWdodD0iODAwcHgiIHZpZXdCb3g9IjAgMCAxOTIgMTkyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiPjxjaXJjbGUgY3g9Ijk2IiBjeT0iOTYiIHI9Ijc0IiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMTIiLz48ZWxsaXBzZSBjeD0iOTYiIGN5PSI5NiIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjEyIiByeD0iMzAiIHJ5PSI3NCIvPjxwYXRoIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjEyIiBkPSJNMjggNzJoMTM2TTI4IDEyMGgxMzYiLz48L3N2Zz4%3D"></a>
</p>

## Overview

Chatbot OpenAI is a web-based chatbot application that helps users use OpenAI's GPT-3.5-Turbo and GPT-4 AI models via API keys without accessing the actual account. This web application is designed to be user-friendly, allowing users to interact with the chatbot through a simple interface.

## Features

- **User Authentication**: Users must log in to the application to start their chat.
- **Real-time Chat**: Users can send messages to the chatbot in real-time and receive responses.
- **Error Handling**: The application gracefully handles errors, such as invalid API keys, and provides clear feedback to the user.
- **Message Persistence**: Messages are stored in a database, allowing users to view their chat history upon logging back in.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- An OpenAI API key with access to the GPT-3.5-Turbo or GPT-4 model. You can find your API key at https://platform.openai.com/account/api-keys.

### Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory and run `npm install` to install the necessary dependencies.
3. Create a `.env` file in the project's root directory (if missing) and add your OpenAI API key (if necessary but **NOT** recommended) and any other required environment variables.
4. Start the server by running `npm start`.

### Usage

1. Open your web browser and navigate to `http://localhost:3000` (or the port specified in your environment variables).
2. Log in with your credentials or create a new account.
3. Start chatting with the chatbot by typing your message into the input field and pressing Enter or clicking the send icon next to the input field.

## Server-Side Implementation

The server-side of the application is built using Express.js and connects to a MongoDB database using Mongoose. The server handles user authentication, message storage, and communication with the OpenAI API.

### Key Endpoints

- `/login`: Authenticates users and manages user sessions.
- `/signup`: Create new users using username, email, and password which will be encrypted before sending to the database.
- `/api-key`: Save API keys and model names into the database from users' input.
- `/chat`: Handles the chat logic, including sending messages to the OpenAI API and storing responses.

### Error Handling

The server is designed to handle errors gracefully. When an error occurs, such as an invalid API key, the server responds with an appropriate error message.

## Client-Side Implementation

The client-side of the application is built using HTML, CSS, and JavaScript. It provides a user-friendly and simple interface for users to interact with the chatbot.

### Key Components

- `sendMessage`: An asynchronous function that sends user messages to the server and handles the response.
- `appendMessage`: A function that appends messages to the chat interface.

## Libraries/Packages

### Server-Side

- **Express.js**: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- **Mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js. It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB.
- **dotenv**: A zero-dependency module that loads environment variables from a `.env` file into `process.env`.
- **cors**: A package for providing a Connect/Express middleware that can be used to enable CORS with various options.
- **body-parser**: A middleware that parses incoming request bodies in a middleware before your handlers, available under the `req.body` property.
- **bcryptjs**: A library to help you hash passwords. It's a crucial security measure to protect user passwords by storing them in a hashed format rather than in plain text.

### Client-Side

- **Fetch API**: A modern, promise-based API for making asynchronous HTTP requests from the browser.

## Contributing

Contributions to the Chatbot OpenAI project are welcome. Please feel free to submit pull requests or open issues to discuss potential improvements or bug fixes.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.