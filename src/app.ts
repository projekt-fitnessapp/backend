import { setupServer, connectDB } from './server';

const app = setupServer(false);

connectDB(false);

app.listen(parseInt(process.env.PORT as string), () => {
  console.log(`App started on  http://localhost:${process.env.PORT}`);
});

