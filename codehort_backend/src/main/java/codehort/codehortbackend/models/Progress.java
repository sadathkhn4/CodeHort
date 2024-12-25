package codehort.codehortbackend.models;

public class Progress {
    private Long challengeId;
    private String email;
    private Long groupId;
    private Long problemId;

    public Progress() {
    }

    public Progress(Long challengeId, String email, Long groupId, Long problemId) {
        this.challengeId = challengeId;
        this.email = email;
        this.groupId = groupId;
        this.problemId = problemId;
    }

    public Long getChallengeId() {
        return challengeId;
    }

    public void setChallengeId(Long challengeId) {
        this.challengeId = challengeId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getGroupId() {
        return groupId;
    }

    public void setGroupId(Long groupId) {
        this.groupId = groupId;
    }

    public Long getProblemId() {
        return problemId;
    }

    public void setProblemId(Long problemId) {
        this.problemId = problemId;
    }
}