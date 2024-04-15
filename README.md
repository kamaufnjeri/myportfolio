### myortfolio - MERN Stack
This is a portfolio website built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It showcases my projects, skills, and my blogs.

## Features
- Home: Introduction.
- About me: About me, skills and hobbies
- Projects: Showcase of my projects with descriptions and links.
- Blogs: Some of my blogs.
- Contact: Contact form to get in touch with me.
  
## Technologies Used
- Frontend: React.js, HTML, CSS, JavaScript
- Backend: Node.js, Express.js
- Database: MongoDB
- Deployment: render
  
## Installation
Clone the repository:
bash
Copy code
git clone https://github.com/kamaufnjeri/myportfolio.git
Navigate to the project directory:
bash
Copy code
cd myportfolio/portfolioProject
Install dependencies:
bash
Copy code
npm install
Set up environment variables:
Create a .env file in the root directory and add the following variables:
Copy code
REACT_APP_BACKEND_URL=http://localhost:3000
Replace http://localhost:3000 with the URL of your backend server if different.

Start the frontend server:
bash
Copy code
npm run dev
Start the backend server:
bash
Copy code
cd myportfolio/server
Install dependencies:
bash
Copy code
npm install
Set up environment variables:
Create a .env file in the root directory and add the following variables:
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
Replace http://localhost:5173 with the URL of your backend server if different.

npm start
Contributing
Contributions are welcome! Please open an issue or submit a pull request to suggest improvements or fixes.

License
This project is licensed under the BTS License.

