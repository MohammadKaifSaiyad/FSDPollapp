package org.poll.pollbackend.controller;

import lombok.AllArgsConstructor;
import org.poll.pollbackend.dto.PollDto;
import org.poll.pollbackend.dto.PollOptionDto;
import org.poll.pollbackend.entity.Poll;
import org.poll.pollbackend.entity.PollOption;
import org.poll.pollbackend.mapper.PollMapper;
import org.poll.pollbackend.service.PollOptionService;
import org.poll.pollbackend.service.PollService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/poll")
@AllArgsConstructor
public class PollController {
    PollService pollService;
    PollOptionService pollOptionService;

    @GetMapping()
    public ResponseEntity<List<PollDto>>getAllPolls(){
        List<PollDto> pollList=pollService.getAllPolls();
        System.out.println(pollList);
        return new ResponseEntity<>(pollList, HttpStatus.resolve(200));
    }
    @PostMapping("/cratePoll")
    public ResponseEntity<PollDto> createPoll(@RequestBody PollDto pollDto){
        System.out.println("data: "+pollDto);
        Poll poll = new Poll();
        poll.setPollQuestion(pollDto.getPollQuestion());
        poll.setActive(pollDto.getActive());
        poll.setTotalVotes(pollDto.getTotalVotes());
        poll.setExpirationDateTime(pollDto.getExpirationDateTime());

        pollDto.getPollOptions().forEach(poll::addPollOption);

        PollDto savedPoll = pollService.createPoll(PollMapper.mapToPollDto(poll));

        return new ResponseEntity<>(savedPoll, HttpStatus.CREATED);
    }
    @GetMapping("{id}")
    public ResponseEntity<PollDto> getPollById(@PathVariable("id") Long pollId){
        PollDto pollDto = pollService.getPollById(pollId);
        return ResponseEntity.ok(pollDto);
    }
    @PostMapping("/addOption/{id}")
    public ResponseEntity<PollDto> addOptionToPoll(@PathVariable("id") Long pollId, @RequestBody PollOptionDto pollOptionDto){
        PollOptionDto savedPollOption = pollOptionService.createPollOption(pollOptionDto, pollId);
        PollDto savedPoll = pollService.getPollById(pollId);
        return new ResponseEntity<>(savedPoll, HttpStatus.CREATED);
    }
}
