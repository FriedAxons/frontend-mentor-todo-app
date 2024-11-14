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
  const itemsLeft = todos.filter((todo) => !todo.completed).length;

  const handleFilterClick = (status: "All" | "Active" | "Completed") => {
    setActiveFilter(status);
    filterTodos(status);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  );

  // Handle drag end event
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeIndex = todos.findIndex((todo) => todo.id === active.id);
    const overIndex = todos.findIndex((todo) => todo.id === over.id);

    if (activeIndex !== overIndex) {
      const updatedTodos = arrayMove(todos, activeIndex, overIndex);
      updateTodoOrder(updatedTodos);
    }
  };

  // Sortable list items, wrapping each `todo` in a `SortableItem` component
  const SortableItem: React.FC<{ todo: Todo }> = ({ todo }) => {
    const { attributes, listeners, setNodeRef } = useSortable({ id: todo.id });

    return (
      <li
        ref={setNodeRef} // Attach the ref to the list item
        {...attributes} // Spread the attributes for accessibility
        {...listeners} // Spread the listeners for drag events
        className={styles.todoItem}
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
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div
        className={`${styles.todoList} ${
          darkMode ? styles.dark : styles.light
        }`}
      >
        <SortableContext
          items={todos.map((todo) => todo.id)}
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
