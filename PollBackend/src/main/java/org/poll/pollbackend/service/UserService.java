package org.poll.pollbackend.service;

import org.poll.pollbackend.dto.UserDto;

public interface UserService {
    UserDto createUser(UserDto userDto);
    UserDto getUserById(Long userId);
    UserDto getUser(String userEmail, String userName);
}
