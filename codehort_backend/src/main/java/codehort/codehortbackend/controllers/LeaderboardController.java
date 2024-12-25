package codehort.codehortbackend.controllers;

import codehort.codehortbackend.models.Leaderboard;
import codehort.codehortbackend.services.LeaderboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/leaderboard")
public class LeaderboardController {

    @Autowired
    private LeaderboardService leaderboardService;

    @GetMapping("/{challengeId}")
    public ResponseEntity<List<Leaderboard>> getLeaderboard(@PathVariable("challengeId") long challengeId) {
        List<Leaderboard> leaderboard = leaderboardService.getLeaderboard(challengeId);
        if (leaderboard.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(leaderboard, HttpStatus.OK);
    }
}