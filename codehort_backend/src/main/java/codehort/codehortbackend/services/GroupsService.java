package codehort.codehortbackend.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import codehort.codehortbackend.controllers.GroupsInterface;
import codehort.codehortbackend.models.Tutorial;
import codehort.codehortbackend.models.User;
import codehort.codehortbackend.models.Group;

@Repository
public class GroupsService implements GroupsInterface {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public int createGroup(Group group) {
        try {
            int groupId = jdbcTemplate.queryForObject(
                    "INSERT INTO Groups (GroupName, GroupInfo, AdminEmail) OUTPUT inserted.GroupId VALUES (?, ?, ?)",
                    Integer.class,
                    group.getGroupName(),
                    group.getGroupInfo(),
                    group.getAdminEmail());
            return groupId;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to create user: " + e.getMessage());
        }
    }

    @Override
    public int createUserGroupLink(Group group) {
        try {
            int rowsAffected = jdbcTemplate.update(
                    "INSERT INTO UserGroupTable (GroupId, EmailId) VALUES (?, ?)",
                    group.getGroupId(),
                    group.getAdminEmail());
            if (rowsAffected == 1) {
                return 1;
            } else {
                throw new RuntimeException("Failed to create user");
            }
        } catch (Exception e) {

            e.printStackTrace();

            throw new RuntimeException("Failed to create user: " + e.getMessage());
        }
    }

    @Override
    public List<Group> getAllGroups() {
        try {
            return jdbcTemplate.query("SELECT * FROM Groups",
                    BeanPropertyRowMapper.newInstance(Group.class));
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to fetch all users: " + e.getMessage());
        }
    }

    @Override
    public Group getGroupById(long id) {
        try {
            Group group = jdbcTemplate.queryForObject("SELECT * FROM Groups WHERE groupId=?",
                    BeanPropertyRowMapper.newInstance(Group.class), id);
            return group;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to fetch all users: " + e.getMessage());
        }
    }

    @Override
    public List<Long> getGroupIdsByUser(String userEmail) {
        try {
            List<Long> groupIds = jdbcTemplate.queryForList(
                    "SELECT GroupId FROM UserGroupTable WHERE EmailId=?", Long.class, userEmail);
            return groupIds;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to fetch all users: " + e.getMessage());
        }
    }

    @Override
    public Map<Long, Integer> getAllGroupMembersCount() {
        try {
            List<Map<String, Object>> results = jdbcTemplate.queryForList(
                    "SELECT GroupId, COUNT(DISTINCT EmailId) AS MembersCount FROM UserGroupTable GROUP BY GroupId");

            Map<Long, Integer> groupIdsAndMemberCounts = new HashMap<>();
            for (Map<String, Object> row : results) {
                Long groupId = (Long) row.get("GroupId");
                Integer memberCount = ((Number) row.get("MembersCount")).intValue();
                groupIdsAndMemberCounts.put(groupId, memberCount);
            }

            return groupIdsAndMemberCounts;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to fetch group IDs and member counts by user: " + e.getMessage());
        }
    }

    @Override
    public List<Long> getUserRequestedGroups(String userEmail) {
        try {
            List<Long> groupIds = jdbcTemplate.queryForList(
                    "SELECT GroupId FROM Requests WHERE Requester=?", Long.class, userEmail);
            return groupIds;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to fetch all users: " + e.getMessage());
        }
    }

    @SuppressWarnings("deprecation")
    @Override
    public List<Group> getGroupListByIds(List<Long> groupIds) {
        try {
            String placeholders = groupIds.stream().map(id -> "?").collect(Collectors.joining(","));

            return jdbcTemplate.query("SELECT * FROM Groups WHERE GroupId IN (" + placeholders + ")",
                    groupIds.toArray(), BeanPropertyRowMapper.newInstance(Group.class));
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to fetch users by IDs: " + e.getMessage());
        }
    }

}