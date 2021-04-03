package com.tracktasks.model;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserToSupervisorRepository extends CrudRepository<UserToSupervisor, Integer> {
  @Query(value = "SELECT max(id) FROM UserToSupervisor")
  public int userToSupervisorIdMax();

  @Query(value = "SELECT * FROM user_to_supervisor\n" +
    "WHERE supervisor_id = :supervisorId\n" +
    "AND user_id = :userId", nativeQuery = true)
  public UserToSupervisor userToSupervisorInfo(@Param("supervisorId") int supervisorId, @Param("userId") int userId);

}
