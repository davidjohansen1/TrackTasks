package com.tracktasks.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class User {
  @Id
  private int id;
  private String username;
  private String first;
  private String last;
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
    return first;
  }

  public void setFirst(String first) {
    this.first = first;
  }

  public String getLast() {
    return last;
  }

  public void setLast(String last) {
    this.last = last;
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
