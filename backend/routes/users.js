import express from 'express';
const router = express.Router();

// 사용자 정보
router.get('/', (req, res) => {
  res.render('users', { title: 'Users' });
});

export default router;
