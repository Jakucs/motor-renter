package com.motorenter.motorenter.security;

import com.motorenter.motorenter.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
//Mindenképp csak 1x futtatjuk a OncePerRequestFilter -el
    private final JwtService jwtService;

    public JwtAuthenticationFilter(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");

        // ha nincs Authorization header vagy nem "Bearer " -el kezdődik továbbengedjük token nélkül
        // (SecurityConfig fogja eldönteni, hogy az adott endpoint publikus-e vagy sem)
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        final String token = authHeader.substring(7); // "Bearer " t levágjuk

        if (jwtService.isTokenValid(token)) {
            Integer userId = jwtService.extractUserId(token);

            // beállítjuk a SecurityContext-et, hogy a rendszer tudja, ki a bejelentkezett user
            UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(
                            userId,          // principal - ezt fogjuk @AuthenticationPrincipal-lal kiolvasni
                            null,             // credentials - nem kell, már validáltuk a tokent
                            Collections.emptyList() // authorities - egyelőre üres, később bővíthető role alapján
                    );

            SecurityContextHolder.getContext().setAuthentication(authToken);
        }

        filterChain.doFilter(request, response);
    }
}