package codehort.codehortbackend.controllers;

import codehort.codehortbackend.models.Group;

import java.util.List;
import java.util.Map;

public interface GroupsInterface {

    int createGroup(Group group);

    List<Group> getAllGroups();

    Group getGroupById(long id);

    List<Long> getGroupIdsByUser(String userEmail);

    Map<Long, Integer> getAllGroupMembersCount();

    int createUserGroupLink(Group group);

    List<Long> getUserRequestedGroups(String userEmail);

    List<Group> getGroupListByIds(List<Long> groupIds);

}
