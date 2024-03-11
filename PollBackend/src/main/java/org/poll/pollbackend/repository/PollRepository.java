package org.poll.pollbackend.repository;

import org.poll.pollbackend.entity.Poll;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PollRepository extends JpaRepository<Poll, Long> {
}
