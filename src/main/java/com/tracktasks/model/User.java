package com.tracktasks.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class User {
  @Id
  private int id;
  private String username;
  private String firstName;
  private String lastName;
  private String password;
  private String invite;

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getFirst() {
    return firstName;
  }

  public void setFirst(String firstName) {
    this.firstName = firstName;
  }

  public String getLast() {
    return lastName;
  }

  public void setLast(String lastName) {
    this.lastName = lastName;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getInvite() {
    return invite;
  }

  public void setInvite(String invite) {
    this.invite = invite;
  }
}
