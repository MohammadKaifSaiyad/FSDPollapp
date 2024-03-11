package org.poll.pollbackend.service;

import org.poll.pollbackend.dto.PollDto;
import org.poll.pollbackend.dto.PollOptionDto;

public interface PollOptionService {
    PollOptionDto createPollOption(PollOptionDto pollOptionDto, Long pollId);
}
