package com.example.app.security.token;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.Set;

public interface TokenRepository extends JpaRepository<Token, Long> {

    @Query("""
        select t from Token t inner join User u on t.user.id = u.id
        where u.id = :userId and (t.expired = false or t.revoked = false )
    """)
    Set<Token> findAllValidTokensByUser(Long userId);


    Optional<Token> findByToken(String token);
}