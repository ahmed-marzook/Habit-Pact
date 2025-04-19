# HabitPact 🤝

A modern habit tracking and accountability platform that helps users build lasting habits through social connections and commitment tracking. HabitPact transforms personal goals into sustainable habits by leveraging the power of social accountability and consistent progress monitoring.

**Project showcasing full-stack development with Spring Boot and React, implementing user authentication, real-time notifications, and PostgreSQL database integration.**

## Technology Stack 🛠️

- Java 21
- Spring Boot
- MongoDB
- Gradle
- React Frontend

## Prerequisites 📋

Required installations:

- JDK 21
- Gradle 8.x
- Node v22.9.0
- Docker

## Getting Started 🚀

### Environment Variables 🔑

```env
JWT_SECRET=*******
DATABASE_URL=jdbc:postgresql://localhost:5432/habitpact
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=********
```

### Backend Setup

```bash
git clone git@github.com:your-username/habit-pact.git
cd habit-pact
docker-compose up -d
./gradlew build
./gradlew bootRun
```

### Frontend setup

```bash
cd frontend
npm install
npm run dev
```

- Server runs on `http://localhost:8080`
- Frontend runs on `http://localhost:5173/`

## Project Structure 🏗️

```bash
HABIT-PACT/
├── .gradle/
├── .idea/
├── bin/
├── build/
├── docker/
├── frontend/
├── gradle/
├── src/
├── build.gradle
├── docker-compose.yml
├── gradlew
├── gradlew.bat
├── README.md
└── settings.gradle
```

## Features ✨

- User authentication and profile management
- Habit tracking and progress visualization
- Social accountability partnerships
- Real-time notifications and reminders
- Detailed analytics and insights
- Goal-setting framework
- Reward system

## API Documentation 📖

Swagger UI: `http://localhost:8080/swagger-ui.html`

### Available Endpoints

- `/api/auth/*` - Authentication endpoints
- `/api/habits/*` - Habit management endpoints
- `/api/users/*` - User management endpoints
- `/api/accountability/*` - Accountability partnership endpoints

## Error Handling 🚨

The API uses standard HTTP response codes:

- 200: Success
- 400: Bad request
- 401: Unauthorized
- 403: Forbidden
- 404: Not found
- 500: Internal server error

## Contributing 🤝

Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

## Testing 🧪

### Playwright API Tests for Habit Pact

#### Setup

1. Install dependencies

```bash
npm install
```

2. Create a `.env` file in the project root with:

```env
API_BASE_URL=http://localhost:8080
API_USERNAME=test@example.com
API_PASSWORD=password123
```

### Running Tests

Run all tests:

```bash
npx playwright test
```

Run specific test file:

```bash
npx playwright test habits/create.api.spec.ts
```

Run tests with specific tag:

```bash
npx playwright test --grep "@smoke"
```

Run in debug mode:

```bash
npx playwright test --debug
```

### Test Reports

View HTML report:

```bash
npx playwright show-report
```

Generate and view trace:

```bash
npx playwright test --trace on
```

### Project Structure

```
api-tests/
├── playwright.config.ts    # Test configuration
├── tests/                  # Test Source Folder
└── test-results/           # Test reports and traces
```

### Debug Tips

- Use `console.log()` in tests for debugging
- Check test traces for failed tests
- Review API responses in test report
- Use `test.only()` to run single test

### Common Issues

1. API Connection:

   - Ensure API is running at correct URL
   - Check port number matches configuration

2. Authentication:

   - Verify test user credentials
   - Check token expiration settings

3. Test Data:
   - Ensure clean test state
   - Check for data conflicts

### Useful Commands

```bash
# Install Playwright browsers
npx playwright install

# Run tests and generate report
npx playwright test --reporter=html

# Run specific test file with debug output
npx playwright test filename.spec.ts --debug

# Update Playwright
npm install -D @playwright/test@latest
```

## Future Features

### Enhanced Accountability Features

- Group accountability circles
- Accountability partner matching system
- Progress sharing on social media
- In-app messaging system
- Video check-ins
- Accountability score tracking
- Partner rating system
- Community challenges

### Advanced Analytics

- Habit correlation analysis
- Success rate predictions
- Behavioral pattern recognition
- Custom reporting tools
- Progress trend visualization
- Impact analysis
- Achievement milestones tracking
- Performance insights

### Gamification Elements

- Achievement badges
- Level progression system
- Challenge competitions
- Reward point system
- Streak multipliers
- Custom challenges
- Social leaderboards
- Virtual rewards store

### Mobile Application

- Native iOS app
- Native Android app
- Cross-platform compatibility
- Offline mode support
- Push notifications
- Biometric authentication
- Widget support
- Location-based reminders

## Docker Image Build Commands

```bash
docker build -t habitpact/app:1.0 .
docker run -e JWT_SECRET=******** -e DATABASE_URL=jdbc:postgresql://localhost:5432/habitpact -p 8080:8080 habitpact/app:1.0
docker push habitpact/app:1.0
```

## Development Testing

```bash
# Test development
npm run dev

# Test production locally
npm run build
npm run preview

# Or use serve to test the production build
npm install -g serve
serve dist
```

```bash
ngrok start --config=ngrok.yml frontend backend
```

## License 📄

MIT License - see LICENSE.md

## Contact 📬

For any queries, please contact [Your Contact Information].

HabitPact - Building Better Habits Through Accountability
