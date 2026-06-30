package com.odontologico.backend.controller;

import com.odontologico.backend.dto.ProcedimentoDTO;
import com.odontologico.backend.service.ProcedimentoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/procedimentos")
@CrossOrigin(origins = "http://localhost:4200")
public class ProcedimentoController {

    @Autowired
    private ProcedimentoService service;

    @GetMapping
    public ResponseEntity<List<ProcedimentoDTO>> listarTodos() {
        return ResponseEntity.ok(service.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProcedimentoDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<ProcedimentoDTO> salvar(@Valid @RequestBody ProcedimentoDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.salvar(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProcedimentoDTO> atualizar(@PathVariable Long id, @Valid @RequestBody ProcedimentoDTO dto) {
        dto.setId(id);
        return ResponseEntity.ok(service.salvar(dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        service.excluir(id);
        return ResponseEntity.noContent().build();
    }
}
