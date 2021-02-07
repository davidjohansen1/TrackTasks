package com.tracktasks.services;

import com.tracktasks.model.Task;
import com.tracktasks.model.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TaskService {
  @Autowired
  TaskRepository taskRepository;
  int taskId = 0;
  Task task = new Task();

  public void createNewTask(Task newTask) {
    try {
      taskId = taskRepository.taskIdMax();
      taskId+=1;
    } catch(Exception e) {
      taskId+=1;
    }

    task.setId(taskId);
    task.setName(newTask.getName());
    task.setDescription(newTask.getDescription());
    taskRepository.save(task);
  }
}
