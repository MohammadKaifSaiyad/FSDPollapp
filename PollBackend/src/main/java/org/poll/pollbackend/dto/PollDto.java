package org.poll.pollbackend.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.poll.pollbackend.entity.PollOption;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PollDto {
    private long id;
    private String pollQuestion;
    private List<PollOption> pollOptions = new ArrayList<>();
    private String expirationDateTime;
    private Boolean active;
    private long totalVotes;
}
