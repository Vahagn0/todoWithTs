import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose, { Schema,model,connect } from 'mongoose';
import cors from  'cors'
import bodyParser from 'body-parser';

dotenv.config();
mongoose.connect("mongodb+srv://vahagn:KdzFcEXP6KXJU8hL@cluster0.ccdmtyi.mongodb.net/todoApp")

const app: Express = express();
const port = process.env.PORT;
app.use(cors())
let jsonParser = bodyParser.json()

interface todo {
  text: string;
  done: Boolean;
}

const todoSchema = new Schema<todo>({
  text: { type: String, required: true },
  done: { type: Boolean, required: true }
});

const Todo = model<todo>('todos', todoSchema);

app.get("/",async (req: Request, res: Response)=>{
  const todos = await Todo.find()
  res.send(todos)
})

app.post('/add', jsonParser,async(req: Request, res: Response) => {
  const todo: Object = req.body.todo
  const newTodo =  await new Todo(todo)
  newTodo.save()
  res.send('200');
});

app.delete('/delete', jsonParser,async(req: Request, res: Response) => {
  const text: String = req.body.text
  const todo = await Todo.findOneAndDelete({text : text})
  res.send("200")
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});