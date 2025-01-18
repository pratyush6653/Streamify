package com.stream.app.spring_stream_backend.services.implementation;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.stream.app.spring_stream_backend.Entities.Video;
import com.stream.app.spring_stream_backend.services.VideoService;





@Service
public class VideoServiceImpl implements VideoService {

    @Value("${files.video}") // located in application.properties
    String DIR;
    @Override
    public Video save(Video video, MultipartFile file) {

        try{
        String fileName= file.getOriginalFilename(); // give original file name 
        String contentType=file.getContentType();
        InputStream inputStream=file.getInputStream();

        //Folder Path :create 

        String cleanFileName= StringUtils.cleanPath(fileName); // for cleaning the file name
        String cleanFolder= StringUtils.cleanPath(DIR); // for cleaning the folder name 
        Path path= Paths.get(cleanFolder,cleanFileName); //  for concatenating the folder name with the file name 

        System.out.println("file path is here --->"+ path);

        //Folder path with file name 

        //  copy the  file to the folder 
        //Folder Path :create 

        //Folder path with file name 

        //  copy the  file to the folder 

        //video meta data 

        //  save meta data 

        //video meta data 
        }
        catch(IOException e)
        {
            e.printStackTrace();
        }
        
         
        return null;
    }

    @Override
    public Video getById(String id) {
        

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
