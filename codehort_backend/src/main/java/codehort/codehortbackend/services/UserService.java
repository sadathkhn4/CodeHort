package codehort.codehortbackend.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import codehort.codehortbackend.controllers.UserInterface;
import codehort.codehortbackend.models.User;

@Repository
public class UserService implements UserInterface {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public int save(User user) {

        try {
            int rowsAffected = jdbcTemplate.update(
                    "INSERT INTO UserProfiles (FirstName, LastName, Email, Bio, LinkedinUrl) VALUES (?,?, ?, ?, ?)",
                    user.getFirstName(), user.getLastName(), user.getEmail(), user.getBio(),
                    user.getLinkedinUrl());
            if (rowsAffected == 1) {
                return 1;
            } else {
                throw new RuntimeException("Failed to create user.");
            }
        } catch (Exception e) {

            e.printStackTrace();

            throw new RuntimeException("Failed to create user: " + e.getMessage());
        }
    }

    @Override
    public User getUserByEmailId(String email) {
        try {
            User user = jdbcTemplate.queryForObject("SELECT * FROM UserProfiles WHERE email=?",
                    BeanPropertyRowMapper.newInstance(User.class), email);
            return user;
        } catch (EmptyResultDataAccessException e) {
            return null;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to fetch user by email: " + e.getMessage());
        }
    }

    @Override
    public List<User> getAllUsers() {
        try {
            return jdbcTemplate.query("SELECT * FROM UserProfiles",
                    BeanPropertyRowMapper.newInstance(User.class));
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to fetch all users: " + e.getMessage());
        }
    }

    @Override
    public User updateUser(User user) {

        //throw new UnsupportedOperationException("Unimplemented method 'updateUser'");
        try {
            int rowsAffected = jdbcTemplate.update(
                    "UPDATE UserProfiles SET FirstName = ?, LastName = ?, LinkedinUrl = ?, Bio = ? WHERE Email = ?;",

                    user.getFirstName(), user.getLastName(), user.getLinkedinUrl(), user.getBio(), user.getEmail());
            if (rowsAffected == 1) {
                return user;
            } else {
                throw new RuntimeException("Failed to update user.");
            }
        } catch (Exception e) {

            e.printStackTrace();

            throw new RuntimeException("Failed to update user: " + e.getMessage());
        }
    }

    @Override
    public void deleteUser(String email) {

        throw new UnsupportedOperationException("Unimplemented method 'deleteUser'");
    }

    @SuppressWarnings("deprecation")
    @Override
    public List<User> getUserListByIds(List<String> emailIds) {
        try {

            String placeholders = emailIds.stream().map(id -> "?").collect(Collectors.joining(","));

            return jdbcTemplate.query("SELECT * FROM UserProfiles WHERE Email IN (" + placeholders + ")",
                    emailIds.toArray(), BeanPropertyRowMapper.newInstance(User.class));
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to fetch users by IDs: " + e.getMessage());
        }
    }

}
