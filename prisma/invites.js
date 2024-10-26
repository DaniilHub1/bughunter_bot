const express = require('express');
const prisma = require('./migrations/prismaClient'); // Подключаем Prisma
const app = express();
app.use(express.json()); // Для обработки JSON

// POST: Добавление заявки
app.post('/requests', async (req, res) => {
  const { userId, description } = req.body;
  try {
    const newRequest = await prisma.request.create({
      data: { userId, description, status: 'Новая' },
    });
    res.json(newRequest);
  } catch (error) {
    console.error('Ошибка:', error);
    res.status(500).json({ error: 'Ошибка при создании заявки' });
  }
});

// GET: Получение всех заявок пользователя
app.get('/requests/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const requests = await prisma.request.findMany({ where: { userId: parseInt(userId) } });
    res.json(requests);
  } catch (error) {
    console.error('Ошибка:', error);
    res.status(500).json({ error: 'Ошибка при получении заявок' });
  }
});

// Запуск сервера
const PORT = 3000;
app.listen(PORT, () => console.log(`Сервер запущен на http://localhost:${PORT}`));
