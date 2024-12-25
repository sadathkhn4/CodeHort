package codehort.codehortbackend.controllers;

import java.util.List;

import codehort.codehortbackend.models.Tutorial;

public interface TutorialInterface {
    int save(Tutorial book);

    int update(Tutorial book);

    Tutorial findById(Long id);

    int deleteById(Long id);

    List<Tutorial> findAll();

    List<Tutorial> findByPublished(boolean published);

    List<Tutorial> findByTitleContaining(String title);

    int deleteAll();
}