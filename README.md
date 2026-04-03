# AI Resume Builder

An end-to-end full-stack AI Resume Builder SaaS application. This platform enables users to build professional, ATS-optimized resumes using AI. It comes with premium features such as PDF exports handled securely through an integrated payment gateway.

## Features

- **AI-Powered Content Generation:** Leverage OpenAI models to automatically generate or enhance professional summaries, work experience, and skills.
- **Dynamic Editor:** Real-time resume preview with customizable themes and sections (Personal, Summary, Experience, Education, Skills).
- **Premium PDF Export:** Securely download resumes in PDF format after upgrading.
- **Payment Integration:** Razorpay integration for managing premium subscriptions and one-time payments.
- **Secure Backend:** Spring Boot backend with MongoDB to store user profiles, resume drafts, and transaction history.
- **Microservice Architecture Ready:** Dockerized backend and frontend.

## Technology Stack

### Backend
- **Java 21 & Spring Boot 3**
- **Spring AI** (for OpenAI completions)
- **MongoDB** (NoSQL Database)
- **Razorpay SDK**

### Frontend
- **React 18** (Vite)
- **Tailwind CSS** & **Lucide React**
- **React Router** & Component-based architecture

## Getting Started

### Prerequisites
- JDK 21+
- Node.js 18+
- MongoDB instance running
- OpenAI API Key
- Razorpay API Keys

### Running Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/tushar2682/ai-resume-builder.git
   ```

2. **Backend Setup:**
   Navigate to the backend directory, ensure variables are passed (or setup `.env`), and run:
   ```bash
   cd resumebuilderapi
   ./mvnw spring-boot:run
   ```

3. **Frontend Setup:**
   Create a `.env` in the `resumebuilderui` directory with:
   `VITE_RAZORPAY_KEY_ID=your_key_here`
   
   Navigate to the frontend directory, install dependencies, and run:
   ```bash
   cd resumebuilderui
   npm install
   npm run dev
   ```

## Environment Variables
- `OPENAI_API_KEY`: Your OpenAI Secret Key
- `RAZORPAY_KEY_ID`: Your Razorpay Key ID
- `RAZORPAY_KEY_SECRET`: Your Razorpay Key Secret
- `VITE_RAZORPAY_KEY_ID`: Public Razorpay Key for Frontend

## Deployment

You can use the provided `docker-compose.yml` to spin up the entire application:
```bash
docker-compose up --build
```
