package codehort.codehortbackend.controllers;

import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

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

import codehort.codehortbackend.models.Group;
import codehort.codehortbackend.services.GroupsService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class GroupsController {

    @Autowired
    GroupsService groupRepository;

    @GetMapping("/groups/getAllGroups")
    public ResponseEntity<List<Group>> getAllGroups() {
        try {
            List<Group> groups = groupRepository.getAllGroups();

            if (groups.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(groups, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/groups/getGroupByGroupId/{id}")
    public ResponseEntity<Group> getGroupById(@PathVariable("id") long groupId) {
        Group group = groupRepository.getGroupById(groupId);

        if (group != null) {
            return new ResponseEntity<>(group, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/groups/getGroupsByUserId/{userId}")
    public ResponseEntity<List<Group>> getGroupByUserId(@PathVariable("userId") String emailString) {

        List<Group> groups = groupRepository.getAllGroups();
        List<Long> userGroupIdsList = groupRepository.getGroupIdsByUser(emailString);
        Map<Long, Integer> groupMemebersCount = groupRepository.getAllGroupMembersCount();
        List<Long> reuqestedGroupLists = groupRepository.getUserRequestedGroups(emailString);

        for (Group group : groups) {
            var groupId = group.getGroupId();
            if (userGroupIdsList.contains(groupId)) {
                group.setJoined(true);
            }
            if (groupMemebersCount.get(groupId) != null) {
                group.setMemberCount(groupMemebersCount.get(groupId));
            }
            if (reuqestedGroupLists.contains(groupId)) {
                group.setRequested(true);
            }
        }

        if (groups != null) {
            return new ResponseEntity<>(groups, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/groups/createGroup")
    public ResponseEntity<Group> createGroup(@RequestBody Group group) {
        try {
            int groupId = groupRepository.createGroup(group);
            group.setGroupId(groupId);
            groupRepository.createUserGroupLink(group);
            return new ResponseEntity<>(group, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

}
