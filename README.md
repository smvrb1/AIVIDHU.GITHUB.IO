# AI Video Generator Site (Node.js + Express)

## Features
- Upload an image and enter a prompt to generate an AI video using RunwayML
- Modern, responsive, colorful UI
- Secure backend proxy for API calls

## Getting Started

### 1. Install Dependencies
```
npm install express node-fetch
```

### 2. Run Locally
```
node server.js
```
Visit [http://localhost:3000](http://localhost:3000)

### 3. Deploy Free on Render.com
1. Push your code to GitHub
2. Go to [https://render.com/](https://render.com/) and sign up
3. Click "New Web Service" > Connect your GitHub repo
4. Set build command: `npm install`
5. Set start command: `node server.js`
6. Add environment variable if you want to keep your API key secret
7. Deploy!

### 4. Get a Free Domain
- Register a free domain at [https://www.freenom.com/](https://www.freenom.com/)
- In Render.com dashboard, go to your service > Settings > Custom Domains
- Add your domain and follow the DNS instructions

---

## Project Structure
```
/public         # Static frontend (HTML, CSS, JS)
server.js       # Express backend
README.md       # This file
```

---

## Security Note
- Never expose your RunwayML API key in frontend JS. The backend proxy keeps it safe. 