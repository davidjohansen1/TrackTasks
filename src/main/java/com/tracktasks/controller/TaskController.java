package com.tracktasks.controller;

import com.tracktasks.model.*;
import com.tracktasks.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@CrossOrigin(origins = "*")
@RequestMapping(path="task")
public class TaskController {
  @Autowired
  private TaskRepository taskRepository;
  @Autowired
  private TaskService taskService;

  @GetMapping(path="/getTasks")
  public @ResponseBody Iterable<FullTaskInfo> getTasks() {
    return taskRepository.getTasks();
  }

  @GetMapping(path="/getUnavailableTasks")
  public @ResponseBody Iterable<FullTaskInfo> getUnavailableTasks() {
    return taskRepository.getUnavailableTasks();
  }

  @GetMapping(path="/getAvailableTasks")
  public @ResponseBody Iterable<FullTaskInfo> getAvailableTasks() {
    return taskRepository.getAvailableTasks();
  }

  @GetMapping(path="/getAssignedTasks")
  public @ResponseBody Iterable<FullTaskInfo> getAssignedTasks() {
    return taskRepository.getAssignedTasks();
  }

  @PostMapping(path="/getUserTasks")
  public @ResponseBody
  List<FullTaskInfo> getUserTasks(@RequestBody int userId) {
    return taskRepository.getUserTasks(userId);
  }

  @PostMapping(path="/createTask")
  public @ResponseBody
  String createTask(@RequestBody Task newTask) {
    taskService.createNewTask(newTask);
    return "task created successfully";
  }

  @PostMapping(path="/editTask")
  public @ResponseBody
  String editTask(@RequestBody Task currentTaskUser) {
    taskService.updateExistingTask(currentTaskUser);
    return "task updated successfully";
  }

}
