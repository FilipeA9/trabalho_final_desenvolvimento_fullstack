package com.odontologico.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProcedimentoDTO {

    private Long id;

    @NotNull(message = "O ID da consulta é obrigatório")
    private Long consultaId;

    @NotBlank(message = "A descrição é obrigatória")
    private String descricao;

    @NotNull(message = "O valor é obrigatório")
    private BigDecimal valor;

    private String observacoes;
}
