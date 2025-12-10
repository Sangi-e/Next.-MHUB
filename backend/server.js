import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// --- MOCK DATABASE (In-Memory) ---
const USERS = [
  {
    id: '1',
    name: 'Emmanuel Doe',
    email: 'emmanuel.doe@example.com',
    role: 'entrepreneur',
    walletBalance: 85000,
    location: 'Yaba, Lagos',
  },
  {
    id: '2',
    name: 'Sarah Client',
    email: 'sarah.client@example.com',
    role: 'customer',
    walletBalance: 145000,
    location: 'Lagos, Nigeria',
  }
];

const SERVICES = [
  {
    id: '1',
    providerId: 'p1',
    title: 'Professional Plumbing & Repair',
    price: 5000,
    rating: 4.8,
    category: 'Home Services',
    location: { lat: 6.5244, lng: 3.3792, address: 'Lagos, NG' }
  },
  {
    id: '2',
    providerId: 'p2',
    title: 'Modern Logo Design & Branding',
    price: 15000,
    rating: 5.0,
    category: 'Digital Services',
    location: { lat: 0, lng: 0, address: 'Global' }
  }
];

// --- ROUTES ---

// Health Check
app.get('/', (req, res) => {
  res.send('Nexus API is running...');
});

// Get All Services
app.get('/api/services', (req, res) => {
  res.json(SERVICES);
});

// Get User Profile
app.get('/api/users/:id', (req, res) => {
  const user = USERS.find(u => u.id === req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// AI: Generate Bio (Server-side implementation)
app.post('/api/ai/generate-bio', async (req, res) => {
  const { name, skills, experience } = req.body;
  
  if (!process.env.API_KEY) {
    return res.status(500).json({ message: "Server missing API Key" });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `
      You are a professional copywriter for a freelance marketplace.
      Write a concise, engaging, and professional bio (max 100 words) for an entrepreneur named ${name}.
      Skills: ${skills.join(', ')}.
      Experience/Background: ${experience}.
      Tone: Trustworthy, skilled, and friendly.
      Do not include markdown formatting.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    res.json({ bio: response.text });
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ message: "Failed to generate bio" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});