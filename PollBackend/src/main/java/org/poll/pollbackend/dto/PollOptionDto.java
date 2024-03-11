package org.poll.pollbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.poll.pollbackend.entity.Poll;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PollOptionDto {
    private long id;
    private String option;
    private Poll poll;
    private long totalVotes;
}
