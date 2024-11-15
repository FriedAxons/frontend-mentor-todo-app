import { useState } from "react";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  DragEndEvent,
  DragOverlay,
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
  const [activeId, setActiveId] = useState<string | null>(null); // Track the active drag item
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

  const handleDragStart = (event: DragEndEvent) => {
    setActiveId(event.active.id.toString()); // Set the active drag item ID
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null); // Reset active drag item
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
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({
        id: todo.id.toString(),
      });

    // Apply transform and transition styles to animate movement
    const style = {
      transform: transform
        ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
        : undefined,
      transition: transition ?? undefined,
    };

    return (
      <li
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className={`${styles.todoItem}`}
        style={style} // Apply animated style here
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

        <DragOverlay>
          {activeId ? (
            // Render the item being dragged in the overlay
            <div className={`${styles.todoItem} ${styles.draggingOverlay}`}>
              <span className={styles.radioButton}></span>
              <span className={styles.todoText}>
                {todos.find((todo) => todo.id.toString() === activeId)?.text}
              </span>
              <span className={styles.deleteIcon}></span>
            </div>
          ) : null}
        </DragOverlay>

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
