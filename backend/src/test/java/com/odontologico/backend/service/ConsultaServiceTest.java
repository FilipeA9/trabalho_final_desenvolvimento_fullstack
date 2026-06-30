package com.odontologico.backend.service;

import com.odontologico.backend.dto.ConsultaDTO;
import com.odontologico.backend.exception.BusinessException;
import com.odontologico.backend.model.Dentista;
import com.odontologico.backend.model.Paciente;
import com.odontologico.backend.model.StatusConsulta;
import com.odontologico.backend.repository.ConsultaRepository;
import com.odontologico.backend.repository.DentistaRepository;
import com.odontologico.backend.repository.PacienteRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ConsultaServiceTest {

    @InjectMocks
    private ConsultaService consultaService;

    @Mock
    private ConsultaRepository consultaRepository;

    @Mock
    private PacienteRepository pacienteRepository;

    @Mock
    private DentistaRepository dentistaRepository;

    @Test
    public void agendar_DeveLancarExcecao_QuandoDentistaTiverConflitoDeHorario() {
        // Arrange
        Long dentistaId = 1L;
        Long pacienteId = 1L;
        LocalDateTime dataHora = LocalDateTime.of(2026, 10, 10, 14, 0);

        ConsultaDTO dto = new ConsultaDTO();
        dto.setPacienteId(pacienteId);
        dto.setDentistaId(dentistaId);
        dto.setDataHora(dataHora);

        Paciente paciente = new Paciente();
        paciente.setId(pacienteId);

        Dentista dentista = new Dentista();
        dentista.setId(dentistaId);

        when(pacienteRepository.findById(pacienteId)).thenReturn(Optional.of(paciente));
        when(dentistaRepository.findById(dentistaId)).thenReturn(Optional.of(dentista));
        when(consultaRepository.existsByDentistaIdAndDataHoraAndStatusNot(dentistaId, dataHora, StatusConsulta.CANCELADA))
                .thenReturn(true); // Conflito

        // Act & Assert
        assertThrows(BusinessException.class, () -> consultaService.agendar(dto));

        // Verify that save was never called
        verify(consultaRepository, never()).save(any());
    }
}
