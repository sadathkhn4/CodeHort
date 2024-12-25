package codehort.codehortbackend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import codehort.codehortbackend.controllers.ProblemInterface;
import codehort.codehortbackend.models.Problem;
import codehort.codehortbackend.models.Progress;

@Repository
public class ProblemService implements ProblemInterface {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Problem> getAllProblems() {
        try {
            return jdbcTemplate.query("SELECT * FROM Problem",
                    BeanPropertyRowMapper.newInstance(Problem.class));
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to fetch all challenges: " + e.getMessage());
        }
    }

    @Override
    public void addProblem(String name, String leetcodeLink, long challengeId) {
        try {
            String sql = "INSERT INTO Problem (ProblemName, LeetcodeLink, ChallengeId) VALUES (?, ?, ?)";
            jdbcTemplate.update(sql, name, leetcodeLink, challengeId);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to add problem: " + e.getMessage());
        }
    }

    @Override
    public void addProblems(List<Problem> problems) {
        try {
            String sql = "INSERT INTO Problem (ProblemName, LeetcodeLink, ChallengeId) VALUES (?, ?, ?)";
            jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {
                @Override
                public void setValues(java.sql.PreparedStatement ps, int i) throws java.sql.SQLException {
                    Problem problem = problems.get(i);
                    ps.setString(1, problem.getProblemName());
                    ps.setString(2, problem.getLeetcodeLink());
                    ps.setLong(3, problem.getChallengeId());
                }

                @Override
                public int getBatchSize() {
                    return problems.size();
                }
            });
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to add problems: " + e.getMessage());
        }
    }

    @Override
    public List<Problem> getProblemsByChallengeId(Long challengeId) {
        try {
            return jdbcTemplate.query("SELECT * FROM Problem WHERE ChallengeId=?",
                    BeanPropertyRowMapper.newInstance(Problem.class), challengeId);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to fetch all challenges: " + e.getMessage());
        }
    }

    @Override
    public List<Problem> getProblemsStatusByUserId(Long challengeId, String userId) {
        try {

            String sql = "SELECT p.*, CASE WHEN pr.ProblemId IS NOT NULL THEN 1 ELSE 0 END AS solved " +
                    "FROM Problem p " +
                    "LEFT JOIN Progress pr ON p.ProblemId = pr.ProblemId AND pr.EmailId = ? " +
                    "WHERE p.ChallengeId = ?";
            return jdbcTemplate.query(sql, BeanPropertyRowMapper.newInstance(Problem.class), userId, challengeId);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to fetch all challenges: " + e.getMessage());
        }
    }

    @Override
    public void logProgress(Progress progress) {
        try {

            String sql = "INSERT INTO Progress (ProblemId, ChallengeId, EmailId, GroupId) VALUES (?, ?, ?, ?)";
            jdbcTemplate.update(sql, progress.getProblemId(),
                    progress.getChallengeId(), progress.getEmail(), progress.getGroupId());
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to update progress" + e.getMessage());
        }
    }

    @Override
    public void logRemoveProgress(Progress progress) {
        try {

            String sql = "DELETE FROM Progress WHERE ProblemId = ? AND ChallengeId = ? AND EmailId = ? AND GroupId = ?";
            jdbcTemplate.update(sql, progress.getProblemId(),
                    progress.getChallengeId(), progress.getEmail(), progress.getGroupId());
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to update progress" + e.getMessage());
        }
    }

}
