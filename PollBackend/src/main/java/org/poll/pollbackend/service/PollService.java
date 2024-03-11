package org.poll.pollbackend.service;

import org.poll.pollbackend.dto.PollDto;

import java.util.List;

public interface PollService {
    PollDto createPoll(PollDto pollDto);
    PollDto getPollById(Long pollId);
    List<PollDto> getAllPolls();
}
