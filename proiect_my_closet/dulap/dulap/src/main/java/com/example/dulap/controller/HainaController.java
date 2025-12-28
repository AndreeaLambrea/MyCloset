package com.example.dulap.controller;

import com.example.dulap.model.Haina;
import com.example.dulap.service.HainaService;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.ArrayList;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.*;

@RestController
@RequestMapping("/api/haine")
@CrossOrigin(origins = "http://localhost:3000")

public class HainaController {

    private final HainaService hainaService;

    @Autowired
    public HainaController(HainaService hainaService){
        this.hainaService = hainaService;
    }

    @GetMapping
    public List<Haina> getToateHainele() {
        return hainaService.getAllHaine();
    }

    @PostMapping
    public Haina adaugaHaina(
            @RequestParam("tip") String tip,
            @RequestParam("culoare") String culoare,
            @RequestParam("material") String material,
            @RequestParam("stil") String stil,
            @RequestParam("poza") MultipartFile pozaFile //,

    )throws IOException {

        String folder = "uploads/";
        Path uploadPath = Paths.get(folder);

        if(!Files.exists(uploadPath)){
            Files.createDirectories(uploadPath);
        }

        String numePoza = System.currentTimeMillis() + "_" + pozaFile.getOriginalFilename();
        Path filePath = uploadPath.resolve(numePoza);

        Files.copy(pozaFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        Haina haina = new Haina();
        haina.setTip(tip);
        haina.setCuloare(culoare);
        haina.setMaterial(material);
        haina.setStil(stil);

        haina.setUrlPoza("http://localhost:8080/poze/"+ numePoza);

        return hainaService.addHaina(haina);

    }

    @DeleteMapping("/{id}")
    public void stergeHaina(@PathVariable Long id){

        hainaService.deleteHaina(id);
    }
}
