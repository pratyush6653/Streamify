package com.stream.app.spring_stream_backend.controllers;

import java.util.UUID;

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
    public VideoController(VideoService videoService)
    {
        this.videoService = videoService;
    }
    //Controller for handling video operations
    @PostMapping
    public ResponseEntity<CustomMessage> create(
        @RequestParam("file")MultipartFile file,
        @RequestParam("title") String title,
        @RequestParam("description") String description
    ){
        
        Video video=new Video();
        video.setTitle(title);
        video.setDescription(description);
        video.setVideoId(UUID.randomUUID().toString());
        videoService.save(video, file);

        return null;
    }

}