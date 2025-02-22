package com.stream.app.spring_stream_backend.frontendConfig;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration // Add @Configuration annotation
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/v1/**") 
                .allowedOrigins("http://localhost:5174") 
                .allowedMethods("GET", "POST", "PUT", "DELETE") 
                .allowedHeaders("*") 
                .allowCredentials(true); 
    }
}
