package com.tracktasks.controller;

import com.tracktasks.model.*;
import com.tracktasks.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin(origins = "*")
@RequestMapping(path="user")
public class UserController {
  @Autowired
  private UserRepository userRepository;
  @Autowired
  private UserService userService;

  @PostMapping(path="/create")
  public @ResponseBody
  String createUser(@RequestBody User newUser) {
    return userService.createNewUser(newUser);
  }

  @PostMapping(path="/authenticate", produces = "application/json")
  @ResponseBody
  Object authenticateUser(@RequestBody User userInfo) {
    return userService.authenticateUserCredentials(userInfo);
  }

  @PostMapping(path="/inviteUser", produces = "application/json")
  @ResponseBody
  Object inviteUser(@RequestBody UserToSupervisor userToSupervisor) {
    return userService.inviteUser(userToSupervisor);
  }

  @GetMapping(path="/myUsers")
  public @ResponseBody
  Iterable<UserInfo> getMyUsers(@RequestParam int supervisorId) {
    return userRepository.findMyUsers(supervisorId);
  }

  @GetMapping(path="/studentchildusers")
  public @ResponseBody
  Iterable<StudentChildren> getStudebtChildren() {
    return userRepository.studentsAndChildren();
  }

  @GetMapping(path="/findUsers")
  public @ResponseBody
  Iterable<UserInfo> findUsers(@RequestParam String searchTerm, @RequestParam int userId) {
    return userRepository.findUsers(searchTerm, userId);
  }

  @GetMapping(path="/checkInvitations")
  public @ResponseBody
  UserInfo checkInvitations(@RequestParam int userId) {
    return userRepository.checkInvitations(userId);
  }

  @PostMapping(path="/inviteResponse")
  public @ResponseBody
  String inviteResponse(@RequestParam int inviteId, @RequestParam int userId, @RequestParam int supervisorId, @RequestParam String status) {
    userService.inviteResponse(inviteId, userId, supervisorId, status);
    return "invited accepted";
  }

}
