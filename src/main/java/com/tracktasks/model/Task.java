package com.tracktasks.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Task {
  @Id
  private int id;
  private String name;
  private String description;
  private int assignedUser;
  private boolean available;

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public int getAssignedUser() {
    return assignedUser;
  }

  public void setAssignedUser(int assignedUser) {
    this.assignedUser = assignedUser;
  }

  public boolean getAvailable() {
    return this.available;
  }

  public void setAvailable(boolean available) {
    this.available = available;
  }
}
