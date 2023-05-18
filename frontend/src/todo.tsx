import {useCallback } from 'react'

type ITodo = {
  text: string;
  done: boolean;
}

type TodoProps = {
    data: ITodo;
    onDelete: () => void;
    onCheck: () => void
  };
  
  function Todo(props: TodoProps) {
    const { data, onDelete, onCheck } = props;
  
    const handleDelete = useCallback(() => {
      onDelete();
    }, []);
  
    const handleChange = useCallback(() => {
      onCheck();
    }, []);
  
    return(
      <div key={Math.random()} className='todo'>
        <div className='todoText'>
          <span className='todoText'>{data.text}</span>
        </div>
        <div className='todoButtons'>
          <input className='doneButton' type='checkbox' onClick={handleChange}/>
          <button className='deleteButton' onClick={handleDelete}>x</button>
        </div>
      </div>
    )
  }

  export default Todo