# Blogify Node 📝

A simple blog web application built with Node.js, Express.js, and EJS. Users can create, view, edit, and delete blog posts — all stored temporarily in memory (no database). This project focuses on CRUD operations, templating with EJS, and responsive styling.


[Blogify Screenshot]
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/3d17adf3-09e7-45ac-9c8a-dd7987bcbcf1" />


## 🚀 Features

- ✍️ Compose new blog posts
- 📄 View all blog posts on the home page
- 🔍 Read individual posts in full
- 📝 Edit and update existing posts
- ❌ Delete posts
- 💻 Responsive and clean UI using CSS (Flexbox/Grid)

## 🛠️ Built With

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [EJS](https://ejs.co/)
- HTML5 + CSS3 (Vanilla)

## 📁 Project Structure

blog-application/

	 ├── app.js
	 ├── package.json
	 ├── public/
		└── styles.css
	 ├── views/	
		├── home.ejs	
		├── compose.ejs		
		├── post.ejs	
		├── edit.ejs	
		└── partials/	
			├── header.ejs	
			└── footer.ejs

bash
Copy
Edit

## 🧑‍💻 Getting Started

### Prerequisites

- Node.js installed on your system
- Basic command line knowledge

### Installation

```bash
# Clone the repo
git clone https://github.com/Rush741/blog-application.git

# Move into the project folder
cd blog-application

# Install dependencies
npm install

# Run the app
node app.js
Open your browser and go to: http://localhost:3000

📌 Limitations
Posts are not saved between server restarts (no database used)

No authentication (anyone can create/edit/delete posts)


🧑‍🎓 Author
Rushikesh Jadhav & AI
📘 GitHub: @Rush741

Feel free to ⭐ this repository if you found it helpful!

---

Let me know if you want to include a live demo link (if you deploy it) or want a version with badge 
