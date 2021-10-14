package com.bmstu.sessionservice.controllerTest;

import com.bmstu.sessionservice.autfConfig.jwt.JwtTokenService;
import com.bmstu.sessionservice.entities.User;
import com.bmstu.sessionservice.requests.AuthRequest;
import com.bmstu.sessionservice.services.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.json.JsonMapper;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.HashMap;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class AuthControllerTest {
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private UserService userService;
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private JwtTokenService jwtTokenService;

    @Test
    public void auth_test() throws Exception {
        userService.create(new User("123", "456", "", "ROLE_USER"));
        AuthRequest request = new AuthRequest("123", "456");

        MvcResult mvcResult = mockMvc.perform(
                post("/login")
                        .content(objectMapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON)
        )
                .andExpect(status().isOk())
                .andReturn();
        HashMap<String, String> map = objectMapper.readValue(mvcResult.getResponse().getContentAsString(), HashMap.class);
        assertTrue(map.containsKey("token"));
        assertEquals(jwtTokenService.getUsername(map.get("token")), "123");
    }
}
