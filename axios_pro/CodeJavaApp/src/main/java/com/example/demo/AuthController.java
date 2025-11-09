package com.example.demo;

import java.util.Map;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder; // 암호화를 위해 필요
import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping; // <-- @GetMapping import 추가
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import jakarta.transaction.Transactional;


@RestController
@RequestMapping("/api") // 모든 API는 /api로 시작
public class AuthController {
	
	@Autowired
	private UserRepository repo; // User 엔티티 저장을 위해 필요
	
	/** 비밀번호 변경 요청 DTO (ChangePasswordRequest) 정의 **/
	public static class ChangePasswordRequest {
	    private String currentPassword;
	    private String newPassword;
	    
	    // Getters and Setters
	    public String getCurrentPassword() { return currentPassword; }
	    public void setCurrentPassword(String currentPassword) { this.currentPassword = currentPassword; }
	    public String getNewPassword() { return newPassword; }
	    public void setNewPassword(String newPassword) { this.newPassword = newPassword; }
	}
	
	/** 로그인 요청 DTO (LoginRequest) 정의 **/
	// 로그인 시 필요한 username(email)과 password만 포함해야 합니다.
	public static class LoginRequest {
	    private String username; // 프론트의 email 값이 바인딩됨
	    private String password;
	    
	    // Getters and Setters
	    public String getUsername() { return username; }
	    public void setUsername(String username) { this.username = username; }
	    public String getPassword() { return password; }
	    public void setPassword(String password) { this.password = password; }
	}
	
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequest request) {
	    String email = request.getUsername();
	    String rawPassword = request.getPassword();
	    
	    User user = repo.findByEmail(email);

	    if (user == null) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("success", false, "message", "아이디 또는 비밀번호 오류입니다."));
	    }

	    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
	    boolean passwordMatches = encoder.matches(rawPassword, user.getPassword());

	    if (passwordMatches) {
	        // 인증 성공 시
	        return ResponseEntity.ok(Map.of("success", true, "message", "로그인 성공"));
	    } else {
	        // 비밀번호가 일치하지 않는 경우
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("success", false, "message", "아이디 또는 비밀번호 오류입니다."));
	    }
	}
	
    // 🚀 회원가입 REST API
	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@RequestBody User user) {
		
        // 1. 비밀번호 암호화
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		String encodedPassword = encoder.encode(user.getPassword());
		user.setPassword(encodedPassword);
		
		try {
            // 2. DB 저장 및 응답
			repo.save(user);
			return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("success", true, "message", "회원가입이 완료되었습니다."));
		} catch (Exception e) {
            // 3. 오류 처리 (예: 이메일 중복)
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("success", false, "message", "이미 존재하는 이메일이거나 서버 오류입니다."));
		}
	}
	
    // 🔑 프로필 정보 조회 API (ProfilePage.js에서 DB 데이터를 가져오는 핵심 기능)
	@GetMapping("/profile")
	public ResponseEntity<?> getProfile(Authentication authentication) {
	    // 1. Spring Security Context에서 현재 로그인된 사용자의 ID(Principal, 이메일)를 추출합니다.
	    String authenticatedEmail = authentication.getName(); 

	    // 2. 인증된 이메일로 DB에서 사용자 정보를 조회합니다.
	    User user = repo.findByEmail(authenticatedEmail);

	    if (user == null) {
	        // 사용자를 찾을 수 없는 경우
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("success", false, "message", "사용자 정보를 찾을 수 없습니다."));
	    }
	    
	    // 3. 보안을 위해 비밀번호 필드를 제거(null 처리)한 후 전송합니다.
	    user.setPassword(null); 
	    
	    // 4. 프로필 정보를 JSON 형태로 반환합니다.
	    return ResponseEntity.status(HttpStatus.OK).body(user);
	}
	
	// 비밀번호 변경 API
	@Transactional
	@PostMapping("/changepassword")
	public ResponseEntity<?> changePassword(
	    @RequestBody ChangePasswordRequest request,
	    Authentication authentication
	) {
	    // 1. 인증된 사용자 ID(이메일) 추출
	    String authenticatedEmail = authentication.getName(); 

	    // 2. DB에서 사용자 정보 조회
	    User user = repo.findByEmail(authenticatedEmail); 

	    if (user == null) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("success", false, "message", "사용자 정보를 찾을 수 없습니다."));
	    }
	    
	    // 3. 현재 비밀번호 검증
	    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
	    if (!encoder.matches(request.getCurrentPassword(), user.getPassword())) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("success", false, "message", "비밀번호 변경에 실패했습니다. 현재 비밀번호를 다시 확인해주세요."));
	    }
	    
	    // 4. 새 비밀번호 암호화 및 업데이트
	    String newEncodedPassword = encoder.encode(request.getNewPassword());
	    user.setPassword(newEncodedPassword);
	    
	    // 5. 응답
	    return ResponseEntity.status(HttpStatus.OK).body(Map.of("success", true, "message", "비밀번호가 성공적으로 변경되었습니다."));
	}
}