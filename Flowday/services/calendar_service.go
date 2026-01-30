package services

import (
	"context"
	"fmt"
	"time"
)

type CEvent struct {
	ID    string `json:"id"`
	Title string `json:"title"`
	Start string `json:"start"` // ISO String
	End   string `json:"end"`   // ISO String
	Type  string `json:"type"`  // "work", "meeting", "break"
}

type CalendarService struct {
	ctx    context.Context
	events []CEvent
}

func NewCalendarService() *CalendarService {
	today := time.Now()
	// Mock Data
	return &CalendarService{
		events: []CEvent{
			{
				ID:    "1",
				Title: "Deep Work Block",
				Start: time.Date(today.Year(), today.Month(), today.Day(), 9, 0, 0, 0, today.Location()).Format(time.RFC3339),
				End:   time.Date(today.Year(), today.Month(), today.Day(), 11, 0, 0, 0, today.Location()).Format(time.RFC3339),
				Type:  "work",
			},
			{
				ID:    "2",
				Title: "Team Sync",
				Start: time.Date(today.Year(), today.Month(), today.Day(), 14, 0, 0, 0, today.Location()).Format(time.RFC3339),
				End:   time.Date(today.Year(), today.Month(), today.Day(), 15, 0, 0, 0, today.Location()).Format(time.RFC3339),
				Type:  "meeting",
			},
		},
	}
}

func (c *CalendarService) Startup(ctx context.Context) {
	c.ctx = ctx
}

func (c *CalendarService) GetEvents() []CEvent {
	return c.events
}

func (c *CalendarService) CreateEvent(title string, startISO string, endISO string, eventType string) []CEvent {
	newEvent := CEvent{
		ID:    fmt.Sprintf("%d", time.Now().UnixNano()),
		Title: title,
		Start: startISO,
		End:   endISO,
		Type:  eventType,
	}
	c.events = append(c.events, newEvent)
	return c.events
}
