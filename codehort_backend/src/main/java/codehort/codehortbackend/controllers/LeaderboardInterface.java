package codehort.codehortbackend.controllers;

import codehort.codehortbackend.models.Leaderboard;

import java.util.List;

public interface LeaderboardInterface {
    List<Leaderboard> getLeaderboard(long challengeId);
}