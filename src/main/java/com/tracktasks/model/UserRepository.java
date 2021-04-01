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

  @Query(value = "SELECT u.id, username, first_name, status, last_name FROM user u\n" +
    "LEFT JOIN user_to_supervisor uts ON uts.user_id = u.id\n" +
    "WHERE u.id NOT IN (SELECT user_id FROM user_to_supervisor\n" +
    "WHERE supervisor_id = :userId)\n" +
    "AND u.id != :userId\n" +
    "AND (username like %:searhTerm%\n" +
    "OR first_name like %:searhTerm%\n" +
    "OR last_name like %:searhTerm%)\n" +
    "ORDER BY username;", nativeQuery = true)
  public List<UserInfo> findUsers(@Param("searhTerm") String searhTerm, @Param("userId") int userId);

  @Query(value = "SELECT u.id, username, first_name, last_name, status FROM user u\n" +
    "JOIN user_to_supervisor uts ON uts.user_id = u.id\n" +
    "WHERE supervisor_id = :supervisorId\n" +
    "ORDER BY username", nativeQuery = true)
  public List<UserInfo> findMyUsers(@Param("supervisorId") int supervisorId);

  @Query(value = "SELECT uts.id, uts.status, uts.supervisor_id, u.username, u.first_name, u.last_name FROM user_to_supervisor uts\n" +
    "JOIN user u ON u.id = uts.supervisor_id\n" +
    "WHERE user_id = :userId\n" +
    "AND status = 'Pending'" +
    "LIMIT 1;", nativeQuery = true)
  public UserInfo checkInvitations(@Param("userId") int userId);

  public User findByUsername(String username);

}
