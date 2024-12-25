package codehort.codehortbackend.services;

import java.sql.PreparedStatement;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import java.sql.Statement;

import codehort.codehortbackend.controllers.ChallengeInterface;
import codehort.codehortbackend.models.Challenge;

@Repository
public class ChallengeService implements ChallengeInterface {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Challenge> getAllChallenges() {
        try {
            return jdbcTemplate.query("SELECT * FROM Challenge",
                    BeanPropertyRowMapper.newInstance(Challenge.class));
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to fetch all challenges: " + e.getMessage());
        }
    }

    @SuppressWarnings("deprecation")
    @Override
    public List<Challenge> getChallengesByGroupId(long groupId) {
        try {
            String sql = "SELECT * FROM Challenge WHERE GroupId = ?";
            return jdbcTemplate.query(sql, new Object[] { groupId },
                    BeanPropertyRowMapper.newInstance(Challenge.class));
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to fetch challenges by GroupId: " + e.getMessage());
        }
    }

    @Override
    public long addChallenge(String challengeName, long groupId) {
        try {
            String sql = "INSERT INTO Challenge (ChallengeName, GroupId) VALUES (?, ?)";
            KeyHolder keyHolder = new GeneratedKeyHolder();

            jdbcTemplate.update(connection -> {
                PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
                ps.setString(1, challengeName);
                ps.setLong(2, groupId);
                return ps;
            }, keyHolder);

            // Extract the generated ID
            long generatedId = keyHolder.getKey().longValue();
            System.out.println(generatedId);
            return generatedId;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to add challenge: " + e.getMessage());
        }
    }

    @Override
    public List<Challenge> getChallengesByUserAndGroupId(String emailId, long groupId) {
        try {
            String sql = "SELECT c.*, " +
                    "COUNT(pt.ProblemId) AS totalProblems, " +
                    "COALESCE(p.solvedProblems, 0) AS solvedProblems " +
                    "FROM Challenge c " +
                    "LEFT JOIN Problem pt ON c.ChallengeId = pt.ChallengeId " +
                    "LEFT JOIN ( " +
                    "    SELECT ChallengeId, COUNT(ProblemId) AS solvedProblems " +
                    "    FROM Progress " +
                    "    WHERE EmailId = ? " +
                    "    GROUP BY ChallengeId " +
                    ") p ON c.ChallengeId = p.ChallengeId " +
                    "WHERE c.GroupId = ? " +
                    "GROUP BY c.ChallengeId, c.GroupId, c.ChallengeName, p.solvedProblems";
            return jdbcTemplate.query(sql,
                    BeanPropertyRowMapper.newInstance(Challenge.class), emailId, groupId);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to fetch all challenges: " + e.getMessage());
        }
    }

}
