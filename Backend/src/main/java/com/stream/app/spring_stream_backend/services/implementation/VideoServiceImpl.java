package com.stream.app.spring_stream_backend.services.implementation;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.stream.app.spring_stream_backend.Entities.Video;
import com.stream.app.spring_stream_backend.Repositories.VideoRepository;
import com.stream.app.spring_stream_backend.services.VideoService;

import jakarta.annotation.PostConstruct;





@Service
public class VideoServiceImpl implements VideoService {

    @Value("${files.video}") // located in application.properties
    String DIR;

    
    private VideoRepository videoRepository;
    
    public VideoServiceImpl(VideoRepository videoRepository) {
        this.videoRepository = videoRepository;
    }
    @PostConstruct
    public void init()
    {
        File file = new File(DIR);
        if(!file.exists())
        {
            file.mkdir();// to create directory or folder
            System.out.println("Folder created: "+file.getAbsolutePath()); 
        }
        else
        {
            System.out.println("Folder already created: "+ file.getAbsolutePath());
        }
    }
    @Override
    public Video save(Video video, MultipartFile file) {

        try{
        String fileName= file.getOriginalFilename(); // give original file name 
        String contentType=file.getContentType();
        InputStream inputStream=file.getInputStream();

        // file path
        String cleanFileName= StringUtils.cleanPath(fileName); // for cleaning the file name

        //Folder Path :create 
        String cleanFolder= StringUtils.cleanPath(DIR); // for cleaning the folder name 

        //Folder path with file name 
        Path path= Paths.get(cleanFolder,cleanFileName); //  for concatenating the folder name with the file name
        
        System.out.println(contentType);

        System.out.println("file path is here --->"+ path);

        

        //  copy the  file to the folder 
        Files.copy(inputStream,path,StandardCopyOption.REPLACE_EXISTING);
        

        //video meta data 
        video.setContentType(contentType);
        video.setFilePath(path.toString());

        //  save meta data 
        return videoRepository.save(video);

        }
        catch(IOException e)
        {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public Video getById(String id) {
       Video video= videoRepository.findById(id).orElseThrow(()->new RuntimeException("Video not found"));
        return video;
    }
    @Override
    public Video getByTitle(String title) {
        String trimmedTitle = title.trim(); // Handle spaces
        Optional<Video> videoOptional = videoRepository.findByTitle(trimmedTitle);
        
        // Return the video if found or null if not found
        return videoOptional.orElse(null); 
    }

    


    @Override
    public List<Video> allVideo() {

        return videoRepository.findAll();
    }
    
}
