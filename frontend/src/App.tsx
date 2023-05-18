import { useState,useCallback, useEffect } from 'react'
import Todo from "./todo.tsx"
import './App.css'

type ITodo = {
  text: string;
  done: boolean;
}

function App() {
  const [todos,setTodos] = useState<ITodo[]>([]);
  const [txt,setText] = useState("")

  useEffect(()=>{
    fetch("http://localhost:4000")
    .then(response => response.json())
    .then(data => setTodos(data));
  },[])

 const addTodo = useCallback(
  ()=>{
    setTodos(currentTodos => [
      ...currentTodos,
      {
        text: txt,
        done: false
      },
    ]);

    // const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //       todo: {
    //         text: txt,
    //         done: false
    //       }
    //     })
    // };
    
    // fetch('http://localhost:4000/add', requestOptions)
    //     .then(response => response.json())
  }, [txt]);

  const deleteTodo = useCallback((todo: ITodo) => () => {

    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: todo.text
      })
  };
  
  fetch('http://localhost:4000/delete', requestOptions)
      .then(response => response.json())

      debugger
    setTodos(todos.filter((item: ITodo)=> item.text != todo.text))

  }, [todos])

  const checkboxClick = useCallback((todo: ITodo) => () => {
    debugger
    const newTodos =  todos.map((item: ITodo)=>{
      if(item.text == todo.text){
        item.done = !item.done
        return item 
      }else{
        return item
      }
    })
    setTodos(newTodos)
  }, [todos])

  return (
    <>
    <div className='todoApp'>
      <div className='addTodo'>
        <input type='text' className='textInput' placeholder='todo' onChange={(e)=>{
          setText(e.target.value)
        }}></input>
        <button onClick={addTodo} className='addButton'>add</button >
      </div>
      <div className='todos'>
        <div>
          {
            todos.map((todo : ITodo)=>{
              return <Todo key={todo.text} data={todo} onDelete={deleteTodo(todo)} onCheck={checkboxClick(todo)} />;
            })
          }
        </div>
       </div>
      </div>
    </>
  )
}

export default App

