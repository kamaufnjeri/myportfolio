### MyPortfolio - MERN Stack

This is a portfolio website built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It showcases my projects, skills, and blogs.

## Features

- **Home**: Introduction.
- **About Me**: Overview of my skills, hobbies, and personal information.
- **Projects**: Showcase of my projects with descriptions and links.
- **Blogs**: Collection of my blog posts.
- **Contact**: Contact form to get in touch with me.

## Technologies Used

- **Frontend**: React.js, HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Deployment**: Render

## Installation

1. **Clone the repository**:

```bash
git clone https://github.com/kamaufnjeri/myportfolio.git
```

2. **Navigate to the project directory**:

```bash
cd myportfolio/portfolioProject
```

3. **Install dependencies**:

```bash
npm install
```

4. **Set up environment variables**:

Create a `.env` file in the root directory and add the following variables:

```
REACT_APP_BACKEND_URL=http://localhost:3000
```

Replace `http://localhost:3000` with the URL of your backend server if different.

5. **Start the frontend server**:

```bash
npm run dev
```

6. **Start the backend server**:

```bash
cd myportfolio/server
npm install
```

Create a `.env` file in the root directory and add the following variables:

```
PORT=3000
MONGODB_URL='your_mongodb_database_url'
SECRETKEY='your_secret_key'
CLOUDINARY_NAME='your_cloudinary_api_name'
CLOUDINARY_KEY='your_cloudinary_api_key'
CLOUDINARY_SECRET='your_cloudinary_api_secret'
GOOGLE_EMAIL='your_google_email_to_send_contact_me_message'
GOOGLE_RECIPIENT_EMAIL='your_google_email_to_receive_contact_me_message'
GOOGLE_PWD='your_google_application_password_for_sending_email'
FRONTEND_URL=http://localhost:5173
```

Replace `http://localhost:5173` with the URL of your backend server if different.

```bash
npm start
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request to suggest improvements or fixes.

## License

This project is licensed under the [BSD 2-Clause License](LICENSE).
