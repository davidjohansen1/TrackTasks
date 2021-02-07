package com.tracktasks.model;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer> {
  @Query(value = "SELECT max(id) FROM User")
  public int userIdMax();

  public User findByUsername(String email);
}
