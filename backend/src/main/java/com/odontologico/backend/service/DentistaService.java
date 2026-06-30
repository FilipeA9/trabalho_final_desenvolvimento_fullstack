package com.odontologico.backend.service;

import com.odontologico.backend.dto.DentistaDTO;
import com.odontologico.backend.exception.BusinessException;
import com.odontologico.backend.model.Dentista;
import com.odontologico.backend.repository.DentistaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DentistaService {

    @Autowired
    private DentistaRepository repository;

    public List<DentistaDTO> listarTodos() {
        return repository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    public DentistaDTO buscarPorId(Long id) {
        Dentista dentista = repository.findById(id)
                .orElseThrow(() -> new BusinessException("Dentista não encontrado"));
        return toDTO(dentista);
    }

    public DentistaDTO salvar(DentistaDTO dto) {
        Dentista dentista = toEntity(dto);
        dentista = repository.save(dentista);
        return toDTO(dentista);
    }

    public void excluir(Long id) {
        if (!repository.existsById(id)) {
            throw new BusinessException("Dentista não encontrado");
        }
        repository.deleteById(id);
    }

    private DentistaDTO toDTO(Dentista entity) {
        DentistaDTO dto = new DentistaDTO();
        dto.setId(entity.getId());
        dto.setNome(entity.getNome());
        dto.setCro(entity.getCro());
        dto.setEspecialidade(entity.getEspecialidade());
        dto.setTelefone(entity.getTelefone());
        dto.setEmail(entity.getEmail());
        return dto;
    }

    private Dentista toEntity(DentistaDTO dto) {
        Dentista entity = new Dentista();
        entity.setId(dto.getId());
        entity.setNome(dto.getNome());
        entity.setCro(dto.getCro());
        entity.setEspecialidade(dto.getEspecialidade());
        entity.setTelefone(dto.getTelefone());
        entity.setEmail(dto.getEmail());
        return entity;
    }
}
