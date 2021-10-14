package com.bmstu.sessionservice.requests;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateUserRequest {
    private String login;
    private String password;
    private String email;
}
