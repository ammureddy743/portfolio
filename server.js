/**
 * ==========================================================================
 * LAKSHMI CHANDRAKALA REDDY - PORTFOLIO BACKEND REST API
 * ==========================================================================
 * Author: Gurrala Lakshmi Chandrakala Reddy
 * Role: Frontend & Mobile Engineer | ServiceNow CSA
 * Stack: Node.js, Express, REST APIs, JSON Persistence
 * ==========================================================================
 */

import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_DIR = path.join(__dirname, 'data');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');
const FEEDBACK_FILE = path.join(DATA_DIR, 'feedback.json');

// Ensure data storage directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(INQUIRIES_FILE)) {
  fs.writeFileSync(INQUIRIES_FILE, JSON.stringify([], null, 2), 'utf8');
}
if (!fs.existsSync(FEEDBACK_FILE)) {
  fs.writeFileSync(FEEDBACK_FILE, JSON.stringify([], null, 2), 'utf8');
}

// --------------------------------------------------------------------------
// Middleware
// --------------------------------------------------------------------------
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-key']
}));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Request logging
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// Helper: Read JSON file safely
async function readJsonFile(filePath) {
  try {
    const raw = await fs.promises.readFile(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err.message);
    return [];
  }
}

// Helper: Write JSON file safely
async function writeJsonFile(filePath, data) {
  await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
}

// --------------------------------------------------------------------------
// REST API Routes
// --------------------------------------------------------------------------

/**
 * Health check & telemetry endpoint
 * GET /api/health
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Lakshmi Chandrakala Portfolio API',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    nodeVersion: process.version,
    memoryUsage: process.memoryUsage().rss
  });
});

/**
 * Contact Inquiry Submission
 * POST /api/contact
 */
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate inputs
    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ success: false, error: 'Full name is required.' });
    }
    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({ success: false, error: 'A valid email address is required.' });
    }
    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ success: false, error: 'Message content is required.' });
    }

    const inquiries = await readJsonFile(INQUIRIES_FILE);

    const newInquiry = {
      id: `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject && typeof subject === 'string' ? subject.trim() : 'Portfolio Inquiry',
      message: message.trim(),
      receivedAt: new Date().toISOString(),
      clientIp: req.ip || req.headers['x-forwarded-for'] || '127.0.0.1',
      userAgent: req.headers['user-agent'] || 'Unknown'
    };

    inquiries.unshift(newInquiry); // Prepend so newest is first
    await writeJsonFile(INQUIRIES_FILE, inquiries);

    console.log(`✨ New inquiry saved: from "${newInquiry.name}" <${newInquiry.email}> (${newInquiry.id})`);

    return res.status(201).json({
      success: true,
      message: `Thank you, ${newInquiry.name}! Your message has been received by Lakshmi Chandrakala.`,
      inquiryId: newInquiry.id,
      timestamp: newInquiry.receivedAt
    });
  } catch (err) {
    console.error('Failed to process contact form submission:', err);
    return res.status(500).json({
      success: false,
      error: 'An internal server error occurred while processing your message.'
    });
  }
});

/**
 * View submitted inquiries (Recruiter/Admin access)
 * GET /api/inquiries
 */
app.get('/api/inquiries', async (req, res) => {
  try {
    const inquiries = await readJsonFile(INQUIRIES_FILE);
    res.json({
      success: true,
      count: inquiries.length,
      inquiries
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to retrieve inquiries.' });
  }
});

/**
 * Portfolio & Engineering Stats
 * GET /api/stats
 */
app.get('/api/stats', async (req, res) => {
  try {
    const inquiries = await readJsonFile(INQUIRIES_FILE);
    const feedback = await readJsonFile(FEEDBACK_FILE);

    res.json({
      success: true,
      totalInquiries: inquiries.length,
      latestInquiryDate: inquiries.length > 0 ? inquiries[0].receivedAt : null,
      totalFeedback: feedback.length,
      engineerProfile: {
        name: 'Gurrala Lakshmi Chandrakala Reddy',
        role: 'Frontend & Mobile Engineer | ServiceNow CSA',
        experienceMonths: 7,
        currentCompany: 'The Team C',
        location: 'Hyderabad, India',
        education: 'B.Tech CSE (CGPA 7.59 / 10)'
      },
      serverUptimeSeconds: Math.floor(process.uptime())
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to load stats.' });
  }
});

/**
 * Recruiter / Visitor Quick Feedback
 * POST /api/feedback
 */
app.post('/api/feedback', async (req, res) => {
  try {
    const { rating, role, feedback } = req.body;

    const list = await readJsonFile(FEEDBACK_FILE);
    const item = {
      id: `fb_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      rating: Number(rating) || 5,
      role: role || 'Recruiter/Visitor',
      feedback: (feedback || '').trim(),
      receivedAt: new Date().toISOString()
    };

    list.unshift(item);
    await writeJsonFile(FEEDBACK_FILE, list);

    res.status(201).json({
      success: true,
      message: 'Thank you for your feedback!',
      feedbackId: item.id
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to save feedback.' });
  }
});

// --------------------------------------------------------------------------
// Static Hosting Fallback (serves dist or root in full-stack mode)
// --------------------------------------------------------------------------
const distPath = path.join(__dirname, 'dist');
const staticPath = fs.existsSync(distPath) ? distPath : __dirname;
app.use(express.static(staticPath));

app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  const indexPath = path.join(staticPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }
  return res.status(404).send('Not Found');
});

// --------------------------------------------------------------------------
// Start Server
// --------------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`\n=============================================================`);
  console.log(`🚀 Lakshmi Chandrakala Portfolio Backend is LIVE`);
  console.log(`📡 URL:       http://localhost:${PORT}`);
  console.log(`📋 API Docs:`);
  console.log(`   - GET  /api/health      -> Health check status`);
  console.log(`   - POST /api/contact     -> Submit direct inquiry`);
  console.log(`   - GET  /api/inquiries   -> List all received messages`);
  console.log(`   - GET  /api/stats       -> Engineering & portfolio stats`);
  console.log(`   - POST /api/feedback    -> Recruiter/visitor feedback`);
  console.log(`📂 Storage:   ${DATA_DIR}`);
  console.log(`=============================================================\n`);
});

export default app;
