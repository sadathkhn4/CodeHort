package codehort.codehortbackend.models;

import java.util.Objects;

public class Request {

    private Long requestId;
    private String requester;
    private String adminId;
    private String reqStatus;
    private Long groupId;
    private String groupName;
    private String requesterName;
    private String reqNote;

    // Constructors
    public Request() {
    }

    public Request(Long requestId, String requester, String adminId, String reqStatus, Long groupId, String groupName,
            String requesterName, String reqNote) {
        this.requestId = requestId;
        this.requester = requester;
        this.adminId = adminId;
        this.reqStatus = reqStatus;
        this.groupId = groupId;
        this.groupName = groupName;
        this.requesterName = requesterName;
        this.reqNote = reqNote;
    }

    // Getters and Setters
    public Long getRequestId() {
        return requestId;
    }

    public void setRequestId(Long requestId) {
        this.requestId = requestId;
    }

    public String getRequester() {
        return requester;
    }

    public void setRequester(String requester) {
        this.requester = requester;
    }

    public String getAdminId() {
        return adminId;
    }

    public void setAdminId(String adminId) {
        this.adminId = adminId;
    }

    public String getReqStatus() {
        return reqStatus;
    }

    public void setReqStatus(String reqStatus) {
        this.reqStatus = reqStatus;
    }

    public Long getGroupId() {
        return groupId;
    }

    public void setGroupId(Long groupId) {
        this.groupId = groupId;
    }

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public String getRequesterName() {
        return requesterName;
    }

    public void setRequesterName(String userName) {
        this.requesterName = userName;
    }

    public String getReqNote() {
        return reqNote;
    }

    public void setReqNote(String reqNote) {
        this.reqNote = reqNote;
    }

    // Equals and HashCode
    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        Request request = (Request) o;
        return Objects.equals(requestId, request.requestId) &&
                Objects.equals(requester, request.requester) &&
                Objects.equals(adminId, request.adminId) &&
                Objects.equals(reqStatus, request.reqStatus) &&
                Objects.equals(groupId, request.groupId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(requestId, requester, adminId, reqStatus, groupId);
    }
}
