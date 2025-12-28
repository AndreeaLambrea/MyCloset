package com.example.dulap.repository;

import com.example.dulap.model.Haina;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HainaRepository extends JpaRepository< Haina, Long> {


}
