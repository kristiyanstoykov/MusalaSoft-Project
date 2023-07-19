package com.example.todolistbackend;

import java.util.Optional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
// import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.example.todolistbackend.model.User;
import com.example.todolistbackend.repository.UserRepository;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

import com.example.todolistbackend.dto.UserDto;
import com.example.todolistbackend.dto.UserDtoResponse;
import com.example.todolistbackend.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.modelmapper.ModelMapper;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
class ToDoListBackendApplicationTests {

	@Autowired
	private UserRepository underTest;

	@Mock
	private UserRepository userRepository;

	@Mock
	private ModelMapper modelMapper;

	@InjectMocks
	private UserService userService;

	@BeforeEach
	void setUp() {
		userService = new UserService(userRepository);
	}

	@AfterEach
	void tearDown() {
		underTest.deleteAll();
	}

	@Test
	void UserEmailExists() {
		// given
		String email = "stoyan@example.com";
		User user = new User(
				null, "stoyan", "stoykov", email,
				"stoyo", "stoyo", null, null);

		underTest.save(user);

		// when
		Optional<User> expected = underTest.findByEmail(email);

		// then
		assertThat(expected.isPresent()).isTrue();
	}

	@Test
	void UserEmailDoesNotExists() {
		// given
		String email = "stoyan@example.com";

		// when
		Optional<User> expected = underTest.findByEmail(email);

		// then
		assertThat(expected.isPresent()).isFalse();
	}

	@Test
	void getUser() {
		// arrange
		String email = "test@example.com";
		User user = new User();
		user.setEmail(email);
		when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

		UserDtoResponse userDtoResponse = new UserDtoResponse();
		userDtoResponse.setEmail(email);
		when(modelMapper.map(user, UserDtoResponse.class)).thenReturn(userDtoResponse);

		// act
		UserDtoResponse result = userService.getUser(email);

		// assert
		assertNotNull(result);
		assertEquals(email, result.getEmail());
		verify(userRepository, times(1)).findByEmail(email);
	}

	@Test
	void registerUser() {
		// arrange
		UserDto userDto = new UserDto();
		userDto.setEmail("test@example.com");
		userDto.setUsername("testUser");

		when(userRepository.findByEmail(userDto.getEmail())).thenReturn(Optional.empty());
		when(userRepository.findByUsername(userDto.getUsername())).thenReturn(Optional.empty()); // Corrected line

		User user = new User();
		user.setEmail(userDto.getEmail());
		user.setUsername(userDto.getUsername());

		when(modelMapper.map(userDto, User.class)).thenReturn(user);
		when(userRepository.save(user)).thenReturn(user);

		UserDtoResponse userDtoResponse = new UserDtoResponse();
		userDtoResponse.setEmail(userDto.getEmail());
		userDtoResponse.setUsername(userDto.getUsername());

		when(modelMapper.map(user, UserDtoResponse.class)).thenReturn(userDtoResponse);

		// act
		UserDtoResponse result = userService.registerUser(userDto);

		// assert
		assertNotNull(result);
		assertEquals(userDto.getEmail(), result.getEmail());
		assertEquals(userDto.getUsername(), result.getUsername());
		verify(userRepository, times(1)).save(user);
	}
}