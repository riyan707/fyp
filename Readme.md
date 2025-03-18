# 🚀 **Project Setup Guide**

Welcome to your project! Follow this guide to set up, run, and manage the **frontend, backend, and database** effortlessly.

---

## 📌 **Prerequisites**
Ensure you have the following installed **before proceeding**:

- 🛠 **Git** → [Download here](https://git-scm.com/)
- 🟢 **Node.js & npm** → [Download here](https://nodejs.org/)
- 🗄 **PostgreSQL** → [Download here](https://www.postgresql.org/download/)
- 🐳 **Docker** (Optional) → [Download here](https://www.docker.com/)

---

## 🔹 **1. Clone the Repository**
```sh
# Clone the repo
git clone your-repo-url

# Navigate into the project folder
cd your-project-folder
```

---

## 🔹 **2. Backend Setup**
### 📦 **Install Dependencies**
```sh
cd backend
npm install  # Install backend dependencies
```

### ⚙️ **Set Up Environment Variables**
1️⃣ **Create a `.env` file inside the `backend/` folder**:
```sh
touch backend/.env
```
2️⃣ **Add the following to `.env`:**
```ini
PORT=5000
DATABASE_URL=postgres://myuser:mypassword@localhost:5432/mydatabase
```

### 🚀 **Run the Backend Server**
```sh
npm start  # Run the backend server
```
OR (for development mode with auto-restart):
```sh
npm run dev
```

---

## 🔹 **3. Frontend Setup**
### 📦 **Install Dependencies**
```sh
cd ../frontend
npm install
```

### 🎨 **Run the Frontend Server**
```sh
npm start
```
✅ Your frontend should now be running at: **`http://localhost:3000/`**  

---

## 🔹 **4. Database Setup**
### **Option 1: Using Local PostgreSQL**
1. **Start PostgreSQL** (if not already running):
   ```sh
   sudo service postgresql start  # Linux/macOS
   brew services start postgresql  # macOS
   ```
2. **Create the database manually (if it doesn’t exist)**:
   ```sh
   psql -U postgres
   CREATE DATABASE mydatabase;
   CREATE USER myuser WITH ENCRYPTED PASSWORD 'mypassword';
   GRANT ALL PRIVILEGES ON DATABASE mydatabase TO myuser;
   ```

### **Option 2: Using Docker for Persistent Database**
Run the following command to start a PostgreSQL container:
```sh
docker run --name mydb \
  -e POSTGRES_USER=myuser \
  -e POSTGRES_PASSWORD=mypassword \
  -e POSTGRES_DB=mydatabase \
  -v pgdata:/var/lib/postgresql/data \
  -p 5432:5432 -d postgres
```
✅ Your database is now up and running!

---

## 🔹 **5. Restoring the Database from Backup**
To restore the latest database backup **on a new device**, run:
```sh
psql -U myuser -d mydatabase < backend/backups/db_backup_latest.sql
```

---

## 🔹 **6. Creating a Database Backup**
To create a **new database backup**, run:
```sh
./backend/backup_database.sh
```
This will:
✔ Generate a **new backup file** inside `backend/backups/`  
✔ Update `db_backup_latest.sql` with the newest data  

To push the latest backup to GitHub:
```sh
git add backend/backups/db_backup_latest.sql
git commit -m "Updated database backup"
git push origin main
```

---

## 🔹 **7. Running the Entire Project**
### **🖥 If Running Locally**
```sh
# Start the database (PostgreSQL must be running)
sudo service postgresql start  # Linux/macOS

# Start the backend
cd backend
npm start

# Start the frontend
cd ../frontend
npm start
```

### **🐳 If Using Docker**
```sh
# Start the PostgreSQL container
docker start mydb

# Start the backend
cd backend
npm start

# Start the frontend
cd ../frontend
npm start
```

---

## 🔹 **8. Troubleshooting**
### ❌ **Backend Issues**
- **Database connection error?** Check if PostgreSQL is running:
  ```sh
  sudo service postgresql status
  ```
- Ensure `.env` is properly configured.

### ❌ **Frontend Issues**
- Missing dependencies? Try reinstalling:
  ```sh
  cd frontend
  npm install
  ```

### ❌ **Database Issues**
- If the database doesn’t exist, recreate it:
  ```sh
  psql -U postgres
  CREATE DATABASE mydatabase;
  ```

---

## 🎯 **Summary Checklist**
✅ **Clone the repo** → `git clone your-repo-url`  
✅ **Set up the backend** → `cd backend && npm install`  
✅ **Set up the frontend** → `cd frontend && npm install`  
✅ **Run the backend** → `npm start`  
✅ **Run the frontend** → `npm start`  
✅ **Ensure the database is running** → PostgreSQL or Docker  
✅ **Back up the database** → `./backend/backup_database.sh`  
✅ **Restore the database** → `psql -U myuser -d mydatabase < backend/backups/db_backup_latest.sql`  

---

### 🚀 **Now You’re Ready to Build!**
💡 **Need help?** Open an issue or reach out!  
🎯 **Happy coding!** 🎨💻

