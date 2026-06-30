package com.odontologico.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class DentistaDTO {

    private Long id;

    @NotBlank(message = "O nome é obrigatório")
    private String nome;

    @NotBlank(message = "O CRO é obrigatório")
    private String cro;

    @NotBlank(message = "A especialidade é obrigatória")
    private String especialidade;

    private String telefone;
    
    private String email;
}
