package codehort.codehortbackend.models;

public class Leaderboard {
    private int userId;
    private String username;
    private int problemsSolved;
    private String email;

    // Constructor
    public Leaderboard(int userId, String username, int problemsSolved, String email) {
        this.userId = userId;
        this.username = username;
        this.problemsSolved = problemsSolved;
        this.email = email;
    }

    // Getters and setters
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getProblemsSolved() {
        return problemsSolved;
    }

    public void setProblemsSolved(int problemsSolved) {
        this.problemsSolved = problemsSolved;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

}