# Docker Calculator

A simple calculator web app built to learn Docker basics: building an image, running a container, tagging an image, and preparing documentation for Docker Hub.

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

## Run Without Docker

Open `src/index.html` directly in your browser.

## Build With Docker

```bash
docker build -t docker-calculator:latest .
```

## Run With Docker

```bash
docker run --name docker-calculator -p 8080:80 docker-calculator:latest
```

Then open:

```text
http://localhost:8080
```

Stop and remove the container:

```bash
docker stop docker-calculator
docker rm docker-calculator
```

## Push To Docker Hub

Replace `your-dockerhub-username` with your Docker Hub username.

```bash
docker login
docker build -t your-dockerhub-username/docker-calculator:latest .
docker push your-dockerhub-username/docker-calculator:latest
```

## Docker Hub Description

Use [DOCKERHUB.md](DOCKERHUB.md) as the project description on Docker Hub. It includes pull, run, build, and push instructions for other people.
