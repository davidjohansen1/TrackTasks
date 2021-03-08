package com.tracktasks.model;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TaskRepository extends CrudRepository<Task, Integer> {
  @Query(value = "SELECT max(id) FROM Task")
  public int taskIdMax();

  @Query(value = "SELECT t.id, t.name, t.description, t.assigned_user, t.available, u.username " +
    "FROM task t LEFT JOIN user u ON u.id = t.assigned_user;", nativeQuery = true)
  public List<FullTaskInfo> getTasks();

  @Query(value = "SELECT t.id, t.name, t.description, t.assigned_user, t.available, u.username " +
    "FROM task t LEFT JOIN user u ON u.id = t.assigned_user " +
    "WHERE t.available = 0;", nativeQuery = true)
  public List<FullTaskInfo> getUnavailableTasks();

  @Query(value = "SELECT t.id, t.name, t.description, t.assigned_user, t.available, u.username " +
    "FROM task t LEFT JOIN user u ON u.id = t.assigned_user " +
    "WHERE t.assigned_user = 0 AND t.available = 1", nativeQuery = true)
  public List<FullTaskInfo> getAvailableTasks();

  @Query(value = "SELECT t.id, t.name, t.description, t.assigned_user, t.available, u.username " +
    "FROM task t LEFT JOIN user u ON u.id = t.assigned_user " +
    "WHERE t.assigned_user != 0", nativeQuery = true)
  public List<FullTaskInfo> getAssignedTasks();

  @Query(value = "SELECT t.id, t.name, t.description, t.assigned_user, t.status, u.username FROM task t\n" +
    "LEFT JOIN user u ON u.id = t.assigned_user\n"+
    "WHERE t.assigned_user = :userId", nativeQuery = true)
  public List<FullTaskInfo> getUserTasks(@Param("userId") int userId);
}
