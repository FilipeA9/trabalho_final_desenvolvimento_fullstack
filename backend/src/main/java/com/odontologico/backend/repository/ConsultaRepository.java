package com.odontologico.backend.repository;

import com.odontologico.backend.model.Consulta;
import com.odontologico.backend.model.StatusConsulta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface ConsultaRepository extends JpaRepository<Consulta, Long> {
    
    boolean existsByDentistaIdAndDataHoraAndStatusNot(Long dentistaId, LocalDateTime dataHora, StatusConsulta status);

}
