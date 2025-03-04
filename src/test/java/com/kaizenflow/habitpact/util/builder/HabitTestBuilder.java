package com.kaizenflow.habitpact.util.builder;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.kaizenflow.habitpact.domain.dto.request.CreateHabitCompletionRequest;
import com.kaizenflow.habitpact.domain.dto.request.CreateHabitRequest;
import com.kaizenflow.habitpact.domain.dto.request.FrequencyRequest;
import com.kaizenflow.habitpact.domain.dto.request.ReminderRequest;
import com.kaizenflow.habitpact.domain.dto.request.UpdateHabitRequest;
import com.kaizenflow.habitpact.domain.dto.response.HabitCompletionResponse;
import com.kaizenflow.habitpact.domain.dto.response.HabitResponse;
import com.kaizenflow.habitpact.domain.enums.HabitFrequency;
import com.kaizenflow.habitpact.domain.model.habit.Frequency;
import com.kaizenflow.habitpact.domain.model.habit.Habit;
import com.kaizenflow.habitpact.domain.model.habit.Reminder;
import com.kaizenflow.habitpact.domain.model.habit.Streak;

public class HabitTestBuilder {
    // Default values as static constants
    public static final String DEFAULT_ID = "650e8400-e29b-41d4-a716-446655440000";
    public static final String DEFAULT_USER_ID = "550e8400-e29b-41d4-a716-446655440000";
    public static final String DEFAULT_NAME = "Morning Meditation";
    public static final String DEFAULT_DESCRIPTION =
            "10 minutes of mindfulness meditation every morning";
    public static final int DEFAULT_FREQUENCY_TIMES = 1;
    public static final HabitFrequency DEFAULT_FREQUENCY_PERIOD = HabitFrequency.DAILY;
    public static final List<String> DEFAULT_TAGS = List.of("wellness", "mindfulness");
    public static final boolean DEFAULT_ARCHIVED = false;
    public static final boolean DEFAULT_REMINDER_ENABLED = true;
    public static final String DEFAULT_REMINDER_TIME = "08:00";
    public static final List<String> DEFAULT_REMINDER_DAYS = List.of("MONDAY", "WEDNESDAY", "FRIDAY");
    public static final int DEFAULT_STREAK_CURRENT = 5;
    public static final int DEFAULT_STREAK_LONGEST = 10;
    public static final LocalDateTime DEFAULT_CREATED_AT = LocalDateTime.of(2024, 1, 1, 12, 0, 0);
    public static final LocalDateTime DEFAULT_UPDATED_AT = LocalDateTime.of(2024, 1, 1, 12, 0, 0);
    public static final LocalDate DEFAULT_COMPLETION_DATE = LocalDate.of(2024, 1, 1);
    public static final boolean DEFAULT_COMPLETION_STATUS = true;
    public static final String DEFAULT_COMPLETION_NOTES = "Great session today!";
    public static final String DEFAULT_COMPLETION_ID = "750e8400-e29b-41d4-a716-446655440000";

    // Instance fields
    private String id = DEFAULT_ID;
    private String userId = DEFAULT_USER_ID;
    private String name = DEFAULT_NAME;
    private String description = DEFAULT_DESCRIPTION;
    private int frequencyTimes = DEFAULT_FREQUENCY_TIMES;
    private HabitFrequency frequencyPeriod = DEFAULT_FREQUENCY_PERIOD;
    private List<String> tags = new ArrayList<>(DEFAULT_TAGS);
    private boolean archived = DEFAULT_ARCHIVED;
    private boolean reminderEnabled = DEFAULT_REMINDER_ENABLED;
    private String reminderTime = DEFAULT_REMINDER_TIME;
    private List<String> reminderDays = new ArrayList<>(DEFAULT_REMINDER_DAYS);
    private int streakCurrent = DEFAULT_STREAK_CURRENT;
    private int streakLongest = DEFAULT_STREAK_LONGEST;
    private LocalDateTime createdAt = DEFAULT_CREATED_AT;
    private LocalDateTime updatedAt = DEFAULT_UPDATED_AT;
    private LocalDate completionDate = DEFAULT_COMPLETION_DATE;
    private boolean completionStatus = DEFAULT_COMPLETION_STATUS;
    private String completionNotes = DEFAULT_COMPLETION_NOTES;
    private String completionId = DEFAULT_COMPLETION_ID;

    /** Static factory method to start building a Habit. */
    public static HabitTestBuilder aHabit() {
        return new HabitTestBuilder();
    }

    /** Builds and returns a Habit entity with the current builder state. */
    public Habit build() {
        Frequency frequency = new Frequency(frequencyTimes, frequencyPeriod);
        Reminder reminder = new Reminder(reminderEnabled, reminderTime, reminderDays);
        Streak streak = new Streak(streakCurrent, streakLongest, updatedAt);

        return Habit.builder()
                .id(id)
                .userId(userId)
                .name(name)
                .description(description)
                .frequency(frequency)
                .tags(tags)
                .archived(archived)
                .reminder(reminder)
                .streak(streak)
                .createdAt(createdAt)
                .updatedAt(updatedAt)
                .build();
    }

    /** Builds a CreateHabitRequest DTO from the current builder state. */
    public CreateHabitRequest buildCreateRequest() {
        FrequencyRequest frequencyRequest = new FrequencyRequest(frequencyTimes, frequencyPeriod);
        ReminderRequest reminderRequest =
                new ReminderRequest(reminderEnabled, reminderTime, reminderDays);

        return new CreateHabitRequest(name, description, frequencyRequest);
    }

