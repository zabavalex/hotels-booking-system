package com.bmstu.hotelservice.autfConfig.jwt;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class JwtUserDetailsService implements UserDetailsService{
    @Value("${server.login}")
    private String login;
    @Value("${server.password}")
    private String password;

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        if(login.equals(this.login)){
            throw new UsernameNotFoundException("User with login: " + login + "not found");
        }
        return new JwtUser(null ,login, password);
    }
}
