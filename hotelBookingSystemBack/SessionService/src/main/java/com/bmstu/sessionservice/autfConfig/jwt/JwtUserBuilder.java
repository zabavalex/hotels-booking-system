package com.bmstu.sessionservice.autfConfig.jwt;

import com.bmstu.sessionservice.entities.User;

public final class JwtUserBuilder {
    public JwtUserBuilder(){
    }

    public static JwtUser create(User user){
        return new JwtUser(user.getId(), user.getLogin(), user.getPassword());
    }
}
