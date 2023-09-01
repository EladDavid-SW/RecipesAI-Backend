# RecipesAI-Backend

[Visit RecipesAI Website](https://elad-ai-recipes.netlify.app) <br/>
[Go to the RecipesAI-Frontend Repository](https://github.com/EladDavid-SW/RecipesAI-Frontend) 
---

## Table of Contents

- [Introduction](#introduction)
- [Details](#details)
- [Getting Started](#getting-started)
- [Contact](#contact)

---

## Introduction

Welcome to the RecipesAI-Backend repository! This is the backend component of the RecipesAI project, responsible for managing data and handling real-time interactions with the frontend.

**Project Highlights:**

- Integration with ChatGPT for recipe generation.
- Integration with DALL·E for dynamic image generation.
- Efficient management of grocery resources and associated images.
- Storage of images in an S3 bucket.
- Background worker for image generation.
- Real-time functionality using WebSocket.
- Deployment on Heroku.
- MongoDB Atlas as the database.
- Environment variables in the .env file.

---

## Details

Here are some important details about the RecipesAI-Backend:

- **Image Storage**: The project utilizes an S3 bucket to store images efficiently.

- **Background Worker**: To increase efficiency, a background worker is employed for image generation tasks.

- **Real-Time Functionality**: Real-time interactions are implemented using WebSocket, allowing seamless collaboration across multiple clients.

- **Deployment**: The backend is deployed on Heroku, ensuring accessibility.

- **Database**: MongoDB Atlas serves as the database, offering scalability and robust data management.

- **Integration with ChatGPT and DALL·E**: The backend integrates with ChatGPT and DALL·E using APIs for recipe generation and dynamic image creation.

- **Environment Variables**: There is a .env file that contains necessary configuration details. You can use the `_env` file as a reference to see the required variables and apply your credentials.

---

## Getting Started

To set up and run this project, follow these steps:

1. **Clone the Repository:**

```bash
git clone https://github.com/your-username/RecipesAI-Backend.git
```


2. **Install Dependencies:**

```bash
npm install
```

3. **Start the Development Server:**

```bash
npm start
```

Make sure to configure the necessary environment variables in your .env file.

## Contact
If you have any questions, suggestions, or simply want to connect, don't hesitate to reach out to the project's creator:

- **Name**: Elad
- **Email**: elad.david5@gmail.com

Your feedback and collaboration are greatly appreciated.

Thank you for exploring the RecipesAI-Backend repository. Enjoy the efficiency and functionality it brings to the RecipesAI project!


