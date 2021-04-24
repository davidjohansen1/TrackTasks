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
  public @ResponseBody Iterable<FullTaskInfo> getUnavailableTasks(@RequestParam int loggedInUserId) {
    return taskRepository.getUnavailableTasks(loggedInUserId);
  }

  @GetMapping(path="/getAvailableTasks")
  public @ResponseBody Iterable<FullTaskInfo> getAvailableTasks(@RequestParam int loggedInUserId) {
    return taskRepository.getAvailableTasks(loggedInUserId);
  }

  @GetMapping(path="/getAssignedTasks")
  public @ResponseBody Iterable<FullTaskInfo> getAssignedTasks(@RequestParam int loggedInUserId) {
    return taskRepository.getAssignedTasks(loggedInUserId);
  }

  @PostMapping(path="/getUserNotStartTasks")
  public @ResponseBody
  List<FullTaskInfo> getUserNotStartTasks(@RequestBody int userId) {
    return taskRepository.getUserNotStartTasks(userId);
  }

  @PostMapping(path="/getUserInProgressTasks")
  public @ResponseBody
  List<FullTaskInfo> getUserInProgressTasks(@RequestBody int userId) {
    return taskRepository.getUserInProgressTasks(userId);
  }

  @PostMapping(path="/getUserCompletedTasks")
  public @ResponseBody
  List<FullTaskInfo> getUserCompletedTasks(@RequestBody int userId) {
    return taskRepository.getUserCompletedTasks(userId);
  }

  @PostMapping(path="/getTask")
  public @ResponseBody
  FullTaskInfo getTask(@RequestBody int taskId) {
    return taskRepository.getTask(taskId);
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

  @DeleteMapping(path="/deleteTask")
  public @ResponseBody
  String deleteTask(@RequestParam int id) {
    taskService.deleteTask(id);
    return "task successfully deleted";
  }

  @GetMapping(path="/getUserTasksBySupervisor")
  public @ResponseBody Iterable<FullTaskInfo> getUserTasksBySupervisor(@RequestParam int loggedInUserId, @RequestParam int taskUserId) {
    return taskRepository.getUserTasksBySupervisor(loggedInUserId, taskUserId);
  }

  @PostMapping(path="/updateTaskStatus")
  public @ResponseBody
  String updateTaskStatus(@RequestParam int taskId, @RequestParam String status) {
    taskRepository.updateTaskStatus(taskId, status);
    return "task updated successfully";
  }

}
