# File Management Platform

### Overview
This project serves as a comprehensive summary of the backend concepts covered during this trimester, including authentication NodeJS, MongoDB, Redis, pagination, and background processing. The objective is to build a simple platform that allows users to upload and view files.

### Features
- User Authentication: Secure user login and authentication via token-based authentication.
- **File Management**:
  - List all files
  - Upload new files
  - Change file permissions
  - View files
  - Image Processing: Generate thumbnails for uploaded images.

### Technologies Used
- **Node.js**: Server-side JavaScript runtime.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing file metadata and user information.
- **Redis**: In-memory data structure store for caching and session management.
- **JWT** (JSON Web Token): For secure user authentication.
- **Multer**: Middleware for handling file uploads.
- **Sharp**: For image processing and thumbnail generation.
