const addTodo = useCallback(
    ()=>{
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            todo: {
              text: txt,
              done: false
            }
          })
      };
      
      fetch('http://localhost:4000/add', requestOptions)
          .then(response => response.json())
          .then(status => {
            if (status == 200){
              setRender(currentRender => currentRender + 1)
            } 
          })
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
        .then(status => {
          if(status == 200){
            setRender(currentRender => currentRender + 1)
          }
        })
  
    }, [])
  
    const checkboxClick = useCallback((todo: ITodo) => () => {
      const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          todo: todo
        })
    };
    
    fetch('http://localhost:4000/done', requestOptions)
        .then(response => response.json())
        .then(status =>{
          if(status == 200){
            setTodos([])
            setRender(currentRender => currentRender + 1)
          }
        })
    }, [])