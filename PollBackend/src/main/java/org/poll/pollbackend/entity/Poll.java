package org.poll.pollbackend.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.antlr.v4.runtime.misc.NotNull;
import org.poll.pollbackend.dto.PollOptionDto;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "poll")
public class Poll {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "poll_question")
    private String pollQuestion;
    @JsonManagedReference
    @OneToMany(mappedBy = "poll", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<PollOption> pollOptions = new ArrayList<>();
    @Column(name = "time")
    private String expirationDateTime;
    @Column(name = "is_active")
    private Boolean active;
    @Column(name = "total_votes")
    private long totalVotes;
    public void addPollOption(PollOption pollOption){
        pollOptions.add(pollOption);
        pollOption.setPoll(this);
    }
}
