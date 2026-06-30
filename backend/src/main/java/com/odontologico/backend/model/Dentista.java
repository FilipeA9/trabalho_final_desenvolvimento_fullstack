package com.odontologico.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "dentistas")
public class Dentista {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false, unique = true)
    private String cro;

    @Column(nullable = false)
    private String especialidade;

    private String telefone;
    
    private String email;

    @OneToMany(mappedBy = "dentista", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Consulta> consultas;
}
