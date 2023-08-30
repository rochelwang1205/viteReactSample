import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes, faPenToSquare, faCheck} from '@fortawesome/free-solid-svg-icons';
import listData from './listData';
import { useState } from 'react';

const toDoList = () => {
    const [todos, setTodos] = useState(listData);
    const [task, setTask] = useState('');
    const [filter, setFilter] = useState('all');
    const [editedTask, setEditedTask] = useState({});

    const addTodo = () => {
        if (task.trim() === '') return;
        const newTodo = { id: Date.now(), text: task, completed: false };
        setTodos([...todos, newTodo]);
        setTask('');
    };

    const toggleTodo = (id) => {
        const updatedTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updatedTodos);
    };

    const deleteCompleted = () => {
        const updatedTodos = todos.filter((todo) => !todo.completed);
        setTodos(updatedTodos);
    };

    const removeItem = (id) => {
        const newTodos = todos.filter((todo) => todo.id !== id);
        setTodos(newTodos);
    };

    const handleTaskChange = (event, id) => {
        const updatedEditedTask = { ...editedTask, [id]: event.target.value };
        setEditedTask(updatedEditedTask);
    };

    const handleSaveTask = (id) => {
        const updatedTodos = todos.map((item) =>
            item.id === id ? { ...item, text: editedTask[id] } : item
        );
        setTodos(updatedTodos);
        const updatedEditedTask = { ...editedTask };
        delete updatedEditedTask[id];
        setEditedTask(updatedEditedTask);
    };

    const filteredTodos = todos.filter((todo) => {
        if (filter === 'all') return true;
        if (filter === 'completed') return todo.completed;
        if (filter === 'Todo') return !todo.completed;
        return true;
    });

    return (
        <div id="todoListPage" className="bg-half">
            <nav>
                <h1><a href="#">ONLINE TODO LIST</a></h1>
                <ul>
                    <li className="todo_sm"><a href="#"><span>王小明的代辦</span></a></li>
                    <li><a href="#loginPage">登出</a></li>
                </ul>
            </nav>
            <div className="conatiner todoListPage vhContainer">
                <div className="todoList_Content">
                    <div className="inputBox">
                        <input type="text" placeholder="請輸入待辦事項" value={task}
                            onChange={(e) => setTask(e.target.value)} />
                        <a onClick={addTodo} >
                            <FontAwesomeIcon icon={faPlus} color="white" />
                        </a>
                    </div>
                    <div className="todoList_list">
                        <ul className="todoList_tab">
                            <li>
                                <a onClick={() => { setFilter('all'); }}
                                    className={filter === 'all' ? 'active' : ''} >
                                    全部
                                </a>
                            </li>
                            <li>
                                <a onClick={() => { setFilter('Todo'); }}
                                    className={filter === 'Todo' ? 'active' : ''} >
                                    待完成
                                </a>
                            </li>
                            <li>
                                <a onClick={() => { setFilter('completed'); }}
                                    className={filter === 'completed' ? 'active' : ''} >
                                    已完成
                                </a>
                            </li>


                        </ul>
                        <div className="todoList_items">
                            {filteredTodos.length === 0 ? (
                                <ul className="todoList_item">
                                    <li className="todoList_label">
                                        目前尚無待辦事項
                                    </li>
                                </ul>
                            ) : (
                                <ul className="todoList_item">
                                {filteredTodos.map((todo) => (
                                  <li key={todo.id}>
                                    <div>
                                      <label className={`todoList_label ${todo.completed ? 'completed' : ''}`}>
                                        <input
                                          className="todoList_input"
                                          type="checkbox"
                                          checked={todo.completed}
                                          onChange={() => toggleTodo(todo.id)}
                                        />
                                        {editedTask[todo.id] !== undefined ? (
                                          <input
                                            type="text"
                                            value={editedTask[todo.id]}
                                            onChange={(event) => handleTaskChange(event, todo.id)}
                                          />
                                        ) : (
                                          <span>{todo.text}</span>
                                        )}
                                      </label>
                                    </div>
                                    <div>
                                      {editedTask[todo.id] !== undefined ? (
                                        <FontAwesomeIcon icon={faCheck} onClick={() => handleSaveTask(todo.id)} className="ms-3 faCheck" />
                                      ) : (
                                        <FontAwesomeIcon icon={faPenToSquare} onClick={() => setEditedTask({ ...editedTask, [todo.id]: todo.text })} className="ms-3" />
                                      )}
                                      <FontAwesomeIcon icon={faTimes} className='ms-3' onClick={() => removeItem(todo.id)} />
                                    </div>
                                  </li>
                                ))}
                              </ul>
                              
                            )}
                            <div className="todoList_statistics">
                                <p>{filteredTodos.filter((todo) => !todo.completed).length}個待辦項目</p>
                                <a onClick={deleteCompleted} >清除已完成項目</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );

}

export default toDoList;
