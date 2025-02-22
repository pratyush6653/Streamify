package com.stream.app.spring_stream_backend.controllers;

import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.stream.app.spring_stream_backend.Entities.Video;
import com.stream.app.spring_stream_backend.playload.CustomMessage;
import com.stream.app.spring_stream_backend.services.VideoService;

@RestController
@RequestMapping("/api/v1/videos")
public class VideoController {

    private VideoService videoService;

    public VideoController(VideoService videoService) {
        this.videoService = videoService;
    }

    @PostMapping
    public ResponseEntity<?> create(
        @RequestParam("file") MultipartFile file,
        @RequestParam("title") String title,
        @RequestParam("description") String description
    ) {
        // Validate input
        if (file.isEmpty() || title.isEmpty() || description.isEmpty()) {
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(CustomMessage.builder()
                    .message("File, title, and description are required.")
                    .success(false)
                    .build());
        }
    
        // Create a new Video object
        Video video = new Video();
        video.setTitle(title);
        video.setDescription(description);
        video.setVideoId(UUID.randomUUID().toString());
    
        try {
            // Save the video
            Video savedVideo = videoService.save(video, file);
    
            if (savedVideo != null) {
                return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(savedVideo); // Return the saved video
            } else {
                return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(CustomMessage.builder()
                        .message("Failed to save video.")
                        .success(false)
                        .build());
            }
        } catch (Exception e) {
            // Handle exceptions
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(CustomMessage.builder()
                    .message("Error uploading video: " + e.getMessage())
                    .success(false)
                    .build());
        }
    }    
}