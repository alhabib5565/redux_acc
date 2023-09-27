import { ArrowRightIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useDeleteTaskMutation, useUpdateStatusMutation } from '../../redux/features/tasks/taskApi';
// import { useUpdateStatusMutation } from '../../redux/features/api/baseApi';

const TaskCard = ({ task }) => {
  const [updateStatusMutation, { isLoading, isError, error, data }] = useUpdateStatusMutation();
  const [deleteTask] = useDeleteTaskMutation()
  // console.log(data, error)
  let updatedStatus;

  if (task.status === 'pending') {
    updatedStatus = 'running';
  } else if (task.status === 'running') {
    updatedStatus = 'done';
  } else {
    updatedStatus = 'archive';
  }
  const updateStatus = (id) => {
    const options = { _id: id, data: { status: updatedStatus } }
    updateStatusMutation(options)
  }

  const handleDeleteTask = (id) => {
    console.log(id)
    deleteTask(id)
  }

  return (
    <div className="bg-secondary/10 rounded-md p-5">
      <h1
        className={`text-lg font-semibold mb-3 ${task.priority === 'high' ? 'text-red-500' : ' '
          } ${task.priority === 'medium' ? 'text-yellow-500' : ' '} ${task.priority === 'low' ? 'text-green-500' : ' '
          }`}
      >
        {task?.title}
      </h1>
      <p className="mb-3">{task?.description}</p>
      <p className="text-sm">Assigned to - {task?.assignedTo}</p>
      <div className="flex justify-between mt-3">
        <p>{task?.date}</p>
        <div className="flex gap-3">
          <button onClick={() => handleDeleteTask(task._id)} title="Delete">
            <TrashIcon className="h-5 w-5 text-red-500" />
          </button>
          <button
            onClick={() => updateStatus(task._id)}
            title="Update Status"
          >
            <ArrowRightIcon className="h-5 w-5 text-primary" />
          </button>
        </div>
      </div>
    </div >
  );
};

export default TaskCard;
