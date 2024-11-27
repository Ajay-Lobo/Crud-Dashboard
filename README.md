# MERN Stack Client Management App

This is a simple client management application built with the MERN stack (MongoDB, Express, React, Node.js) and styled with Tailwind CSS and DaisyUI components. The app allows users to add, edit, delete, and view client information, with a focus on user-friendly UI design.

## Features

- **Add Clients**: Users can add new clients with details like name, email, job, rate, and status.
- **Edit Clients**: Edit existing client details.
- **Delete Clients**: Remove clients from the database.
- **Search Clients**: Search clients based on name, email, job, or rate.
- **Responsive UI**: The app is fully responsive, thanks to Tailwind CSS and DaisyUI.


## Technologies Used

- **MongoDB**: NoSQL database to store client data.
- **Express.js**: Web framework for Node.js to handle backend routes.
- **React.js**: Frontend library for building the user interface.
- **Node.js**: JavaScript runtime to run the backend server.
- **Tailwind CSS**: Utility-first CSS framework for custom styling.
- **DaisyUI**: A set of Tailwind UI components to speed up development and provide a beautiful UI.
- **Axios**: For making HTTP requests from the frontend to the backend.
- **Mongoose-Sequence** : For auto-incrementing IDs

## Environment Variables

To run the server, you need to set up the following environment variables in a `.env` file inside server folder:

```plaintext
PORT=<port_number>               
MONGO_URI=<your_mongoDB_connection_string>  

