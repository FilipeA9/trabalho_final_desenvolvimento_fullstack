package com.odontologico.backend.controller;

import com.odontologico.backend.dto.DentistaDTO;
import com.odontologico.backend.service.DentistaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dentistas")
@CrossOrigin(origins = "http://localhost:4200")
public class DentistaController {

    @Autowired
    private DentistaService service;

    @GetMapping
    public ResponseEntity<List<DentistaDTO>> listarTodos() {
        return ResponseEntity.ok(service.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DentistaDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<DentistaDTO> salvar(@Valid @RequestBody DentistaDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.salvar(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DentistaDTO> atualizar(@PathVariable Long id, @Valid @RequestBody DentistaDTO dto) {
        dto.setId(id);
        return ResponseEntity.ok(service.salvar(dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        service.excluir(id);
        return ResponseEntity.noContent().build();
    }
}
