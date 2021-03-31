package com.tracktasks.model;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends CrudRepository<User, Integer> {
  @Query(value = "SELECT max(id) FROM User")
  public int userIdMax();

  @Query(value = "SELECT * FROM user", nativeQuery = true)
  public List<StudentChildren> studentsAndChildren();

  @Query(value = "SELECT id, username, first_name, invite, last_name FROM user\n" +
    "WHERE id != :userId\n" +
    "AND (username like %:searhTerm%\n" +
    "OR first_name like %:searhTerm%\n" +
    "OR last_name like %:searhTerm%)", nativeQuery = true)
  public List<UserInfo> findUsers(@Param("searhTerm") String searhTerm, @Param("userId") int userId);

  public User findByUsername(String username);
}
