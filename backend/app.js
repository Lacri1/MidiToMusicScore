// app.js

import express from 'express';
import createError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import { fileURLToPath } from 'url';
import multer from 'multer';
import { convertMidiToPdf } from './midiPiano/miditoPdf.js';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pdfsPath = path.resolve(__dirname, 'midiPiano/pdfs');
const uploadsPath = path.resolve(__dirname, 'midiPiano/uploads');

(async () => {
  try {
    await fs.mkdir(pdfsPath, { recursive: true });
    await fs.mkdir(uploadsPath, { recursive: true });
  } catch (err) {
    console.error('폴더 생성 중 오류 발생:', err);
  }
})();

const app = express();

const corsOptions = {
  origin: 'http://localhost:8080',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ✅ 루트 경로에 기본 응답 추가
app.get('/', (req, res) => {
  res.json({ message: 'MIDI to PDF Converter API is running' });
});

// PDF 제공 엔드포인트
app.use('/pdfs', express.static(pdfsPath));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

app.post('/convert-midi', upload.single('midiFile'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
      await fs.access(req.file.path);
    } catch (error) {
      return res.status(500).json({ error: 'Uploaded file not found' });
    }

    const pdfUrl = await convertMidiToPdf(req.file.path, pdfsPath);
    res.json({ pdfUrl: `http://localhost:3000/pdfs/${path.basename(pdfUrl)}` });

  } catch (error) {
    next(createError(500, 'Error processing MIDI file'));
  }
});

// 404 처리
app.use((req, res, next) => {
  next(createError(404));
});

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: err.message
  });
});

export default app;
