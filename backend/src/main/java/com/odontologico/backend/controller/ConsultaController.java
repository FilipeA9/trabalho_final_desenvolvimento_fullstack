package com.odontologico.backend.controller;

import com.odontologico.backend.dto.ConsultaDTO;
import com.odontologico.backend.model.StatusConsulta;
import com.odontologico.backend.service.ConsultaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/consultas")
@CrossOrigin(origins = "http://localhost:4200")
public class ConsultaController {

    @Autowired
    private ConsultaService service;

    @GetMapping
    public ResponseEntity<List<ConsultaDTO>> listarTodas() {
        return ResponseEntity.ok(service.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ConsultaDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<ConsultaDTO> agendar(@Valid @RequestBody ConsultaDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.agendar(dto));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ConsultaDTO> atualizarStatus(@PathVariable Long id, @RequestParam StatusConsulta status) {
        return ResponseEntity.ok(service.atualizarStatus(id, status));
    }
}
