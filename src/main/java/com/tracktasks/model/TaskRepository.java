package com.tracktasks.model;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TaskRepository extends CrudRepository<Task, Integer> {
  @Query(value = "SELECT max(id) FROM Task")
  public int taskIdMax();

  @Query(value = "SELECT t.id, t.name, t.description, t.assigned_user, u.username FROM task t LEFT JOIN user u ON u.id = t.assigned_user", nativeQuery = true)
  public List<FullTaskInfo> getAllTasks();
}
