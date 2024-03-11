package org.poll.pollbackend.mapper;

import org.poll.pollbackend.dto.UserDto;
import org.poll.pollbackend.entity.User;

public class UserMapper {
    public static UserDto mapToUserDto(User user){
        return new UserDto(user.getId(), user.getUserFullName(), user.getUserName(), user.getUserEmail(), user.getUserPassword());
    }
    public static User mapToUser(UserDto userDto){
        return new User(userDto.getId(), userDto.getUserFullName(), userDto.getUserName(), userDto.getUserEmail(), userDto.getUserPassword());
    }
}
