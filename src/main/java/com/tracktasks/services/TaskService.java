package com.tracktasks.services;

import com.tracktasks.model.*;
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
    task.setAssignedUser(newTask.getAssignedUser());
    task.setAvailable(newTask.getAvailable());
    taskRepository.save(task);
  }

  public void updateExistingTask(Task currentTaskUser) {
      task.setId(currentTaskUser.getId());
      task.setName(currentTaskUser.getName());
      task.setDescription(currentTaskUser.getDescription());
      task.setAssignedUser(currentTaskUser.getAssignedUser());
      task.setAvailable(currentTaskUser.getAvailable());
      taskRepository.save(task);
  }
}
