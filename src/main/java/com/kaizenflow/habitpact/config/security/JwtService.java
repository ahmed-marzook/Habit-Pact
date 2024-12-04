package com.kaizenflow.habitpact.config.security;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

/**
 * Service class responsible for JWT (JSON Web Token) operations including: - Token generation -
 * Token validation - Claims extraction - Token signing
 *
 * <p>This service provides the core JWT functionality used for stateless authentication in the
 * application.
 */
@Component
public class JwtService {

    // Logger instance for debugging and monitoring JWT operations
    private static final Logger logger = LoggerFactory.getLogger(JwtService.class);

    /**
     * Secret key used for signing JWT tokens. SECURITY NOTE: In production environments, this should
     * be: 1. Stored in environment variables or secure configuration 2. At least 256 bits long for
     * HS256 algorithm 3. Kept confidential and regularly rotated
     */
    public static final String SECRET =
            "5367566B59703373367639792F423F4528482B4D6251655468576D5A71347437";

    /**
     * Generates a JWT token for a given user. This method creates a token with: - Empty claims map
     * (can be extended to include additional claims) - User's email as the subject - Current
     * timestamp as issuance time - Expiration set to 30 minutes from issuance
     *
     * @param userName The user's email address
     * @return A signed JWT token string
     */
    public String generateToken(String userName) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, userName);
    }

    /**
     * Creates and signs a JWT token with the specified claims and subject. The token includes: 1.
     * Custom claims passed in the claims map 2. Standard JWT claims (subject, issued at, expiration)
     * 3. Digital signature using HS256 algorithm
     *
     * @param claims Additional claims to include in the token
     * @param email User's email to be used as the subject
     * @return Signed JWT token string
     */
    private String createToken(Map<String, Object> claims, String email) {
        return Jwts.builder()
                .setClaims(claims) // Set custom claims
                .setSubject(email) // Set user email as subject
                .setIssuedAt(new Date()) // Set current time as issuance time
                .setExpiration(
                        new Date(System.currentTimeMillis() + 1000 * 60 * 30)) // 30 minute expiration
                .signWith(getSignKey(), SignatureAlgorithm.HS256) // Sign with HS256 algorithm
                .compact(); // Build the final token string
    }

    /**
     * Creates a signing key from the secret. This method: 1. Decodes the BASE64 encoded secret 2.
     * Creates an HMAC-SHA key for token signing
     *
     * @return SecretKey instance for token signing
     */
    private SecretKey getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    /**
     * Extracts the email (subject) from a JWT token. Uses the generic claim extraction method with
     * the subject resolver.
     *
     * @param token JWT token string
     * @return The email address stored in the token's subject claim
     */
    public String extractEmail(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * Extracts the expiration date from a JWT token. Uses the generic claim extraction method with
     * the expiration resolver.
     *
     * @param token JWT token string
     * @return The token's expiration date
     */
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    /**
     * Generic method to extract any claim from a JWT token using a claims resolver function. This
     * method provides flexibility to extract different types of claims using the same code.
     *
     * @param token JWT token string
     * @param claimsResolver Function to extract the desired claim
     * @return The extracted claim value
     */
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    /**
     * Extracts and verifies all claims from a JWT token. This method: 1. Parses the token 2. Verifies
     * the signature using the signing key 3. Extracts all claims from the token payload
     *
     * @param token JWT token string
     * @return Claims object containing all token claims
     */
    private Claims extractAllClaims(String token) {
        return Jwts.parser().verifyWith(getSignKey()).build().parseSignedClaims(token).getPayload();
    }

    /**
     * Checks if a token has expired by comparing its expiration date with current time.
     *
     * @param token JWT token string
     * @return true if token has expired, false otherwise
     */
    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    /**
     * Validates a JWT token against user details. Validation checks: 1. Token subject (email) matches
     * the provided user details 2. Token hasn't expired
     *
     * @param token JWT token string
     * @param userDetails User details to validate against
     * @return true if token is valid, false otherwise
     */
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String email = extractEmail(token);
        boolean isValid = email.equals(userDetails.getUsername()) && !isTokenExpired(token);
        logger.debug("Token validation for email {}: {}", email, isValid);
        return isValid;
    }
}
