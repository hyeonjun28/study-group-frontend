package com.example.demo;

import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AuthController {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@RequestBody User user) {

        if (userRepo.findByEmail(user.getEmail()) != null) {
            return ResponseEntity
                .status(409)
                .body(new AuthResponse(false, "이미 존재하는 이메일입니다."));
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepo.save(user);

        return ResponseEntity.ok(new AuthResponse(true, "회원가입 성공"));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody User user) {
        User dbUser = userRepo.findByEmail(user.getEmail());

        if (dbUser == null || !passwordEncoder.matches(user.getPassword(), dbUser.getPassword())) {
            return ResponseEntity
                .status(401)
                .body(new AuthResponse(false, "이메일 또는 비밀번호 오류"));
        }

        return ResponseEntity.ok(new AuthResponse(true, "로그인 성공"));
    }
}
