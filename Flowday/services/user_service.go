package services

import (
	"context"
	"fmt"
)

type UserProfile struct {
	Name   string `json:"name"`
	Level  int    `json:"level"`
	XP     int    `json:"xp"`
	Streak int    `json:"streak"`
}

type UserService struct {
	ctx         context.Context
	currentUser UserProfile
}

func NewUserService() *UserService {
	// Mock simplified data
	return &UserService{
		currentUser: UserProfile{
			Name:   "Guest",
			Level:  1,
			XP:     0,
			Streak: 0,
		},
	}
}

func (u *UserService) Startup(ctx context.Context) {
	u.ctx = ctx
}

func (u *UserService) GetUserProfile() UserProfile {
	return u.currentUser
}

// SetUserName updates the user's name (called after login)
func (u *UserService) SetUserName(name string) {
	u.currentUser.Name = name
	fmt.Printf("User Set: %s\n", name)
}

func (u *UserService) AddXP(amount int) UserProfile {
	u.currentUser.XP += amount
	// Simple level up logic: 100 XP per level
	if u.currentUser.XP >= 100 {
		u.currentUser.Level++
		u.currentUser.XP = u.currentUser.XP - 100
	}
	return u.currentUser
}
