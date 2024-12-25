package codehort.codehortbackend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import codehort.codehortbackend.models.Problem;
import codehort.codehortbackend.models.Progress;
import codehort.codehortbackend.services.GroupsService;
import codehort.codehortbackend.services.ProblemService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class ProblemController {
    @Autowired
    ProblemService problemRepository;

    @Autowired
    GroupsService groupsRepository;

    @GetMapping("/problems")
    public ResponseEntity<List<Problem>> getAllProblems() {
        try {
            List<Problem> problems = problemRepository.getAllProblems();

            if (problems.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(problems, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/problem")
    public ResponseEntity<String> addProblem(@RequestBody Problem problem) {
        try {
            problemRepository.addProblem(problem.getProblemName(), problem.getLeetcodeLink(), problem.getChallengeId());
            return new ResponseEntity<>("Problem added successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to add Problem: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/problems")
    public ResponseEntity<String> addProblems(@RequestBody List<Problem> problems) {
        try {
            problemRepository.addProblems(problems);
            return new ResponseEntity<>("Problems added successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to add problems: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/problems/{groupId}/{challengeId}/{userId}")
    public ResponseEntity<List<Problem>> getAllProblemsByUserAndChallengeId(@PathVariable Long groupId,
            @PathVariable Long challengeId, @PathVariable String userId) {
        try {

            var userGroupIds = groupsRepository.getGroupIdsByUser(userId);

            if (userGroupIds.contains(groupId)) {
                // get group of the challenge
                List<Problem> problems = problemRepository.getProblemsStatusByUserId(challengeId, userId);

                if (problems.isEmpty()) {
                    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
                }

                return new ResponseEntity<>(problems, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
            }

        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/problems/logSolved")
    public ResponseEntity<String> logProgress(@RequestBody Progress progess) {
        try {
            problemRepository.logProgress(progess);
            return new ResponseEntity<>("Progress updated successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to log progress: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/problems/logUnsolved")
    public ResponseEntity<String> removeProgress(@RequestBody Progress progess) {
        try {
            problemRepository.logRemoveProgress(progess);
            return new ResponseEntity<>("Progress updated successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to log progress: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
