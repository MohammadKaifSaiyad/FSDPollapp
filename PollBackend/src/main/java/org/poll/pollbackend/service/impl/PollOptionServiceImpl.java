package org.poll.pollbackend.service.impl;

import lombok.AllArgsConstructor;
import org.poll.pollbackend.dto.PollDto;
import org.poll.pollbackend.dto.PollOptionDto;
import org.poll.pollbackend.entity.Poll;
import org.poll.pollbackend.entity.PollOption;
import org.poll.pollbackend.mapper.PollOptionMapper;
import org.poll.pollbackend.repository.PollOptionRepository;
import org.poll.pollbackend.repository.PollRepository;
import org.poll.pollbackend.service.PollOptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class PollOptionServiceImpl implements PollOptionService {
    private PollOptionRepository pollOptionRepository;
    private PollRepository pollRepository;
    @Override
    public PollOptionDto createPollOption(PollOptionDto pollOptionDto, Long pollId) {
        PollOption pollOption = PollOptionMapper.mapToPollOption(pollOptionDto);
        Optional<Poll> pollOptional = pollRepository.findById(pollId);
        if(pollOptional.isPresent()){
            Poll poll = pollOptional.get();
            pollOption.setPoll(poll);
            PollOption savedPollOption = pollOptionRepository.save(pollOption);
//            poll.setPollOption(savedPollOption);
            return PollOptionMapper.mapToPollOptionDto(savedPollOption);
        }
        return null;
    }
}
