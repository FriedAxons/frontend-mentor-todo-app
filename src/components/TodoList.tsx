import { useState } from "react";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";

import styles from "../styles/TodoList.module.scss";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  toggleTodo: (id: number) => void;
  clearCompleted: () => void;
  filterTodos: (status: "All" | "Active" | "Completed") => void;
  deleteTodo: (id: number) => void;
  updateTodoOrder: (updatedTodos: Todo[]) => void;
  darkMode: boolean;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  toggleTodo,
  clearCompleted,
  filterTodos,
  deleteTodo,
  updateTodoOrder,
  darkMode,
}) => {
  const [activeFilter, setActiveFilter] = useState<
    "All" | "Active" | "Completed"
  >("All");
  const [isDragging, setIsDragging] = useState(false); // Track drag state

  const itemsLeft = todos.filter((todo) => !todo.completed).length;

  const handleFilterClick = (status: "All" | "Active" | "Completed") => {
    setActiveFilter(status);
    filterTodos(status);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  );

  const handleDragStart = () => {
    setIsDragging(true); // Set dragging state to true on drag start
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setIsDragging(false); // Reset dragging state to false on drag end
    const { active, over } = event;
    if (!over) return;

    const activeIndex = todos.findIndex(
      (todo) => todo.id.toString() === active.id.toString()
    );
    const overIndex = todos.findIndex(
      (todo) => todo.id.toString() === over.id.toString()
    );

    if (activeIndex !== overIndex) {
      const updatedTodos = arrayMove(todos, activeIndex, overIndex);
      updateTodoOrder(updatedTodos);
    }
  };

  const SortableItem: React.FC<{ todo: Todo }> = ({ todo }) => {
    const { attributes, listeners, setNodeRef, isDragging } = useSortable({
      id: todo.id.toString(),
    });

    return (
      <li
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className={`${styles.todoItem} ${
          isDragging ? `${styles.grabbing} ${styles.dragging}` : ""
        }`}
      >
        <span
          className={`${styles.radioButton} ${
            todo.completed ? styles.completed : ""
          }`}
          onClick={() => toggleTodo(todo.id)}
        ></span>
        <span
          className={`${styles.todoText} ${
            todo.completed ? styles.completed : ""
          }`}
          onClick={() => toggleTodo(todo.id)}
        >
          {todo.text}
        </span>
        <span
          className={styles.deleteIcon}
          onClick={(e) => {
            e.stopPropagation(); // Prevent toggling completion when deleting
            deleteTodo(todo.id);
          }}
        ></span>
      </li>
    );
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div
        className={`${styles.todoList} ${
          darkMode ? styles.dark : styles.light
        }`}
      >
        <SortableContext
          items={todos.map((todo) => todo.id.toString())}
          strategy={verticalListSortingStrategy}
        >
          <ul>
            {todos.map((todo) => (
              <SortableItem key={todo.id} todo={todo} />
            ))}
          </ul>
        </SortableContext>

        <div className={styles.footer}>
          <span className={styles.itemsLeft}>{itemsLeft} items left</span>
          <div className={styles.filters}>
            <button
              onClick={() => handleFilterClick("All")}
              className={activeFilter === "All" ? styles.active : ""}
            >
              All
            </button>
            <button
              onClick={() => handleFilterClick("Active")}
              className={activeFilter === "Active" ? styles.active : ""}
            >
              Active
            </button>
            <button
              onClick={() => handleFilterClick("Completed")}
              className={activeFilter === "Completed" ? styles.active : ""}
            >
              Completed
            </button>
          </div>
          <button className={styles.clearCompleted} onClick={clearCompleted}>
            Clear Completed
          </button>
        </div>
        <p className={styles.dragHint}>Drag and drop to reorder list</p>
      </div>
    </DndContext>
  );
};

export default TodoList;
