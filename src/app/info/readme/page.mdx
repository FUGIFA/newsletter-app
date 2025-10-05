# Newsletter App - Newsletter Application

A full-stack newsletter application built with Next.js, Prisma, and modern web technologies. This project demonstrates a complete newsletter system with post authoring, scheduling, and email notifications.

## 🚀 Features

- **Post Management**: Create, edit, and manage newsletter posts with rich content
- **Scheduled Publishing**: Schedule posts for future publication with automatic email notifications
- **Subscriber System**: Email subscription management with welcome emails
- **Admin Dashboard**: Complete admin interface for managing posts and viewing subscribers
- **Public Reading View**: Clean, responsive layout for published posts
- **Email Integration**: Automated email notifications via SendGrid
- **Dark/Light Theme**: Built-in theme switching with Mantine UI

## 🛠️ Tech Stack

### Core Technologies
- **Framework**: Next.js 15 (App Router)
- **Runtime**: React 19
- **Language**: TypeScript 5
- **Database**: PostgreSQL with Prisma ORM 6
- **UI Library**: Mantine 8
- **Styling**: Tailwind CSS 4
- **Email Service**: SendGrid
- **Scheduling**: node-schedule
- **Content**: MDX support for documentation

### Development Tools
- **Linting**: ESLint 9 with Next.js and Mantine configs
- **Database Client**: Prisma Studio
- **Build Tool**: Next.js built-in bundler

## 📋 Prerequisites

- Node.js ≥ 18 (LTS recommended)
- PostgreSQL database (local or hosted)
- SendGrid account for email functionality
- npm or pnpm package manager

## ⚙️ Installation & Setup

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd newsletter-app
npm install
```

### 2. Environment Configuration

Create a `.env` file in the project root:

```bash
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/newsletter_db"

# Email Configuration (SendGrid)
SENDGRID_API_KEY="your_sendgrid_api_key"
FROM_EMAIL="no-reply@yourdomain.com"
APP_NAME="Your Newsletter Name"
SITE_URL="https://your-domain.com"
```

### 3. Database Setup

Initialize the database with sample data:

```bash
npm run new-db
```

⚠️ **Warning**: This command will **force-reset** your database and delete all existing data. Only use in development.

### 4. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
newsletter-app/
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── seed.ts              # Database seeding script
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── admin/           # Admin dashboard
│   │   │   ├── posts/       # Post management
│   │   │   └── subscribers/ # View Subscribers
│   │   ├── components/      # Reusable UI components
│   │   ├── info/            # MDX documentation pages
│   │   ├── posts/           # Public post viewing
│   │   ├── subscribe/       # Subscription page
│   │   └── styles/          # CSS modules
│   ├── generated/           # Prisma generated client
│   └── server/              # Server-side utilities
│       ├── actions/         # Server actions
│       ├── email-service.ts # Email functionality
│       ├── post.ts          # Post utilities
│       └── prisma.ts        # Prisma client
└── public/                  # Static assets
```

## 🗄️ Database Schema

The application uses the following main entities:

- **User**: Authors who create posts
- **Post**: Newsletter posts with scheduling capabilities
- **Subscriber**: Email subscribers
- **ScheduledJob**: Background job tracking for post scheduling

## 🎯 Key Features Explained

### Post Scheduling
- Posts can be scheduled for future publication
- Uses `node-schedule` for background job processing
- Automatic email notifications to subscribers when posts go live

### Email System
- Welcome emails for new subscribers
- Post publication notifications
- SendGrid integration for reliable delivery

### Admin Interface
- Post creation and editing
- Draft/published status management
- Subscriber list view
- Search and filtering capabilities

## 🚀 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Database
npm run new-db       # Reset database and seed (DESTRUCTIVE)

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Run ESLint with auto-fix
```

## 🔧 Database Management

### Prisma Commands

```bash
# Generate Prisma client after schema changes
npx prisma generate

# Push schema changes to database
npx prisma db push

# Create and apply migrations (recommended for production)
npx prisma migrate dev --name <migration-name>

# Open Prisma Studio (database GUI)
npx prisma studio

