package com.bmstu.sessionservice.entities;

import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Table(name = "user")
@Entity
public class User {
        @Id
        @GeneratedValue(strategy = GenerationType.TABLE)
        private Long id;
        private String login;
        private String password;
        private String email;
        private String role;

        public User(String login, String password, String email, String role) {
                this.login = login;
                this.password = password;
                this.email = email;
                this.role = role;
        }
}