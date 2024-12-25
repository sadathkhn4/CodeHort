package codehort.codehortbackend.models;

public class Problem {
    private long problemId;
    private String problemName;
    private String leetcodeLink;
    private long challengeId;
    private boolean solved;

    public Problem() {
    }

    public Problem(long id, String name, String leetcodeLink, long challengeId, boolean solved) {
        this.problemId = id;
        this.problemName = name;
        this.leetcodeLink = leetcodeLink;
        this.challengeId = challengeId;
        this.solved = solved;
    }

    public long getProblemId() {
        return problemId;
    }

    public void setProblemId(long id) {
        this.problemId = id;
    }

    public String getProblemName() {
        return problemName;
    }

    public void setProblemName(String name) {
        this.problemName = name;
    }

    public String getLeetcodeLink() {
        return leetcodeLink;
    }

    public void setLeetcodeLink(String leetcodeLink) {
        this.leetcodeLink = leetcodeLink;
    }

    public long getChallengeId() {
        return challengeId;
    }

    public void setChallengeId(long challengeId) {
        this.challengeId = challengeId;
    }

    public boolean isSolved() {
        return solved;
    }

    public void setSolved(boolean solved) {
        this.solved = solved;
    }

}
