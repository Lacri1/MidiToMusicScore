import express from 'express';
const router = express.Router();

// 홈 페이지
router.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

export default router;
