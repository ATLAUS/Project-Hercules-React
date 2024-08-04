import './ExerciseCard.scss'

export const ExerciseCard = ({ exercise }) => {
  return (
    <>
      <div className="exercise-card">
        <p>{exercise.name}</p>
      </div>
    </>
  )
}
