package com.stream.app.spring_stream_backend.services;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.stream.app.spring_stream_backend.Entities.Video;

public interface VideoService {
    // save the video
    Video save(Video video,MultipartFile file);   

    //get video by id 
    Video getById(String id);

    //get video by title 
    Video getByTitle(String title);

    // get all video
    List<Video> allVideo();
    
}
