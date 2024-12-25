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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import codehort.codehortbackend.models.Challenge;
import codehort.codehortbackend.services.ChallengeService;
import codehort.codehortbackend.services.GroupsService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class ChallengeController {

    private static Long FAILED_CHALLENGE_RESPONSE_CODE = (long) -1;

    @Autowired
    ChallengeService challengeRepository;

    @Autowired
    GroupsService groupsRepository;

    @GetMapping("/challenges")
    public ResponseEntity<List<Challenge>> getAllChallenges() {
        try {
            List<Challenge> challenges = challengeRepository.getAllChallenges();

            if (challenges.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(challenges, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/challenges/group")
    public ResponseEntity<List<Challenge>> getChallengesByGroupId(@RequestParam("groupId") long groupId) {
        try {
            List<Challenge> challenges = challengeRepository.getChallengesByGroupId(groupId);
            System.out.println(challenges);
            if (challenges.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(challenges, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/challenges")
    public ResponseEntity<Long> addChallenge(@RequestBody Challenge challenge) {
        try {
            long challengeId = challengeRepository.addChallenge(challenge.getChallengeName(), challenge.getGroupId());
            return new ResponseEntity<>(challengeId, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(FAILED_CHALLENGE_RESPONSE_CODE, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/challengesByGroup/{groupId}/{emailId}")
    public ResponseEntity<List<Challenge>> getChallengesByUserAndGroupId(@PathVariable Long groupId,
            @PathVariable String emailId) {
        try {

            // Check if user is part of the group
            var userGroupIds = groupsRepository.getGroupIdsByUser(emailId);

            if (userGroupIds.contains(groupId)) {
                List<Challenge> challenges = challengeRepository.getChallengesByUserAndGroupId(emailId, groupId);
                return new ResponseEntity<>(challenges, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
            }

        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
