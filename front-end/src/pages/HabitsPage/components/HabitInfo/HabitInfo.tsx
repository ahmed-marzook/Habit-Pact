import { useHabit } from "../../../../contexts/HabitContext/HabitContext";
import { useDeleteHabit } from "../../../../hooks/useHabitQuery";

export default function HabitInfo() {
  const { mutate } = useDeleteHabit();
  const { habit } = useHabit();
  return (
    <div className="habit__info">
      <div className="habit__info-item">
        <span>Success Rate: 78%</span>
      </div>
      <div className="habit__info-item">
        <span>Current Streak: 5 days</span>
      </div>
      <div className="habit__actions">
        <button className="habit__action-button habit__action--edit">
          Edit
        </button>
        <button
          className="habit__action-button habit__action--delete"
          onClick={() => mutate(habit.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
