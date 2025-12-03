package main

import (
	"encoding/json"
	"goreact/registry"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

func getPublishers(w http.ResponseWriter, r *http.Request) {
	publishers := registry.GetPublishers()
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(publishers)
}

func createPublisher(w http.ResponseWriter, r *http.Request) {
	var a struct{ Name string }
	if err := json.NewDecoder(r.Body).Decode(&a); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	publisher := registry.CreatePublisher(a.Name)
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(publisher)
}

func updatePublisher(w http.ResponseWriter, r *http.Request) {
	idStr := mux.Vars(r)["id"]
	id, _ := strconv.Atoi(idStr)

	var a struct{ Name string }
	if err := json.NewDecoder(r.Body).Decode(&a); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	publisher, err := registry.UpdatePublisher(id, a.Name)
	if err != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}
	json.NewEncoder(w).Encode(publisher)
}

func deletePublisher(w http.ResponseWriter, r *http.Request) {
	idStr := mux.Vars(r)["id"]
	id, _ := strconv.Atoi(idStr)

	if err := registry.DeletePublisher(id); err != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}
	w.WriteHeader(http.StatusOK)
}
