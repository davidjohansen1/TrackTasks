package com.tracktasks.services;

import com.tracktasks.model.User;
import com.tracktasks.model.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
public class UserService {
  @Autowired
  private UserRepository userRepository;

  int userId = 0;
  String userEmail = "";
  String userCreationResult = "";
  User user = new User();
  PasswordEncoderGenerator passwordEncoderGenerator = new PasswordEncoderGenerator();

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
    user.setPassword(passwordEncoderGenerator.hashPassword(newUser.getPassword()));
    user.setUserType(newUser.getUserType());
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
        mainUserInfo.put("userType", user.getUserType());
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

}
