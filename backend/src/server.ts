import 'dotenv/config'
import { app } from './app';
import 'express-async-errors';
import { sendEmail } from './utils/sendEmail';
import cron from 'node-cron';
import { verificarAgendamentos } from './utils/verificarAgendamento';

const PORT = process.env.PORT || 3333;

cron.schedule('*/1 * * * *', () => {
  console.log('Verificando agendamentos:', new Date());
  verificarAgendamentos();
});


app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

