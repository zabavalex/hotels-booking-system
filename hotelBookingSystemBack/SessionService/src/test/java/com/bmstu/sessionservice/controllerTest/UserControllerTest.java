package com.bmstu.sessionservice.controllerTest;

import com.bmstu.sessionservice.entities.User;
import com.bmstu.sessionservice.requests.CreateUserRequest;
import com.bmstu.sessionservice.services.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.core.AutoConfigureCache;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerTest {
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private UserService userService;
    @Autowired
    public MockMvc mockMvc;

    @Test
    public void createUser_test() throws Exception{
        CreateUserRequest request = new CreateUserRequest("123", "456", "123");

        mockMvc.perform(
                put("/user/create")
                        .content(objectMapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON)
        )
                .andExpect(status().isCreated());
        User user = userService.getUserByLoginAndPassword("123", "456");
        assertNotNull(user);
    }

}
