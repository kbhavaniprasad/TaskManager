# Taskmanager



## Setup
1. Clone the repo: `git clone <your-repo-url>`
2. Install dependencies: `npm install` (both in root and frontend folder)
3. Create a `.env` file with `MONGO_URI=<your-mongodb-uri>`
4. Start the server: `node index.js`
5. Start the frontend: `npm start` (in the frontend folder)

## API Endpoints
- **GET /tasks**: Retrieve all tasks
  - Response: `[{ "_id": "123", "title": "Task 1", "completed": false }]`
- **POST /tasks**: Create a task
  - Request: `{ "title": "New Task", "description": "Details" }`
  - Response: `{ "_id": "124", "title": "New Task", "completed": false }`

## Testing
- Use Postman to send requests to `http://localhost:5000/tasks`.
