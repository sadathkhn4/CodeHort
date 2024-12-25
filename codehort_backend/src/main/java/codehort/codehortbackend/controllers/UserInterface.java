package codehort.codehortbackend.controllers;

import codehort.codehortbackend.models.User;

import java.util.List;

public interface UserInterface {

    int save(User user);

    User getUserByEmailId(String email);

    List<User> getAllUsers();

    User updateUser(User user);

    void deleteUser(String email);

    List<User> getUserListByIds(List<String> emailIds);

}
