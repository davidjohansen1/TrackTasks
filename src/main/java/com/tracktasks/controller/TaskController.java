package com.tracktasks.controller;

import com.tracktasks.model.*;
import com.tracktasks.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin(origins = "*")
@RequestMapping(path="task")
public class TaskController {
  @Autowired
  private TaskRepository taskRepository;
  @Autowired
  private TaskService taskService;

  @GetMapping(path="/tasks")
  public @ResponseBody Iterable<FullTaskInfo> getTasks() {
    return taskRepository.getAllTasks();
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
