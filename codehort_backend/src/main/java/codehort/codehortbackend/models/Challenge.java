package codehort.codehortbackend.models;

public class Challenge {
    private long challengeId;
    private String challengeName;
    private long groupId;
    private long totalProblems;
    private long solvedProblems;

    public Challenge() {
    }

    public Challenge(long id, String name, long groupId) {
        this.challengeId = id;
        this.challengeName = name;
        this.groupId = groupId;
    }

    public long getChallengeId() {
        return challengeId;
    }

    public void setChallengeId(long id) {
        this.challengeId = id;
    }

    public String getChallengeName() {
        return challengeName;
    }

    public void setChallengeName(String name) {
        this.challengeName = name;
    }

    public long getGroupId() {
        return groupId;
    }

    public void setGroupId(long groupId) {
        this.groupId = groupId;
    }

    public long getTotalProblems() {
        return totalProblems;
    }

    public void setTotalProblems(long totalProblems) {
        this.totalProblems = totalProblems;
    }

    public long getSolvedProblems() {
        return solvedProblems;
    }

    public void setSolvedProblems(long solvedProblems) {
        this.solvedProblems = solvedProblems;
    }
}
