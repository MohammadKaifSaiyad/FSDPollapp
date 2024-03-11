package org.poll.pollbackend.service.impl;

import lombok.AllArgsConstructor;
import org.poll.pollbackend.dto.PollDto;
import org.poll.pollbackend.entity.Poll;
import org.poll.pollbackend.exception.ResourceNotFoundException;
import org.poll.pollbackend.mapper.PollMapper;
import org.poll.pollbackend.repository.PollRepository;
import org.poll.pollbackend.service.PollService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class PollServiceImpl implements PollService {
    private PollRepository pollRepository;
    @Override
    public PollDto createPoll(PollDto pollDto) {
        Poll poll = PollMapper.mapToPoll(pollDto);
        Poll savedPoll = pollRepository.save(poll);
        return PollMapper.mapToPollDto(savedPoll);
    }

    @Override
    public PollDto getPollById(Long pollId) {
        Poll poll = pollRepository.findById(pollId)
                .orElseThrow(() -> new ResourceNotFoundException("poll not exists with given id : "+pollId));
        return PollMapper.mapToPollDto(poll);
    }

    @Override
    public List<PollDto> getAllPolls() {
        List<Poll> polls= pollRepository.findAll();
        System.out.println("polls:"+polls);
        List<Poll> activePoll = polls.stream().filter(poll -> {
            if(poll.getActive() && poll.getId()%2==0){
                return true;
            }
            return false;
        }).toList();
        List<PollDto> pollDtos = activePoll.stream().map(PollMapper::mapToPollDto).toList();
        return pollDtos;
    }

}