    /** Builds an UpdateHabitRequest DTO from the current builder state. */
    public UpdateHabitRequest buildUpdateRequest() {
        FrequencyRequest frequencyRequest = new FrequencyRequest(frequencyTimes, frequencyPeriod);
        ReminderRequest reminderRequest =
                new ReminderRequest(reminderEnabled, reminderTime, reminderDays);

        return new UpdateHabitRequest(name, description, frequencyRequest, tags, reminderRequest);
    }

    /** Builds a HabitResponse DTO from the current builder state. */
    public HabitResponse buildHabitResponse() {
        Frequency frequency = new Frequency(frequencyTimes, frequencyPeriod);
        Reminder reminder = new Reminder(reminderEnabled, reminderTime, reminderDays);
        Streak streak = new Streak(streakCurrent, streakLongest, updatedAt);

        return new HabitResponse(
                id,
                userId,
                name,
                description,
                frequency,
                tags,
                archived,
                streak,
                reminder,
                createdAt,
                updatedAt);
    }

    /** Builds a CreateHabitCompletionRequest DTO from the current builder state. */
    public CreateHabitCompletionRequest buildCreateCompletionRequest() {
        return new CreateHabitCompletionRequest(completionDate, completionStatus, completionNotes);
    }

    /** Builds a HabitCompletionResponse DTO from the current builder state. */
    public HabitCompletionResponse buildHabitCompletionResponse() {
        return new HabitCompletionResponse(
                completionId, id, userId, completionDate, completionStatus, completionNotes, createdAt);
    }

    /** Sets the habit ID. */
    public HabitTestBuilder withId(String id) {
        this.id = id;
        return this;
    }

    /** Sets the user ID. */
    public HabitTestBuilder withUserId(String userId) {
        this.userId = userId;
        return this;
    }

    /** Sets the habit name. */
    public HabitTestBuilder withName(String name) {
        this.name = name;
        return this;
    }

    /** Sets the habit description. */
    public HabitTestBuilder withDescription(String description) {
        this.description = description;
        return this;
    }

    /** Sets the frequency times. */
    public HabitTestBuilder withFrequencyTimes(int times) {
        this.frequencyTimes = times;
        return this;
    }

    /** Sets the frequency period. */
    public HabitTestBuilder withFrequencyPeriod(HabitFrequency period) {
        this.frequencyPeriod = period;
        return this;
    }

    /** Sets the habit tags. */
    public HabitTestBuilder withTags(List<String> tags) {
        this.tags = new ArrayList<>(tags);
        return this;
    }

    /** Adds a tag to the habit's tags list. */
    public HabitTestBuilder withAdditionalTag(String tag) {
        this.tags.add(tag);
        return this;
    }

    /** Sets the archived status. */
    public HabitTestBuilder withArchived(boolean archived) {
        this.archived = archived;
        return this;
    }

    /** Sets the reminder enabled status. */
    public HabitTestBuilder withReminderEnabled(boolean enabled) {
        this.reminderEnabled = enabled;
        return this;
    }

    /** Sets the reminder time. */
    public HabitTestBuilder withReminderTime(String time) {
        this.reminderTime = time;
        return this;
    }

    /** Sets the reminder days. */
    public HabitTestBuilder withReminderDays(List<String> days) {
        this.reminderDays = new ArrayList<>(days);
        return this;
    }

    /** Sets the current streak. */
    public HabitTestBuilder withCurrentStreak(int current) {
        this.streakCurrent = current;
        return this;
    }

    /** Sets the longest streak. */
    public HabitTestBuilder withLongestStreak(int longest) {
        this.streakLongest = longest;
        return this;
    }

    /** Sets the habit's creation timestamp. */
    public HabitTestBuilder withCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    /** Sets the habit's last update timestamp. */
    public HabitTestBuilder withUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
        return this;
    }

    /** Sets the completion date. */
    public HabitTestBuilder withCompletionDate(LocalDate date) {
        this.completionDate = date;
        return this;
    }

    /** Sets the completion status. */
    public HabitTestBuilder withCompletionStatus(boolean completed) {
        this.completionStatus = completed;
        return this;
    }

    /** Sets the completion notes. */
    public HabitTestBuilder withCompletionNotes(String notes) {
        this.completionNotes = notes;
        return this;
    }

    /** Sets the completion ID. */
    public HabitTestBuilder withCompletionId(String id) {
        this.completionId = id;
        return this;
    }

    /** Creates a builder for an archived habit. */
    public static HabitTestBuilder anArchivedHabit() {
        return aHabit().withArchived(true);
    }

    /** Creates a builder for a weekly habit. */
    public static HabitTestBuilder aWeeklyHabit() {
        return aHabit().withFrequencyPeriod(HabitFrequency.WEEKLY);
    }

    /** Creates a builder for a monthly habit. */
    public static HabitTestBuilder aMonthlyHabit() {
        return aHabit().withFrequencyPeriod(HabitFrequency.MONTHLY);
    }

    /** Creates a builder for a habit with no reminders. */
    public static HabitTestBuilder aHabitWithoutReminders() {
        return aHabit().withReminderEnabled(false);
    }

    /** Creates a builder for a habit with no current streak. */
    public static HabitTestBuilder aHabitWithNoStreak() {
        return aHabit().withCurrentStreak(0).withLongestStreak(0);
    }
}
