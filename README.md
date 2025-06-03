![Logo](https://github.com/that-VeeJay/postbox/blob/main/web/public/postbox-min.png)
[![Facebook](https://img.shields.io/badge/Facebook-Profile-blue?logo=facebook)](https://www.facebook.com/veejay.omisol.1/)

## What you can do in Postbox
- Create blog post
    - [x]  Generate content boilerplate with AI
    - [x]  Assign a category
    - [x]  Add a cover image
    - [ ]  Save as draft
- Manage Blog post
    - [x]  Like posts
    - [x]  Delete published posts
    - [ ]  Edit published posts
    - [ ]  Bookmark a post
    - [x]  View posts by category
    - [ ]  Add comments to a post
        - [ ]  Edit, Delete a comment
        - [ ]  Like other comments
- Profile
    - [x]  View published post
    - [ ]  View saved posts
    - [ ]  View followed authors
    - [x]  Edit Profile
        - [x]  Name, Bio, Location, Profile Picture
    - [x]  Edit Account Settings
        - [ ]  Change email
        - [ ]  Change password
        - [ ]  Delete account
- Users
    - [ ]  Follow other authors
        - [ ]  View profile and posts
- Other features







## 💻 Tech Stack

**Client:** React.js, Tailwind CSS, Shadcn

**Server:** Laravel, Laravel Sanctum

**Database:** MySQL, XAMPP (for local development)

**LLM Provider:** Groq

**Extras:** TanStack Query, React Router

## 🚀 Local Installation

### 1. Clone the Repository

```bash
  git clone https://github.com/that-VeeJay/postbox.git
  cd postbox
```

### 2. Backend Setup (Laravel API)

#### Install dependencies
```bash
  cd api
  composer install
```

#### Copy and configure environment file
```bash
  cp .env.example .env
  php artisan key:generate
```
#### Update the .env file with your database credentials:
```bash
  DB_CONNECTION=your_connection
  DB_HOST=your_host
  DB_PORT=your_port
  DB_DATABASE=your_database
  DB_USERNAME=your_root
  DB_PASSWORD=
```
#### Setup your database
```bash
  php artisan migrate
```
#### Serve the API
```bash
  php artisan serve
```
By default, it will be accessible at: http://127.0.0.1:8000. Check your terminal output for the exact URL.

### 3. Frontend Setup (React)

#### Install dependencies
```bash
  cd web
  npm install
```

#### Configure environment variables
```bash
  cp .env.example .env
  VITE_API_BASE_URL=base_url
```

#### Start the Vite development server
```bash
  npm run dev
```

### 3. GROQ Setup (AI Content generator)

Create your own API key in [GROQ](https://console.groq.com/home)

#### Configure environment variables in `.env`
```bash
  VITE_GROQ_API_KEY=your_api_key
  VITE_LARGE_LANG_MODEL=preferred_model
```



## 🤝 Feedback

If you have any feedback, please reach out at veejayomisol1@gmail.com

- 🐛 **Found a bug?** [Report it here!](https://github.com/that-VeeJay/postbox/issues)
- 💡 **Have an idea?** [Suggest a feature!](https://github.com/that-VeeJay/postbox/discussions/new?category=ideas)
## License

[MIT](https://choosealicense.com/licenses/mit/)
