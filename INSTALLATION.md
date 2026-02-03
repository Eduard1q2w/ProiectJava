# Coffee Shop App - Installation Guide

Welcome! This guide will help you download and run the Coffee Shop MERN application on your local machine.

## Prerequisites

Before you begin, make sure you have the following installed on your computer:

1.  **Node.js**: [Download and install Node.js](https://nodejs.org/). (Version 18 or higher recommended)
2.  **Git**: [Download and install Git](https://git-scm.com/).
3.  **MongoDB**: You need a running MongoDB instance.
    *   **Option A (Easiest)**: Install [MongoDB Community Server](https://www.mongodb.com/try/download/community) locally.
    *   **Option B**: Use [MongoDB Atlas](https://www.mongodb.com/atlas) for a cloud database.

## Step 1: Download the Project

1.  Open your terminal (Command Prompt, PowerShell, or Terminal).
2.  Clone the repository using Git (replace `YOUR_REPO_URL` with the actual link after you upload it):
    ```bash
    git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
    ```
3.  Navigate into the project folder:
    ```bash
    cd "Tema Proiect"
    ```
    *(Note: The folder name might differ if you renamed it during cloning)*

## Step 2: Setup the Backend (Server)

1.  Navigate to the `server` folder:
    ```bash
    cd server
    ```

2.  Install the necessary dependencies:
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**:
    Create a new file named `.env` inside the `server` folder.
    Open it with any text editor (Notepad, VS Code) and paste the following configuration EXACTLY:

    ```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/coffee-shop
    JWT_SECRET=059d9ab40dcabba1eec2cca4e3f3c11cba5ca551afb36a9538763bad9af0c4d1
    CLOUDINARY_CLOUD_NAME=dztu4fw7i
    CLOUDINARY_API_KEY=846756967813974
    CLOUDINARY_API_SECRET=MOHfZv3RMrHVahedKN4jA1l7Cc8
    ```
    > **Note**: These keys are provided for ease of testing. For a production app, never share your secret keys publicly!

4.  Start the server:
    ```bash
    npm start
    ```
    You should see a message saying "Server running on port 5000" and "MongoDB Connected".

    *Keep this terminal window open!*

## Step 3: Setup the Frontend (Client)

1.  Open a **new** terminal window (do not close the server one).

2.  Navigate to the project folder and then into `client`:
    ```bash
    cd "Tema Proiect"
    cd client
    ```

3.  Install dependencies:
    ```bash
    npm install
    ```

4.  Start the application:
    ```bash
    npm run dev
    ```

5.  Open your browser and visit: `http://localhost:3000`

## Troubleshooting

-   **MongoDB Error**: Ensure your MongoDB server is running. If you installed it locally, it usually runs automatically as a background service.
-   **Port in Use**: If port 3000 or 5000 is taken, the terminal will usually ask if you want to use a different port. Say "yes".

## Enjoy!
You can now browse the menu, add items to the cart, and login.
