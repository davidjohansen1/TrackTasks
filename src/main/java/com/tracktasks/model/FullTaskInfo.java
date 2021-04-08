package com.tracktasks.model;

public interface FullTaskInfo {
  Integer getid();
  String getname();
  String getdescription();
  Integer getassigned_user();
  String getusername();
  Boolean getavailable();
  String getstatus();
  String getNotes();
  Integer getOwner();
  String getownername();
}
