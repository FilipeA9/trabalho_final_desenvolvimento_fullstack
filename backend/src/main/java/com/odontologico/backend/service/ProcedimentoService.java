package com.odontologico.backend.service;

import com.odontologico.backend.dto.ProcedimentoDTO;
import com.odontologico.backend.exception.BusinessException;
import com.odontologico.backend.model.Consulta;
import com.odontologico.backend.model.Procedimento;
import com.odontologico.backend.repository.ConsultaRepository;
import com.odontologico.backend.repository.ProcedimentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProcedimentoService {

    @Autowired
    private ProcedimentoRepository repository;
    
    @Autowired
    private ConsultaRepository consultaRepository;

    public List<ProcedimentoDTO> listarTodos() {
        return repository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    public ProcedimentoDTO buscarPorId(Long id) {
        Procedimento procedimento = repository.findById(id)
                .orElseThrow(() -> new BusinessException("Procedimento não encontrado"));
        return toDTO(procedimento);
    }

    public ProcedimentoDTO salvar(ProcedimentoDTO dto) {
        Consulta consulta = consultaRepository.findById(dto.getConsultaId())
                .orElseThrow(() -> new BusinessException("Consulta não encontrada"));
                
        Procedimento procedimento = new Procedimento();
        procedimento.setId(dto.getId());
        procedimento.setConsulta(consulta);
        procedimento.setDescricao(dto.getDescricao());
        procedimento.setValor(dto.getValor());
        procedimento.setObservacoes(dto.getObservacoes());
        
        procedimento = repository.save(procedimento);
        return toDTO(procedimento);
    }

    public void excluir(Long id) {
        if (!repository.existsById(id)) {
            throw new BusinessException("Procedimento não encontrado");
        }
        repository.deleteById(id);
    }

    private ProcedimentoDTO toDTO(Procedimento entity) {
        ProcedimentoDTO dto = new ProcedimentoDTO();
        dto.setId(entity.getId());
        dto.setConsultaId(entity.getConsulta().getId());
        dto.setDescricao(entity.getDescricao());
        dto.setValor(entity.getValor());
        dto.setObservacoes(entity.getObservacoes());
        return dto;
    }
}
