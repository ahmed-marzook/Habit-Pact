# PostgreSQL Database Setup and Connection Guide
This guide will help you set up and connect to the PostgreSQL database using Docker.
## Prerequisites

Docker
Docker Compose
A PostgreSQL client (e.g., psql, pgAdmin, DBeaver)

## Setup

Ensure you have the following files in your project structure:

```
Copyproject_root/
│
├── docker-compose.yml
│
└── docker/
    └── database/
        ├── Dockerfile
        └── init.sql
```

From the project root, run the following command to start the database:
Copydocker-compose up -d --build
This will build the custom PostgreSQL image and start the container.

## Connecting to the Database
Connection Details

Host: `localhost` (or `127.0.0.1`)
Port: `5432`
Database: `tatweer`
Username: `user`
Password: `mypassword`

### Using psql
If you have psql installed locally, you can connect to the database using:

```sh
psql -h localhost -p 5432 -U user -d tatweer
```

When prompted, enter the password: mypassword
### Using pgAdmin

1. Open pgAdmin
2. Right-click on "Servers" and select "Create" > "Server"
3. In the "General" tab, give your connection a name (e.g., "Local Docker PostgreSQL")
4. In the "Connection" tab, enter the following details:

Host name/address: `localhost`
Port: `5432`
Maintenance database: `tatweer`
Username: `user`
Password: `mypassword`

Click "Save"