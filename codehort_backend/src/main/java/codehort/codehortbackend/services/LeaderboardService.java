package codehort.codehortbackend.services;

import codehort.codehortbackend.controllers.LeaderboardInterface;
import codehort.codehortbackend.models.Leaderboard;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Service
public class LeaderboardService implements LeaderboardInterface {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Leaderboard> getLeaderboard(long challengeId) {
        try {
            String query = "SELECT up.ID AS userId, up.FirstName, up.LastName, up.Email, COUNT(DISTINCT p.ProblemId) AS ProblemsSolved "
                    +
                    "FROM Progress p " +
                    "JOIN UserProfiles up ON p.EmailId = up.Email " +
                    "WHERE p.ChallengeId = ? " +
                    "GROUP BY up.ID, up.FirstName, up.LastName, up.Email " +
                    "ORDER BY ProblemsSolved DESC";

            RowMapper<Leaderboard> rowMapper = (ResultSet rs, int rowNum) -> {
                int userId = rs.getInt("userId");
                String username = rs.getString("FirstName") + " " + rs.getString("LastName");
                int problemsSolved = rs.getInt("ProblemsSolved");
                String email = rs.getString("Email");
                return new Leaderboard(userId, username, problemsSolved, email);
            };

            List<Leaderboard> leaderboard = jdbcTemplate.query(query, rowMapper, challengeId);

            return leaderboard;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to fetch leaderboard: " + e.getMessage());
        }
    }
}