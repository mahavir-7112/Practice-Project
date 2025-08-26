import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';


// only for new niq id 


function App() {
  const [count, setCount] = useState(0)

  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showfinished, setshowfinished] = useState(true)


   const saveTols = (e) =>{

    localStorage.setItem("todos", JSON.stringify(todos))  // also used for save at local storage

  }



  const handleEdit = (e, id) => {

    let t = todos.filter(i=>i.id === id)
    settodo(t[0].todo)

    let newtodo = todos.filter(item=>{

      return item.id != id

    });

    settodos(newtodo)
    saveTols()

  }

  const handleDelete = (e, id) => {

    console.log(`the id is ${id}`)

    let index = todos.findIndex(item => {

      return item.id === id;

    })

    console.log(index)
    let newTodos = todos.filter(item => {

      return item.id !== id

    });

    settodos(newTodos)
    saveTols()


  }


  const handleAdd = () => {

    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    settodo("")
    console.log(todos)

  }


  const handlechange = (e) => {

    settodo(e.target.value)
    saveTols()

  }


  // this function is managed check box

  const handlecheckbox = (e) => {

    console.log(e, e.target)
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })

    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos)
    console.log(newTodos)

  }

  const togglefinished = (e)=>{

    setshowfinished(!showfinished)

  }


 



  return (
    <>

      <Navbar />

      <div className=" md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-1/2">

      <h1 className='font-bold text-center text-xl'>iTask - Manage Your Todos at one place</h1>

        <div className="addTdo my-5 flex flex-col gap-4">
          <h2 className='text-lg font-bold'> Add a Todo </h2>
          <input onChange={handlechange} value={todo} type="text" className='w-full bg-white rounded-lg px-5 py-1' />
          <button  onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold  text-white rounded-md mx-6'>Save</button>
        </div>

          <input onChange={togglefinished} type="checkbox" checked = {showfinished} /> Show finished

        <h2 className='text-lg font-bold'>Your Todo</h2>

        <div className="todos">

          {todos.length === 0 && <div className='m-5'> No Todos </div>}

          {todos.map(item => {

            // display the list todos



            return  (showfinished || !item.isCompleted) &&  <div key={item.id} className="todo flex md:w-1/2 my-3 justify-between">

              <div className='flex gap-5'>



                <input name={item.id} onChange={handlecheckbox} type="checkbox" value={todo.isCompleted} id="" />

                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>


              </div>

             
              <div className="button flex h-full">
                <button onClick={ (e)=> handleEdit (e, item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold  text-white rounded-md mx-1'> <BiEdit /> </button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold  text-white rounded-md mx-1'> <MdDelete /> </button>
              </div>

            </div>

          })}

        </div>



      </div>

    </>
  )
}

export default App