# Reset database (development only)
npx prisma db push --force-reset
```

### Seeding

The application includes a seed script that creates:
- Sample users (Alice and Bob)
- Example posts (published and scheduled)
- Test subscribers

## 📧 Email Configuration

### SendGrid Setup

1. Create a SendGrid account
2. Generate an API key
3. Verify your sender domain
4. Add the API key to your `.env` file

### Email Templates

The application includes two email types:
- **Welcome**: Sent to new subscribers
- **NewPost**: Sent when posts are published

## 📚 Documentation

The application includes comprehensive documentation pages accessible at `/info/`:

- **Authoring**: How to create and manage posts
- **Reading**: Public post viewing experience
- **Subscribing**: Subscription process
- **Scheduling**: Post scheduling features
- **Emailing**: Email notification system

## 👨‍💻 Author

**Timothy van Rooyen**

Built as a demonstration of modern full-stack development with Next.js, Prisma, and TypeScript.

---

## 📋 Assignment Questions

### What were some of the reasons you chose the technology stack that you did?

**Next.js 15 with App Router**
- **Server-Side Rendering**: Essential for SEO and fast initial page loads
- **App Router**: Modern routing with built-in layouts, loading states, and error boundaries
- **Server Actions**: Simplified form handling without separate API routes
- **TypeScript Integration**: I love types, it create structure and consistency

**Prisma with PostgreSQL**
- **New Tool**: I have never used Prisma before so thought this would be a good opportunity to become more familiar with the company I'm interviewing at
- **Type Safety**: Generated TypeScript types ensure database schema consistency
- **Developer Experience**: Intuitive query builder and tooling (Prisma Studio)
- **Migration Management**: Robust schema versioning and migration system

**Mantine UI + Tailwind CSS**
- **Mentioned Before**: Traditionally I am against design frameworks such as Mantine but it was mentioned in my introduction call so thought I should become familiar with it
- **Component Library**: Pre-built, accessible components reduce development time
- **Design System**: Consistent styling and theming capabilities
- **Dark Mode**: Built-in theme switching support

**SendGrid for Email**
- **Past Experience**: I have used SendGrid before and am familiar with the technology
- **Reliability**: Enterprise-grade email delivery infrastructure
- **Analytics**: Built-in tracking and delivery statistics
- **Free Tier**: Sufficient for development and testing

**node-schedule for Background Jobs**
- **Simplicity**: Easy to implement and understand
- **Lightweight**: Minimal dependencies and overhead

### What were some of the trade-offs you made when building this application? Why were these acceptable trade-offs?

**1. In-Memory Job Scheduling vs. External Queue System**
- **Trade-off**: Used `node-schedule` instead of Redis/Kafka
- **Reason**: Simpler implementation for a 4-hour assignment
- **Acceptable because**: 
  - Job persistence through database ensures reliability
  - Single-server deployment is sufficient for MVP
  - Can be upgraded to external queue system later

**2. Server Actions vs. REST API for Forms**
- **Trade-off**: Used Next.js Server Actions instead of traditional REST endpoints
- **Reason**: Faster development and better TypeScript integration
- **Acceptable because**:
  - Simpler form handling without separate API routes
  - Can add REST API endpoints later (as demonstrated)

**3. Basic Email Templates vs. Advanced Template Engine**
- **Trade-off**: Simple HTML templates instead of advance emailing templating frameworks such as jinja
- **Reason**: Faster implementation with sufficient functionality, ChatGPT generated the template for me
- **Acceptable because**:
  - Templates are maintainable and responsive
  - Dark mode support provides "good enough" UX
  - Can be upgraded to template engine later

**4. Basic Error Handling vs. Comprehensive Error Management**
- **Trade-off**: Simple try-catch blocks instead of sophisticated error handling
- **Reason**: Time constraints for assignment
- **Acceptable because**:
  - Core functionality works reliably
  - Error logging is in place for debugging
  - Can be enhanced with proper error boundaries and monitoring

### Given more time, what improvements or optimizations would you want to add? When would you add them?

**Immediate Improvements (1-2 weeks)**
- **Authentication & Authorization**: User login, role-based access control
- **Input Validation**: Comprehensive form validation with proper error messages
- **Error Boundaries**: React error boundaries for better error handling
- **Loading States**: Skeleton loaders and better UX during operations
- **SendGrid Webhooks**: Form getting delivery stats

**Short-term Enhancements (1-2 months)**
- **Email Verification**: Double opt-in for newsletter subscriptions
- **Unsubscribe Management**: Self-service unsubscribe functionality
- **Post Categories**: Organize posts by topics or categories
- **Search Functionality**: Full-text search across post content
- **Image Upload**: File upload system instead of external URLs
- **Analytics Dashboard**: Track post views, email opens, subscriber growth

**Medium-term Optimizations (3-6 months)**
- **Caching Strategy**: Redis for session storage and query caching
- **Database Optimization**: Query optimization, indexing, etc.
- **Background Job Queue**: Redis/Kafka for reliable job processing
- **Monitoring & Alerting**: Application performance monitoring
- **Automated Testing**: Unit tests, integration tests, E2E tests
- **CI/CD Pipeline**: Automated testing and deployment

**Long-term Scalability (6+ months)**
- **Microservices Architecture**: Separate services for posts, emails, users
- **Event-Driven Architecture**: Event sourcing for audit trails
- **Multi-tenancy**: Support for multiple newsletter publishers
- **Advanced Analytics**: Detailed engagement metrics and insights
- **Mobile App**: React Native or Flutter mobile application
- **API Versioning**: Proper API versioning for backward compatibility
- **Internationalization**: Multi-language support

### How would you deploy the application in a production-ready way?

**An Example Infrastructure Setup**
```yaml
# Docker Compose for local development
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/newsletter
      - SENDGRID_API_KEY=${SENDGRID_API_KEY}
    depends_on:
      - db
      - redis
  
  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=newsletter
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
    volumes:
      - postgres_data:/var/lib/postgresql/data
```

**Production Deployment Strategy**

**1. Containerization**
- **Docker**: Multi-stage builds for optimized production images
- **Health Checks**: Container health monitoring
- **Resource Limits**: CPU and memory constraints
- **Security**: Non-root user, minimal base images

**2. Orchestration Platform**
- **Kubernetes**: For scalable, resilient deployment
- **Helm Charts**: Package management and configuration
- **Ingress Controller**: Load balancing and SSL termination
- **Horizontal Pod Autoscaling**: Automatic scaling based on metrics

**3. Database Management**
- **Managed PostgreSQL**: All cloud providers have this
- **Backup Strategy**: Automated daily backups with point-in-time recovery

**4. Monitoring & Observability**
- **Application Monitoring**: Grafana
- **Error Tracking**: Sentry for real-time error monitoring

**5. Security Measures**
- **SSL/TLS**: Let's Encrypt or managed certificates
- **Environment Variables**: Secure secret management

**6. Example CI/CD Pipeline**
```yaml
# GitHub Actions example
name: Deploy to Production
on:
  push:
    branches: [main]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run tests
        run: npm test
      - name: Run linting
        run: npm run lint
  
  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Kubernetes
        run: kubectl apply -f k8s/
```

---
