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
    task.setStatus("Not Started");
    task.setNotes(newTask.getNotes());
    task.setOwner(newTask.getOwner());
    taskRepository.save(task);
  }

  public void updateExistingTask(Task currentTask) {
      task.setId(currentTask.getId());
      task.setName(currentTask.getName());
      task.setDescription(currentTask.getDescription());
      task.setAssignedUser(currentTask.getAssignedUser());
      task.setAvailable(currentTask.getAvailable());
      task.setStatus(currentTask.getStatus());
      task.setNotes(currentTask.getNotes());
      task.setOwner(currentTask.getOwner());
      taskRepository.save(task);
  }

  public void deleteTask(int currentTaskId) {
    task.setId(currentTaskId);
    taskRepository.delete(task);
  }
}
