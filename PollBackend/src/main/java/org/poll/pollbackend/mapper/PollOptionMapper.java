package org.poll.pollbackend.mapper;

import org.poll.pollbackend.dto.PollDto;
import org.poll.pollbackend.dto.PollOptionDto;
import org.poll.pollbackend.entity.Poll;
import org.poll.pollbackend.entity.PollOption;

public class PollOptionMapper {
    public static PollOptionDto mapToPollOptionDto(PollOption pollOption){
        return new PollOptionDto(pollOption.getId(), pollOption.getOption(), pollOption.getPoll(),pollOption.getTotalVotes());
    }
    public static PollOption mapToPollOption(PollOptionDto pollOptionDto){
        return new PollOption(pollOptionDto.getId(), pollOptionDto.getOption(), pollOptionDto.getPoll(), pollOptionDto.getTotalVotes());
    }
}
