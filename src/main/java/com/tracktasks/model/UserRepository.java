package com.tracktasks.model;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRepository extends CrudRepository<User, Integer> {
  @Query(value = "SELECT max(id) FROM User")
  public int userIdMax();

  @Query(value = "SELECT * FROM user WHERE user_type = 'child' OR user_type = 'employee'", nativeQuery = true)
  public List<StudentChildren> studentsAndChildren();

  public User findByUsername(String username);
}
