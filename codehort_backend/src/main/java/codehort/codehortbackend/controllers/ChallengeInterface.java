package codehort.codehortbackend.controllers;

import java.util.List;
import codehort.codehortbackend.models.Challenge;

public interface ChallengeInterface {

    List<Challenge> getAllChallenges();

    List<Challenge> getChallengesByGroupId(long groupId);

    long addChallenge(String name, long groupId);

    List<Challenge> getChallengesByUserAndGroupId(String email, long groupId);
}
