package com.bmstu.gateawayservice.autfConfig.jwt;

import com.bmstu.gateawayservice.services.SessionService;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

public class JwtConfig extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {
    private JwtTokenService jwtTokenService;
    private SessionService sessionService;

    public JwtConfig(JwtTokenService jwtTokenProvider, SessionService sessionService) {
        this.jwtTokenService = jwtTokenProvider;
        this.sessionService = sessionService;
    }

    @Override
    public void configure(HttpSecurity httpSecurity) throws Exception {
        JwtFilter jwtTokenFilter = new JwtFilter(jwtTokenService, sessionService);
        httpSecurity.addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class);
    }
}
