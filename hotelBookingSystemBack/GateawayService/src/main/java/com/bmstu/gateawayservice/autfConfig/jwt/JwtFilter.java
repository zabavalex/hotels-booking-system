package com.bmstu.gateawayservice.autfConfig.jwt;

import com.bmstu.gateawayservice.services.SessionService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

public class JwtFilter extends GenericFilterBean {
    private final JwtTokenService jwtTokenService;
    private SessionService sessionService;

    public JwtFilter(JwtTokenService jwtTokenService, SessionService sessionService) {
        this.jwtTokenService = jwtTokenService;
        this.sessionService = sessionService;
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
            throws IOException, ServletException {
        String token = jwtTokenService.resolveToken((HttpServletRequest) servletRequest);

        if(token != null ) {
            String name = jwtTokenService.getUsername(token);
            if (sessionService.verify(token)) {
                if (jwtTokenService.validate(token)) {
                    Authentication auth = new UsernamePasswordAuthenticationToken(name, null,
                            null);
                    SecurityContextHolder.getContext().setAuthentication(auth);
                }
            }
        }
        filterChain.doFilter(servletRequest, servletResponse);

    }
}
