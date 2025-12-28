package com.example.dulap.service;

import com.example.dulap.model.Haina;
import com.example.dulap.repository.HainaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HainaService {

    private final HainaRepository hainaRepository;

    @Autowired
    public HainaService(HainaRepository hainaRepository){
        this.hainaRepository = hainaRepository;
    }

    public List<Haina> getAllHaine(){
        return hainaRepository.findAll();
    }

    public Haina addHaina(Haina haina){
        return hainaRepository.save(haina);
    }

    public void deleteHaina(Long id){
        hainaRepository.deleteById(id);
    }

}
