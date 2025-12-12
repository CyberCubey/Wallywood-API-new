import express from 'express';
import dotenv from 'dotenv';
import { userRoutes } from './routes/userRoutes.js';
import { loginRoutes } from './routes/loginRoutes.js';
import { genreRoutes } from './routes/genreRoutes.js';
import { posterRoutes } from './routes/posterRoutes.js';

// Indlæs miljøvariabler fra .env (uden at vise logs)
dotenv.config({ quiet: true });

// Brug port fra .env eller falde tilbage til 3000
const port = process.env.PORT || 3000;

// Opret express-app
const app = express();

// Gør det muligt at modtage JSON i requests
app.use(express.json());

// Gør det muligt at modtage form-data (fx fra formularer)
app.use(express.urlencoded({ extended: true }));

// Brug vores user- og genre-routes
app.use('/my-api/users', userRoutes);
app.use('/my-api/genres', genreRoutes);
// Poster router (placeholder)
app.use('/my-api/posters', posterRoutes);
// Login router
app.use('/my-api/login', loginRoutes);
app.use('/login', loginRoutes);

// Start serveren
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


