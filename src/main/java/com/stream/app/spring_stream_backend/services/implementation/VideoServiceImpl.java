package com.stream.app.spring_stream_backend.services.implementation;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.stream.app.spring_stream_backend.Entities.Video;
import com.stream.app.spring_stream_backend.services.VideoService;

@Service
public class VideoServiceImpl implements VideoService {

    @Override
    public Video save(Video video, MultipartFile file) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'save'");
    }

    @Override
    public Video getById(String id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getById'");
    }

    @Override
    public Video getByTitle(String title) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getByTitle'");
    }

    @Override
    public List<Video> allVideo() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'allVideo'");
    }
    
}
