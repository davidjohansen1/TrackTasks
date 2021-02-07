package com.tracktasks.controller;

import com.tracktasks.model.User;
import com.tracktasks.model.UserRepository;
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
  public@ResponseBody
  String createUser(@RequestBody User newUser) {
    return userService.createNewUser(newUser);
  }

  @PostMapping(path="authenticate", produces = "application/json")
  @ResponseBody
  Object authenticateUser(@RequestBody User userInfo) {
    return userService.authenticateUserCredentials(userInfo);
  }
}
