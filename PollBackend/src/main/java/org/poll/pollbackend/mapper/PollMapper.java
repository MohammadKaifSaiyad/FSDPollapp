package org.poll.pollbackend.mapper;

import org.poll.pollbackend.dto.PollDto;
import org.poll.pollbackend.entity.Poll;

import java.sql.Date;

public class PollMapper {
    public static PollDto mapToPollDto(Poll poll){
        return new PollDto(poll.getId(), poll.getPollQuestion(), poll.getPollOptions(), poll.getExpirationDateTime(), poll.getActive(), poll.getTotalVotes());
    }
    public static Poll mapToPoll(PollDto pollDto){
        return new Poll(pollDto.getId(), pollDto.getPollQuestion(), pollDto.getPollOptions(),pollDto.getExpirationDateTime(), pollDto.getActive(), pollDto.getTotalVotes());
    }
}
