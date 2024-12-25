package codehort.codehortbackend.models;

public class Group {

    private long groupId;
    private String groupName;
    private String groupInfo;
    private String adminEmail;
    private boolean joined;
    private boolean requested;
    private long memberCount;

    // Constructors
    public Group() {
    }

    // Constructor
    public Group(long groupId, String groupName, String groupInfo, String adminEmail, Boolean joined,
            Boolean requested, Long memberCount) {
        this.groupId = groupId;
        this.groupName = groupName;
        this.groupInfo = groupInfo;
        this.adminEmail = adminEmail;
        this.joined = joined;
        this.requested = requested;
        this.memberCount = memberCount;
    }

    // Getters
    public long getGroupId() {
        return groupId;
    }

    public String getGroupName() {
        return groupName;
    }

    public String getGroupInfo() {
        return groupInfo;
    }

    public String getAdminEmail() {
        return adminEmail;
    }

    // Setters
    public void setGroupId(long groupId) {
        this.groupId = groupId;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public void setGroupInfo(String groupInfo) {
        this.groupInfo = groupInfo;
    }

    public void setAdminEmail(String adminEmail) {
        this.adminEmail = adminEmail;
    }

    public boolean isJoined() {
        return joined;
    }

    public void setJoined(boolean joined) {
        this.joined = joined;
    }

    public boolean isRequested() {
        return requested;
    }

    public void setRequested(boolean requested) {
        this.requested = requested;
    }

    public long getMemberCount() {
        return memberCount;
    }

    public void setMemberCount(long memberCount) {
        this.memberCount = memberCount;
    }

    // toString method
    @Override
    public String toString() {
        return "Group{" +
                "groupId=" + groupId +
                ", groupName='" + groupName + '\'' +
                ", groupInfo='" + groupInfo + '\'' +
                ", adminEmail='" + adminEmail + '\'' +
                '}';
    }
}
