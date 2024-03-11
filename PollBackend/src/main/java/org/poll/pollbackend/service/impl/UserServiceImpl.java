package org.poll.pollbackend.service.impl;

import lombok.AllArgsConstructor;
import org.poll.pollbackend.dto.UserDto;
import org.poll.pollbackend.entity.User;
import org.poll.pollbackend.exception.ResourceNotFoundException;
import org.poll.pollbackend.mapper.UserMapper;
import org.poll.pollbackend.repository.UserRepository;
import org.poll.pollbackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;
    @Override
    public UserDto createUser(UserDto userDto) {
        User user = UserMapper.mapToUser(userDto);
        User savedUser = userRepository.save(user);
        return UserMapper.mapToUserDto(savedUser);
    }

    @Override
    public UserDto getUser(String userEmail, String userName) {
        User user = userRepository.findByUserEmailOrUserName(userEmail, userName);

        return UserMapper.mapToUserDto(user);
    }

    @Override
    public UserDto getUserById(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not exists with given id : "+userId));
        return UserMapper.mapToUserDto(user);
    }
}
