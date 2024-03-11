package org.poll.pollbackend.repository;

import org.poll.pollbackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUserEmailOrUserName(String userEmail, String UserName);
}
