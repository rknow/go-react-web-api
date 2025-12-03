package registry

import (
	"errors"
	"sync"
)

type Publisher struct {
	ID    int    `json:"id"`
	Name string `json:"name"`
}

var (
	publishers  = make(map[int]Publisher)
	idCount = 1
	mu      sync.Mutex
)

// GetPublishers returns all publishers
func GetPublishers() []Publisher {
	mu.Lock()
	defer mu.Unlock()
	list := make([]Publisher, 0, len(publishers))
	for _, a := range publishers {
		list = append(list, a)
	}
	return list
}

// CreatePublisher adds a new publisher
func CreatePublisher(name string) Publisher {
	mu.Lock()
	defer mu.Unlock()
	a := Publisher{ID: idCount, Name: name}
	publishers[idCount] = a
	idCount++
	return a
}

// UpdatePublisher updates an existing publisher
func UpdatePublisher(id int, name string) (Publisher, error) {
	mu.Lock()
	defer mu.Unlock()
	a, exists := publishers[id]
	if !exists {
		return Publisher{}, errors.New("publisher not found")
	}
	a.Name = name
	publishers[id] = a
	return a, nil
}

// DeletePublisher removes a publisher
func DeletePublisher(id int) error {
	mu.Lock()
	defer mu.Unlock()
	if _, exists := publishers[id]; !exists {
		return errors.New("publisher not found")
	}
	delete(publishers, id)
	return nil
}
