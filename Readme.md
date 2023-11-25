# Assignment 2

This project is a TypeScript based API for managing users and orders. Used Express.js for the server, MongoDB for the database, and some other development dependencies for formatting, and testing.

## Lets get started

Follow these instructions to run the application locally.


### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/toushik018/assignment2.git
   ```

2. Navigate to the project directory:

   ```bash
   cd assignment2
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

### Configuration

Create a `.env` file in the root of the project and add the necessary environment variables:

```env
DATABASE_URI=your_mongodb_connection_string
```

### Running the Application

#### For Production:

Build the TypeScript files and start the server:

```bash
npm run build
npm start
```

#### For Development:

Run the application in development mode with automatic restarts on file changes using ts-node-dev:

```bash
npm run dev
```

### Testing

Run linting and formatting checks:

```bash
npm run lint
npm run prettier
```

Run linting and formatting fixes:

```bash
npm run lint:fix
npm run prettier-fix
```


## Thank you