# Nexus - Services Marketplace

A high-fidelity prototype for a hyperlocal and global services marketplace connecting customers with verified entrepreneurs.

## 📂 Project Structure for Local Development

To run this project locally in VS Code, please organize the downloaded files into the following structure:

```
/nexus-project
│
├── /frontend               # React Application
│   ├── /public
│   │   └── index.html      # Move index.html here
│   ├── /src
│   │   ├── /components     # Move all components/*.tsx here
│   │   ├── /pages          # Move all pages/*.tsx here
│   │   ├── /services       # Move services/*.ts here
│   │   ├── App.tsx         # Move App.tsx here
│   │   ├── main.tsx        # Rename index.tsx to main.tsx and move here
│   │   └── types.ts        # Move types.ts here
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── tsconfig.json
│
├── /backend                # Node.js Express API
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── README.md
```

## 🚀 How to Run

### 1. Frontend Setup
1.  Navigate to the `frontend` folder.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in `frontend/` and add your Gemini API Key if running client-side AI:
    ```
    VITE_GEMINI_API_KEY=your_api_key_here
    ```
4.  Run the development server:
    ```bash
    npm run dev
    ```

### 2. Backend Setup (Optional)
1.  Navigate to the `backend` folder.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file based on `.env.example` and add your API Key.
4.  Start the server:
    ```bash
    npm run dev
    ```

## 🛠 Stack

*   **Frontend:** React 19, Vite, Tailwind CSS, Lucide Icons, Recharts.
*   **Backend:** Node.js, Express.
*   **AI:** Google Gemini API (@google/genai).

## ⚠️ Note on React Native
This codebase is built using **React DOM (Web)**. To convert this to React Native, you would need to replace HTML elements (`div`, `span`, etc.) with React Native components (`View`, `Text`) and use a navigation library like React Navigation. The logic and state management, however, are reusable.
