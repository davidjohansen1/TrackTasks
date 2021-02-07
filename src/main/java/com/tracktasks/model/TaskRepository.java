package com.tracktasks.model;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface TaskRepository extends CrudRepository<Task, Integer> {
  @Query(value = "SELECT max(id) FROM Task")
  public int taskIdMax();
}
