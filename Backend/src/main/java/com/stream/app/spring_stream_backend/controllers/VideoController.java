package com.stream.app.spring_stream_backend.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.stream.app.spring_stream_backend.Entities.Video;
import com.stream.app.spring_stream_backend.playload.CustomMessage;
import com.stream.app.spring_stream_backend.services.VideoService;


import org.springframework.core.io.Resource;



@RestController
@RequestMapping("/api/v1/videos")
@CrossOrigin(origins = "http://localhost:5174")
public class VideoController {

    private VideoService videoService;

    public VideoController(VideoService videoService) {
        this.videoService = videoService;
    }

    // for uploading the video
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
    // for Streaming video by id 
 @GetMapping("/stream/{videoId}")
public ResponseEntity<Resource> stream(@PathVariable String videoId) {
    if (videoId == null || videoId.isEmpty())
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    System.out.println("videoId: " + videoId);
    // Fetch video from the database
    Video video = videoService.getById(videoId.trim());
    
    // Handle if video is not found
    if (video == null) {
        // Return 404 NOT FOUND with an empty response body
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    String contentType = video.getContentType();
    String filePath = video.getFilePath().replace("\\", "/");;
    Resource resource = new FileSystemResource(filePath);
    
    // Log file path and content type for debugging
    System.out.println("Streaming video from path: " + filePath);
    System.out.println("Content Type: " + contentType);
    
    // Handle if the file does not exist
    if (!resource.exists()) {
        // Return 404 NOT FOUND with an empty response body
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    // Set default content type if null
    if (contentType == null) {
        contentType = "application/octet-stream";
    }

    // Return the video as a stream with proper content type
    return ResponseEntity.ok()
                         .contentType(MediaType.parseMediaType(contentType))
                         .body(resource);
}

    

//for getting all video 

@GetMapping
public ResponseEntity<List<Video>> getAllVideo()
{
    List<Video> videos=videoService.allVideo();
    return ResponseEntity.ok(videos);
}

}