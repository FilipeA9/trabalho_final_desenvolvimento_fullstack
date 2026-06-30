package com.odontologico.backend.service;

import com.odontologico.backend.dto.PacienteDTO;
import com.odontologico.backend.exception.BusinessException;
import com.odontologico.backend.model.Paciente;
import com.odontologico.backend.repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PacienteService {

    @Autowired
    private PacienteRepository repository;

    public List<PacienteDTO> listarTodos() {
        return repository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    public PacienteDTO buscarPorId(Long id) {
        Paciente paciente = repository.findById(id)
                .orElseThrow(() -> new BusinessException("Paciente não encontrado"));
        return toDTO(paciente);
    }

    public PacienteDTO salvar(PacienteDTO dto) {
        Paciente paciente = toEntity(dto);
        paciente = repository.save(paciente);
        return toDTO(paciente);
    }

    public void excluir(Long id) {
        if (!repository.existsById(id)) {
            throw new BusinessException("Paciente não encontrado");
        }
        repository.deleteById(id);
    }

    private PacienteDTO toDTO(Paciente entity) {
        PacienteDTO dto = new PacienteDTO();
        dto.setId(entity.getId());
        dto.setNome(entity.getNome());
        dto.setCpf(entity.getCpf());
        dto.setDataNascimento(entity.getDataNascimento());
        dto.setTelefone(entity.getTelefone());
        dto.setEndereco(entity.getEndereco());
        return dto;
    }

    private Paciente toEntity(PacienteDTO dto) {
        Paciente entity = new Paciente();
        entity.setId(dto.getId());
        entity.setNome(dto.getNome());
        entity.setCpf(dto.getCpf());
        entity.setDataNascimento(dto.getDataNascimento());
        entity.setTelefone(dto.getTelefone());
        entity.setEndereco(dto.getEndereco());
        return entity;
    }
}
