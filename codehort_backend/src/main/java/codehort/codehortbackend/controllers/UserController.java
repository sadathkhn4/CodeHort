package codehort.codehortbackend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import codehort.codehortbackend.models.User;
import codehort.codehortbackend.services.UserService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class UserController {

    @Autowired
    UserService userRepository;

    @GetMapping("/users/getAllUsers")
    public ResponseEntity<List<User>> getAllUsers(@RequestParam(required = false) String firstName) {
        try {
            List<User> users = userRepository.getAllUsers();

            if (users.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(users, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/users/getUserById/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") String emailId) {
        User user = userRepository.getUserByEmailId(emailId);

        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/users/createUser")
    public ResponseEntity<User> createUser(@RequestBody User user) {

        User userExistsCheck = userRepository.getUserByEmailId(user.getEmail());
        if (userExistsCheck == null) {
            try {
                userRepository.save(user);
                return new ResponseEntity<>(user, HttpStatus.CREATED);
            } catch (Exception e) {
                return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else
            return new ResponseEntity<>(userExistsCheck, HttpStatus.NOT_ACCEPTABLE);
    }

    @PutMapping("/users/updateUser/{id}")
    public ResponseEntity<User> updateUser(@PathVariable("id") String emailId, @RequestBody User user) {
        User currentUser = userRepository.getUserByEmailId(emailId);

        if (currentUser != null) {
            user.setEmail(emailId); // Ensure the Email ID remains unchanged
            User updatedUser = userRepository.updateUser(user);
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/users/deleteUser/{id}")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable("id") String emailString) {
        try {
            userRepository.deleteUser(emailString);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
