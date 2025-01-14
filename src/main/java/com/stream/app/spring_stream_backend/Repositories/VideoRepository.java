package com.stream.app.spring_stream_backend.Repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stream.app.spring_stream_backend.Entities.Video;



@Repository
public interface VideoRepository extends JpaRepository<Video,String>{
    Optional<Video> findByTitle(String title);
}
