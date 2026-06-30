package com.odontologico.backend.service;

import com.odontologico.backend.dto.ConsultaDTO;
import com.odontologico.backend.exception.BusinessException;
import com.odontologico.backend.model.Consulta;
import com.odontologico.backend.model.Dentista;
import com.odontologico.backend.model.Paciente;
import com.odontologico.backend.model.StatusConsulta;
import com.odontologico.backend.repository.ConsultaRepository;
import com.odontologico.backend.repository.DentistaRepository;
import com.odontologico.backend.repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ConsultaService {

    @Autowired
    private ConsultaRepository repository;

    @Autowired
    private PacienteRepository pacienteRepository;

    @Autowired
    private DentistaRepository dentistaRepository;

    public List<ConsultaDTO> listarTodas() {
        return repository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    public ConsultaDTO buscarPorId(Long id) {
        Consulta consulta = repository.findById(id)
                .orElseThrow(() -> new BusinessException("Consulta não encontrada"));
        return toDTO(consulta);
    }

    public ConsultaDTO agendar(ConsultaDTO dto) {
        Paciente paciente = pacienteRepository.findById(dto.getPacienteId())
                .orElseThrow(() -> new BusinessException("Paciente não encontrado"));

        Dentista dentista = dentistaRepository.findById(dto.getDentistaId())
                .orElseThrow(() -> new BusinessException("Dentista não encontrado"));

        // RF04 - Validar conflito de agenda
        boolean conflito = repository.existsByDentistaIdAndDataHoraAndStatusNot(
                dentista.getId(), dto.getDataHora(), StatusConsulta.CANCELADA);

        if (conflito) {
            throw new BusinessException("O dentista já possui uma consulta agendada neste horário.");
        }

        Consulta consulta = new Consulta();
        consulta.setId(dto.getId());
        consulta.setPaciente(paciente);
        consulta.setDentista(dentista);
        consulta.setDataHora(dto.getDataHora());
        consulta.setStatus(dto.getStatus() != null ? dto.getStatus() : StatusConsulta.AGENDADA);

        consulta = repository.save(consulta);
        return toDTO(consulta);
    }

    public ConsultaDTO atualizarStatus(Long id, StatusConsulta status) {
        Consulta consulta = repository.findById(id)
                .orElseThrow(() -> new BusinessException("Consulta não encontrada"));
        
        consulta.setStatus(status);
        consulta = repository.save(consulta);
        return toDTO(consulta);
    }

    private ConsultaDTO toDTO(Consulta entity) {
        ConsultaDTO dto = new ConsultaDTO();
        dto.setId(entity.getId());
        dto.setPacienteId(entity.getPaciente().getId());
        dto.setDentistaId(entity.getDentista().getId());
        dto.setDataHora(entity.getDataHora());
        dto.setStatus(entity.getStatus());
        dto.setPacienteNome(entity.getPaciente().getNome());
        dto.setDentistaNome(entity.getDentista().getNome());
        return dto;
    }
}
