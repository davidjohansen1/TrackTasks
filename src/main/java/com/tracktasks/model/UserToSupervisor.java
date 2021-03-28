package com.tracktasks.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class UserToSupervisor {
  @Id
  private int id;
  private int userId;
  private int supervisorId;

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public int getUserId() {
    return userId;
  }

  public void setUserId(int userId) {
    this.userId = userId;
  }

  public int getSupervisorId() {
    return userId;
  }

  public void setSupervisorId(int supervisorId) {
    this.supervisorId = supervisorId;
  }

}
