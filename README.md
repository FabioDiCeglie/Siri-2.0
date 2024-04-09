# NextJS 14 Server Actions with Azure Whisper AI and Azure OpenAI

## Project Overview

This project is a Next.js 14 with TypeScript application that leverages Server Actions, Azure Whisper AI, Azure OpenAI, MediaStream API, and Web Speech AI to create a virtual assistant similar to Siri 2.0. The application transforms voice input into text using Azure Whisper AI, processes the text to generate a response using Azure OpenAI, and then converts the response into audio using the MediaStream API and Web Speech AI. The project also utilizes Tailwind CSS for styling.

<img width="835" alt="Siri 2 0" src="https://github.com/FabioDiCeglie/Siri-2.0/assets/93951206/e9e8b369-e1f8-46ee-98ae-2ede48ec325b">

## Features

- Voice input transformation using Azure Whisper AI.
- Text processing and response generation using Azure OpenAI.
- Utilized MediaStream API for capturing audio input.
- Audio response using Web Speech AI.

## Setup

1. Clone the repository to your local machine:

    ```
    git clone git@github.com:FabioDiCeglie/Siri-2.0.git
    ```

2. Navigate to the project directory:

3. Install dependencies:

    ```
    npm install
    ```

4. Set up Azure services:
    - Create accounts for Azure Whisper AI and Azure OpenAI if you haven't already.
    - Obtain the necessary API keys and configure them in the project.
    - Follow Azure documentation for guidance on how to set up and obtain API keys.

5. Start the development server:

    ```
    npm run dev
    ```

6. Access the application in your browser:

    ```
    http://localhost:3000
    ```

## Usage

1. Click on the microphone icon to activate voice input.
2. Speak your command or question clearly into the microphone.
3. Wait for the application to process your input and generate a response.
4. Listen to the response.

## Deployment

This project is deployed with Vercel. You can access the live version of the application [here](https://siri-ai-six.vercel.app/).

## Technologies Used

- Next.js 14
- TypeScript
- Azure Whisper AI
- Azure OpenAI
- MediaStream API
- Web Speech API
- Tailwind CSS