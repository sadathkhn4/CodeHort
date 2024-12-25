package codehort.codehortbackend.controllers;

import codehort.codehortbackend.models.Request;
import codehort.codehortbackend.services.RequestService;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import codehort.codehortbackend.models.User;
import codehort.codehortbackend.services.UserService;

import codehort.codehortbackend.models.Group;
import codehort.codehortbackend.services.GroupsService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class RequestController {

    @Autowired
    private RequestService requestService;

    @Autowired
    private UserService userService;

    @Autowired
    private GroupsService groupService;

    @PostMapping("/requests/create")
    public ResponseEntity<Request> createRequest(@RequestParam String requesterEmail, @RequestParam Long groupId) {
        try {
            Request request = requestService.createRequest(requesterEmail, groupId);
            return new ResponseEntity<>(request, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/requests/{id}/approve")
    public ResponseEntity<Request> approveRequest(@PathVariable Long id) {
        Request approvedRequest = requestService.approveRequest(id);
        if (approvedRequest != null) {
            return new ResponseEntity<>(approvedRequest, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/requests/{id}/deny")
    public ResponseEntity<Request> denyRequest(@PathVariable Long id, @RequestBody Request request) {
        Request deniedRequest = requestService.denyRequest(id, request.getReqNote());
        if (deniedRequest != null) {
            return new ResponseEntity<>(deniedRequest, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/requests/{userEmailId}")
    public ResponseEntity<List<Request>> getRequests(@PathVariable String userEmailId) {
        List<Request> requestList = requestService.getRequestsByUserId(userEmailId);

        Set<String> requestersSet = new HashSet<>();
        Set<Long> groupIdsSet = new HashSet<>();
        for (Request request : requestList) {
            requestersSet.add(request.getRequester());
            groupIdsSet.add(request.getGroupId());
        }

        List<User> userList = userService.getUserListByIds(new ArrayList<>(requestersSet));
        List<Group> groupList = groupService.getGroupListByIds(new ArrayList<>(groupIdsSet));

        for (Request request : requestList) {
            for (User user : userList) {
                if (request.getRequester().equals(user.getEmail())) {
                    String requesterName = user.getFirstName() + " " + user.getLastName();
                    request.setRequesterName(requesterName);
                    break;
                }
            }

            for (Group group : groupList) {
                if (request.getGroupId().equals(group.getGroupId())) {

                    request.setGroupName(group.getGroupName());
                    break;
                }
            }

        }

        if (requestList != null) {
            return new ResponseEntity<>(requestList, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
