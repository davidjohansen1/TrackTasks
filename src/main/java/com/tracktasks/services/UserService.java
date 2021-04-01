package com.tracktasks.services;

import com.tracktasks.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
public class UserService {
  @Autowired
  private UserRepository userRepository;
  @Autowired
  private UserToSupervisorRepository userToSupervisorRepository;

  int userId = 0;
  int userToSupervisorId = 0;
  String userEmail = "";
  String userCreationResult = "";
  User user = new User();
  PasswordEncoderGenerator passwordEncoderGenerator = new PasswordEncoderGenerator();
  UserToSupervisor userToSupervisor = new UserToSupervisor();

  public String createNewUser(User newUser) {
    try {
      userEmail = userRepository.findByUsername(newUser.getUsername()).getUsername();
    } catch (NullPointerException n) { }

    if( userEmail.equalsIgnoreCase(newUser.getUsername()) ) {
      return userCreationResult = "User already exists";
    }

    try {
      userId = userRepository.userIdMax();
      userId+=1;
    } catch(Exception e) {
      userId+=1;
    }

    user.setId(userId);
    user.setUsername(newUser.getUsername());
    user.setFirst(newUser.getFirst());
    user.setLast(newUser.getLast());
    user.setPassword(passwordEncoderGenerator.hashPassword(newUser.getPassword()));
    userRepository.save(user);
    userCreationResult = "User Created Successfully";

    return userCreationResult;
  }

  public Object authenticateUserCredentials(User userInfo) {
    HashMap mainUserInfo = new HashMap<>();
    try {
      user = userRepository.findByUsername(userInfo.getUsername());
      if (passwordEncoderGenerator.authenticateUser(userInfo.getPassword(), user.getPassword())) {
        mainUserInfo.put("credentials", user.getUsername());
        mainUserInfo.put("userId", user.getId());
        return mainUserInfo;
      } else {
        mainUserInfo.put("credentials", "bad username or password");
        return mainUserInfo;
      }
    } catch (Exception e){
      mainUserInfo.put("credentials", "bad username or password");
      return mainUserInfo;
    }
  }

  public String inviteUser(UserToSupervisor newUserToSupervisor) {
    UserToSupervisor currentUserToSup = userToSupervisorRepository.userToSupervisorInfo(newUserToSupervisor.getSupervisorId(), newUserToSupervisor.getUserId());

    try {
      if(currentUserToSup.getStatus().equalsIgnoreCase("Pending")) {
        return "user request already pending";
      }
    } catch (Exception e) { }

    try {
      userToSupervisorId = userToSupervisorRepository.userToSupervisorIdMax();
      userToSupervisorId+=1;
    } catch(Exception e) {
      userToSupervisorId+=1;
    }

    userToSupervisor.setId(userToSupervisorId);
    userToSupervisor.setSupervisorId(newUserToSupervisor.getSupervisorId());
    userToSupervisor.setUserId(newUserToSupervisor.getUserId());
    userToSupervisor.setStatus("Pending");
    userToSupervisorRepository.save(userToSupervisor);
    return "userToSupervisor set successfully";
  }

  public void inviteResponse(int inviteId, int userId, int supervisorId, String status) {
    userToSupervisor.setId(inviteId);
    userToSupervisor.setUserId(userId);
    userToSupervisor.setSupervisorId(supervisorId);
    userToSupervisor.setStatus(status);
    userToSupervisorRepository.save(userToSupervisor);
  }

}
