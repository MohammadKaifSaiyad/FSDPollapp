package org.poll.pollbackend.controller;

import lombok.AllArgsConstructor;
import org.poll.pollbackend.dto.LoginDto;
import org.poll.pollbackend.dto.UserDto;
import org.poll.pollbackend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@AllArgsConstructor
public class UserController {
    private UserService userService;

    // Build All User REST API
    @PostMapping
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto){
        UserDto savedUser = userService.createUser(userDto);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginDto> login(@RequestBody LoginDto login){
        System.out.println("token: "+login.getUnique()+" "+login.getPassword());
        //decode token and get user name and password
        String userName=login.getUnique();
        String userEmail=login.getUnique();
        String userPassword=login.getPassword();

        UserDto userDto = userService.getUser(userEmail, userName);
        if(userDto.getUserPassword().equals(userPassword)){
            System.out.println("ok");
            return ResponseEntity.ok(login);
        }else{
            System.out.println("cancel");
        }
        return null;
    }

    // Build Get User REST API
    @GetMapping("{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable("id") Long userId){
        UserDto userDto = userService.getUserById(userId);
        return ResponseEntity.ok(userDto);
    }
}
