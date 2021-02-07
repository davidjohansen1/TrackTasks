package com.tracktasks.services;

import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

@Service
public class PasswordEncoderGenerator {

  public String hashPassword(String password) {
    String passwordHash = BCrypt.hashpw(password, BCrypt.gensalt());
    return passwordHash;
  }

  public boolean authenticateUser(String inputPassword, String correctPassword) {
    if (BCrypt.checkpw(inputPassword, correctPassword))
      return true;
    else
      return false;
  }
}
