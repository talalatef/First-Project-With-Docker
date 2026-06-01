# Docker Calculator

A small browser calculator created as a first Docker project. It is intentionally simple: static HTML, CSS, and JavaScript served by nginx inside a Docker container.

## Features

- Add, subtract, multiply, divide, and modulo operations
- Decimal numbers
- Clear and delete buttons
- Keyboard support for numbers, operators, Enter, Backspace, and Escape
- Lightweight nginx Alpine image

## Pull From Docker Hub

Replace `your-dockerhub-username` with the Docker Hub account that owns the image:

```bash
docker pull your-dockerhub-username/docker-calculator:latest
```

## Run The App

```bash
docker run --name docker-calculator -p 8080:80 your-dockerhub-username/docker-calculator:latest
```

Open the app in your browser:

```text
http://localhost:8080
```

Stop and remove the container:

```bash
docker stop docker-calculator
docker rm docker-calculator
```

## Build Locally

Clone the project, then build the image:

```bash
docker build -t docker-calculator:latest .
```

Run the local image:

```bash
docker run --name docker-calculator -p 8080:80 docker-calculator:latest
```

## Push To Docker Hub

Log in to Docker Hub:

```bash
docker login
```

Build the image with your Docker Hub username:

```bash
docker build -t your-dockerhub-username/docker-calculator:latest .
```

Push the image:

```bash
docker push your-dockerhub-username/docker-calculator:latest
```

Optional version tag:

```bash
docker tag your-dockerhub-username/docker-calculator:latest your-dockerhub-username/docker-calculator:1.0.0
docker push your-dockerhub-username/docker-calculator:1.0.0
```

## Project Structure

```text
.
├── Dockerfile
├── nginx.conf
├── src
│   ├── app.js
│   ├── index.html
│   └── styles.css
├── .dockerignore
├── DOCKERHUB.md
└── README.md
```

## What This Project Teaches

- How to place app files inside a Docker image
- How to use nginx to serve a static web project
- How to expose a container port
- How to map a host port to a container port with `-p`
- How to tag an image for Docker Hub
- How to push and pull an image
