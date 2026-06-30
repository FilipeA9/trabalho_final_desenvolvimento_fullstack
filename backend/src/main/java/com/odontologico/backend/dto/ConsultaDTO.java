package com.odontologico.backend.dto;

import com.odontologico.backend.model.StatusConsulta;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ConsultaDTO {

    private Long id;

    @NotNull(message = "O ID do paciente é obrigatório")
    private Long pacienteId;

    @NotNull(message = "O ID do dentista é obrigatório")
    private Long dentistaId;

    @NotNull(message = "A data e hora são obrigatórias")
    private LocalDateTime dataHora;

    private StatusConsulta status;
    
    // Nomes auxiliares para exibir no frontend
    private String pacienteNome;
    private String dentistaNome;
}
