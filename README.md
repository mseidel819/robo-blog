For a Live demo, Go <a href="https://robo-blog.vercel.app/" target="_blank">here</a>.

# Robo Blog

Robo Blog is a web application built with [React](https://reactjs.org/), [Next.js](https://nextjs.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) that allows the author(me) to upload and update articles directly to an article folder in the code using markdown. Users are then allowed to sign in using Next-Auth and send me messages and comment on the articles. Comments have all standard CRUD operations, and can also be upvoted/downvoted.

## Installation

To run Robo Blog locally on your machine, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/mseidel819/robo-blog.git
   ```

2. Install dependencies:

   ```bash
   cd robo-blog
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

The application should now be running on http://localhost:3000.

## Features

- Article Listing: View a list of articles with their titles and summaries.
- Article Details: Click on an article to view its full details.
- Authentication: sign up and log in using email and password.
- Create Comment: Create a new article with a title, content, and optional image.
- Update Comment: Edit the title, content, or image of an existing article.
- Delete Comment: Remove an article from the blog.

## Technologies Used

React: JavaScript library for building user interfaces.
Nextjs: React framework.
Redux Toolkit: Toolset for efficient Redux development.
Redux-logger: Development middleware for logging Redux state.
MongoDB: Database storage for comments.
TypeScript: For type safety.
next-auth: For authenticating users.
Bcrypt: For encrypting passwords

## Contributing

Contributions to Robo Blog are welcome! If you encounter any bugs, have suggestions for improvements, or would like to add new features or articles, feel free to open an issue or submit a pull request.
