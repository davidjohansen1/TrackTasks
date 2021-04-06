package com.tracktasks.model;

public interface FullTaskInfo {
  int getid();
  String getname();
  String getdescription();
  int getassigned_user();
  String getusername();
  Boolean getavailable();
  String getstatus();
  String getNotes();
  Integer getOwner();
  String getownername();
}
