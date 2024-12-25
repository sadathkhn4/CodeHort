package codehort.codehortbackend.controllers;

import java.util.List;

import codehort.codehortbackend.models.Request;

public interface RequestInterface {

    Request createRequest(String requesterEmail, Long groupId);

    Request approveRequest(Long requestId);

    Request denyRequest(Long requestId, String note);

    List<Request> getRequestsByUserId(String userEmailId);

}
