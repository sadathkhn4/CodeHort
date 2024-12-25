package codehort.codehortbackend.services;

import codehort.codehortbackend.controllers.RequestInterface;
import codehort.codehortbackend.models.Group;
import codehort.codehortbackend.models.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import java.sql.Statement;

import java.sql.PreparedStatement;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class RequestService implements RequestInterface {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public Request createRequest(String requesterEmail, Long groupId) {
        try {
            // Retrieve AdminId from Groups table based on GroupId
            String sql = "SELECT AdminEmail FROM Groups WHERE GroupId = ?";
            List<String> adminIds = jdbcTemplate.queryForList(sql, String.class, groupId)
                    .stream()
                    .map(obj -> (String) obj)
                    .collect(Collectors.toList());

            if (adminIds.isEmpty()) {
                throw new RuntimeException("AdminId not found for groupId: " + groupId);
            }

            // Assuming a group has only one admin, get the first element
            String adminId = adminIds.get(0);

            // Create the request object
            Request request = new Request();
            request.setRequester(requesterEmail);
            request.setGroupId(groupId);
            request.setAdminId(adminId);
            request.setReqStatus("Pending"); // Assuming the initial status is Pending

            // Insert the request into the Requests table
            final String sql_1 = "INSERT INTO Requests (Requester, AdminId, ReqStatus, GroupId) VALUES (?, ?, ?, ?)";
            KeyHolder keyHolder = new GeneratedKeyHolder();
            int rowsAffected = jdbcTemplate.update(connection -> {
                PreparedStatement ps = connection.prepareStatement(sql_1, Statement.RETURN_GENERATED_KEYS);
                ps.setString(1, request.getRequester());
                ps.setString(2, request.getAdminId());
                ps.setString(3, request.getReqStatus());
                ps.setLong(4, request.getGroupId());
                return ps;
            }, keyHolder);

            if (rowsAffected == 1) {
                Long generatedId = keyHolder.getKey().longValue();
                request.setRequestId(generatedId); // Set the generated requestId
                return request;
            } else {
                throw new RuntimeException("Failed to create request.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to create request: " + e.getMessage());
        }
    }

    @Override
    public Request approveRequest(Long requestId) {
        try {
            // Update the ReqStatus to "Approved" for the specified requestId
            String sql = "UPDATE Requests SET ReqStatus = 'Approved' WHERE RequestId = ?";
            int rowsAffected = jdbcTemplate.update(sql, requestId);

            if (rowsAffected == 1) {
                // Retrieve the updated request from the database
                // return getRequestById(requestId); // Implement this method to fetch the
                // request by ID

                System.out.println("Success: Request status changed to 'Approved'");
                // Retrieve the updated request from the database
                Request approvedRequest = getRequestById(requestId);

                if (approvedRequest != null) {
                    // Insert a row into the UserGroupTable
                    String insertSql = "INSERT INTO UserGroupTable (GroupId, EmailId) VALUES (?, ?)";
                    int insertRowsAffected = jdbcTemplate.update(insertSql, approvedRequest.getGroupId(),
                            approvedRequest.getRequester());

                    if (insertRowsAffected == 1) {
                        System.out.println(
                                "Success: Request status changed to 'Approved' and row inserted in UserGroupTable");
                        return approvedRequest;
                    } else {
                        throw new RuntimeException("Failed to insert row in UserGroupTable.");
                    }
                } else {
                    throw new RuntimeException("Failed to retrieve approved request.");
                }
            } else {
                throw new RuntimeException("Failed to approve request.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to approve request: " + e.getMessage());
        }
    }

    @Override
    public Request denyRequest(Long requestId, String reqNote) {
        try {
            // Update the ReqStatus to "Rejected" for the specified requestId
            String sql = "UPDATE Requests SET ReqStatus = 'Rejected', ReqNote = ? WHERE RequestId = ?";
            int rowsAffected = jdbcTemplate.update(sql, reqNote, requestId);

            if (rowsAffected == 1) {
                // Retrieve the updated request from the database
                return getRequestById(requestId);
            } else {
                throw new RuntimeException("Failed to deny request.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to deny request: " + e.getMessage());
        }
    }

    private Request getRequestById(Long requestId) {
        try {
            String sql = "SELECT * FROM Requests WHERE RequestId = ?";
            List<Request> requests = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Request.class), requestId);
            if (requests.isEmpty()) {
                // Handle case where no request is found with the given ID
                return null;
            } else {
                // Assuming there is only one request with the given ID
                return requests.get(0);
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to fetch request by ID: " + e.getMessage());
        }
    }

    @Override
    public List<Request> getRequestsByUserId(String userEmailId) {
        try {
            List<Request> reqList = jdbcTemplate.query("SELECT * FROM Requests WHERE AdminId = ? OR Requester = ?;",
                    BeanPropertyRowMapper.newInstance(Request.class), userEmailId, userEmailId);

            return reqList;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to fetch all users: " + e.getMessage());
        }
    }

}
