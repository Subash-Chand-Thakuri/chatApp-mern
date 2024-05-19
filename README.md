# ChatApp-Mern 

![Project Banner](https://cdn.pixabay.com/animation/2022/11/16/11/48/11-48-15-802_512.gif)

This is chat app based on the mern stack , I have used different technologies like typescript for backend and frontend , deploy it one vercel and render , implemented socket.io for realtime-communication and so on:

## Table of Contents
- [Project Structure](#project-structure)
- [Installation](#installation)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Usage](#usage)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Details](#setup-details)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)



## Project-Structure
```plaintext
/root-dir
  ├── backend
  │   ├── src
  │   ├── dist
  │   ├── package.json
  │   └── tsconfig.json
  ├── frontend
  │   ├── src
  │   ├── public
  │   ├── package.json
  │   └── tsconfig.json
  |── README.md
  └── ...
```

## Installation


### Prerequisites

- Node.js
- npm or yarn

### Backend

1. Navigate to the backend directory:

```bash
cd backend
```
2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Build the project:

```bash

npm run build
# or
yarn build
```

4. Start the server:

```bash
npm start
# or
yarn start
```
### Frontend

1. Navigate to the frontend directory:

```bash
cd frontend
```
2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```




## Usage
We can use this application real time chatting with each othes.


<div align="">

  #### First sign-up to the page
  
  <a target="_blank" rel="noreferrer"><img align="center" src="https://res.cloudinary.com/diemdrcq6/image/upload/v1716093701/signup_qq3c26.png" alt="gptClone" width="450" height="330" />
  </a>
  
  <br>

  #### Login to the page
  
  <a target="_blank" rel="noreferrer"><img align="center" src="https://res.cloudinary.com/diemdrcq6/image/upload/v1716093701/login_dsz6at.png" alt="gptClone" width="400" height="330" />
  </a>
  
  <br>

  #### Explore user interface
  
  <a target="_blank" rel="noreferrer"><img align="center" src="https://res.cloudinary.com/diemdrcq6/image/upload/v1716093700/ui_pfbvph.png" alt="gptClone" width="450" height="330" />
  </a>

  
  
  <br>

  #### Search other users to chat
  
  <a target="_blank" rel="noreferrer"><img align="center" src="https://res.cloudinary.com/diemdrcq6/image/upload/v1716093700/searchUsers_rzxt81.png" alt="gptClone" width="450" height="330" />
  </a>

  
  <br>

  #### Do real-time messaging on both sides
  
  <a target="_blank" rel="noreferrer"><img align="center" src="https://res.cloudinary.com/diemdrcq6/image/upload/v1716093700/socket-io_mbswie.png" alt="gptClone" width="600" height="330" />
  </a>

  
  <br>

  #### Create group for chatting
  
  <a target="_blank" rel="noreferrer"><img align="center" src="https://res.cloudinary.com/diemdrcq6/image/upload/v1716093700/createGroup_fponv5.png" alt="gptClone" width="450" height="330" />
  </a>

  
  <br>

  #### Leave or rename group
  
  <a target="_blank" rel="noreferrer"><img align="center" src="https://res.cloudinary.com/diemdrcq6/image/upload/v1716093700/leaveGroup_jpdpkx.png" alt="gptClone" width="400" height="330" />
  </a>
  
  <br>

  #### View Profile
  
  <a target="_blank" rel="noreferrer"><img align="center" src="https://res.cloudinary.com/diemdrcq6/image/upload/v1716093700/viewProfile_rbqrh1.png" alt="gptClone" width="400" height="330" />
  </a>

  
</div>

<strong>
  *We can logout, get notifications and so on from this app*
</strong>


## Technologies Used

- Backend:
    - Node.js
    - Express.js
    - Typescript

- Frontend:
    - React.js
    - Vite
    - Typescript
    - Chakra-ui
    - Material-ui
    - Lottie-files

## Setup Details

### Backend Setup
1. Typescript Setup:
- Since Node.js directly does not accept Typescript so we have to compile it to javascript using tsconfig.ts in backend root directory

2. Node.js Compiler
- tsconfig.json 
```json
{
  "compilerOptions": {
    "target": "ES2020",                                  /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
    "module": "NodeNext", 
                                    /* Specify what module code is generated. */
    "rootDir": "./src",                                    /* Specify the root folder within your source files. */
    "moduleResolution": "NodeNext",                      /* Use Node's module resolution algorithm. */
    "outDir": "./dist",                                    /* Specify an output folder for all emitted files. */
    "esModuleInterop": true,                             /* Enables emit interoperability between CommonJS and ES Modules via the 'default' keyword. */
    "forceConsistentCasingInFileNames": true,            /* Disallow inconsistently-cased references to the same file. */
    // "skipLibCheck": true,                                /* Skip type checking of declaration files. */
    "strict": true,                                      /* Enable all strict type-checking options. */
    "resolveJsonModule": true , 
    "skipLibCheck": true,                          /* Include modules for handling JSON files. */
    "typeRoots": ["./node_modules/@types", "./types"],
    "noImplicitAny": false
  },
  "ts-node": {
    "esm": true
  },
  "include": ["src/**/*.ts", "env.d.ts",  "types/**/*"]
}

```
- After this the compile javascript code is build and found inside the dist directory

3. Scripts 
- Add the scripts in `package.json` for building and running the server.

```json
"scripts": {
    "start": "node dist/server.js",
    "build": "tsc",
    "watch": "tsc --watch",
    "dev":"nodemon dist/server.js"
  }

```

- Use `npm run start` while production, `npm run dev` for developement
- Run `npm run watch` before runnung `npm run dev` , it helps to detect changes at typescript and compile that changes continously

### Frontend Setup
1. Vite Setup:
- Create a New Vite Project: Open your terminal and run the following command to create a new Vite project with React and TypeScript template:
```sh 
npm create vite@latest frontend-app -- --template react-ts
```
- Navigate to Your Project Directory: Change into your new project directory:
```sh
cd frontend-app
```
- Install Dependencies: Inside your project directory, install the necessary dependencies:
```sh
npm install
```
- Start the Development Server: Launch the development server:
```sh
npm run dev
```
2. Build and Optimize for Production: When you’re ready to build your application for production, use:
```sh
npm run build
```
This command generates a dist folder with optimized assets ready for deployment.

- Provide the vite.config.ts like this file .
```bash
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  }
});
```
### Developement & Production :
- Ensure `package.json`:
```bash
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "serve": "vite preview"
  }
}
```
## Deployment Information:
1. I have deployed  the backend and frontend app separately:
  - backend at render.io
  - frontend at vercel
2. After deploying both backend and frontend , use api of deployed backend for communucation between frontend and backend by replacing the localhos url with deployed version of url



