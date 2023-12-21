package de.neuefische.backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.oidcLogin;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @DirtiesContext
    void getMe() throws Exception {
        AppUser appUser = new AppUser("testUser", "testAvatarUrl");
        String appUserJson = objectMapper.writeValueAsString(appUser);
        mockMvc.perform(get("/api/auth/me").with(oidcLogin().userInfoToken(token -> token
                                .claim("login", "testUser")
                                .claim("avatar_url", "testAvatarUrl")
                        ))
                )
                .andExpect(status().isOk())
                .andExpect(content().json(appUserJson));
    }

    @Test
    @DirtiesContext
    void getMe_notLoggedIn() throws Exception {
        mockMvc.perform(get("/api/auth/me"))
                .andExpect(status().isUnauthorized());
    }
}