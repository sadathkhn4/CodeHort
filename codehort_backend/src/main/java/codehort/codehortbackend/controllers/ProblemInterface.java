package codehort.codehortbackend.controllers;

import java.util.List;

import codehort.codehortbackend.models.Problem;
import codehort.codehortbackend.models.Progress;

public interface ProblemInterface {
    List<Problem> getAllProblems();

    void addProblem(String name, String leetcodeLink, long challengeId);

    void addProblems(List<Problem> problems);

    List<Problem> getProblemsByChallengeId(Long challengeId);

    List<Problem> getProblemsStatusByUserId(Long challengeId, String userId);

    void logProgress(Progress progress);

    void logRemoveProgress(Progress progress);
}
